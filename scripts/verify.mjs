import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, expect } from '@playwright/test';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'artifacts');
const baseURL = process.env.PENETIX_URL || 'http://127.0.0.1:5173';
const sectionIds = ['home', 'services', 'security-system', 'approach', 'security-review', 'company', 'resources', 'contact'];
const viewportSizes = [
  { width: 1440, height: 1000 },
  { width: 1280, height: 900 },
  { width: 1024, height: 900 },
  { width: 768, height: 1024 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
];
const results = { baseURL, startedAt: new Date().toISOString(), checks: [], screenshots: [], browserErrors: [] };
let browser;

async function check(name, operation) {
  const started = Date.now();
  try {
    const details = await operation();
    results.checks.push({ name, passed: true, durationMs: Date.now() - started, ...(details ? { details } : {}) });
    console.log(`PASS ${name}`);
    return true;
  } catch (error) {
    results.checks.push({ name, passed: false, durationMs: Date.now() - started, error: error.message });
    console.error(`FAIL ${name}\n${error.message}`);
    return false;
  }
}

function monitorErrors(page, label) {
  const errors = [];
  const record = (type, message) => {
    if (/THREE\.WebGLRenderer: Context Lost\.?$/i.test(message.trim())) return;
    errors.push({ viewport: label, type, message });
  };
  page.on('pageerror', (error) => record('runtime', error.message));
  page.on('console', (message) => { if (message.type() === 'error') record('console', message.text()); });
  page.on('requestfailed', (request) => {
    const message = request.failure()?.errorText || 'Unknown request failure';
    if (message.includes('ERR_ABORTED')) return;
    record('request', `${request.url()} — ${message}`);
  });
  return errors;
}

async function afterLayout(page) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function inspectOverflow(page) {
  return page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    offenders: [...document.querySelectorAll('main section, main h1, main h2, .service-card, .resource-card, .orbit-node')]
      .map((element) => ({ selector: element.id || element.className, left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right }))
      .filter((element) => element.left < -1 || element.right > window.innerWidth + 1),
  }));
}

async function scrollToSection(page, id) {
  await page.locator(`#${id}`).evaluate((element) => element.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await afterLayout(page);
}

async function expectAnchorPosition(page, id) {
  await expect.poll(() => page.evaluate((sectionId) => {
    const navbar = document.querySelector('.navbar').getBoundingClientRect();
    const section = document.getElementById(sectionId).getBoundingClientRect();
    return Math.abs(section.top - navbar.bottom);
  }, id), { timeout: 10000 }).toBeLessThan(5);
}

async function visitEntireDocument(page) {
  // Visit every part of tall sections so real intersection observers and native
  // lazy loading run before taking a full-page screenshot.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round((await page.evaluate(() => window.innerHeight)) * 0.75);
  for (let top = 0; top < height; top += step) {
    await page.evaluate((position) => window.scrollTo({ top: position, behavior: 'instant' }), top);
    await afterLayout(page);
  }
  await expect.poll(() => page.locator('main img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute('src'))), { timeout: 15000 }).toEqual([]);
}

async function verifyStructure(page) {
  await expect(page.locator('main > section.section-panel')).toHaveCount(8);
  assert.deepEqual(await page.locator('main > section.section-panel').evaluateAll((sections) => sections.map((section) => section.id)), sectionIds);
  await expect(page.locator('.service-card')).toHaveCount(12);
  await expect(page.locator('.resource-card')).toHaveCount(6);
  await expect(page.locator('.orbit-node')).toHaveCount(7);
  const links = await page.locator('nav[aria-label="Main navigation"] a').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')));
  assert.deepEqual(links, ['#home', '#services', '#approach', '#company', '#resources', '#contact']);
  assert.deepEqual(await page.locator('a[href="#"], a[href="javascript:void(0)"]').count(), 0, 'No placeholder anchors should remain.');
}

async function verifyWebGL(page, label) {
  await scrollToSection(page, 'home');
  const canvas = page.locator('#home .hero-sphere canvas');
  await expect(canvas).toBeVisible({ timeout: 20000 });
  const details = await canvas.evaluate((element) => {
    // This obtains the existing context and reads its capabilities only. It does
    // not clear buffers, force a loss, change the viewport or mutate GL state.
    const context = element.getContext('webgl2') || element.getContext('webgl');
    return {
      webgl: Boolean(context),
      contextLost: context?.isContextLost(),
      alpha: context?.getContextAttributes()?.alpha,
      width: element.width,
      height: element.height,
      cssWidth: element.clientWidth,
      cssHeight: element.clientHeight,
      clearAlpha: context ? context.getParameter(context.COLOR_CLEAR_VALUE)[3] : null,
      background: getComputedStyle(element).backgroundColor,
    };
  });
  assert.equal(details.webgl, true, 'Hero must use a real WebGL canvas.');
  assert.equal(details.contextLost, false, 'Hero WebGL context should be live.');
  assert.equal(details.alpha, true, 'WebGL context must support transparency.');
  assert.equal(details.clearAlpha, 0, 'Renderer must clear to transparent.');
  assert.ok(details.width > 100 && details.height > 100, 'Hero canvas has a usable rendering size.');
  assert.ok(details.width / details.cssWidth <= 1.51, 'Rendering DPR must be capped at 1.5.');
  await expect(page.locator('.hero-sphere__fallback')).toHaveCount(0);
  const filename = `hero-canvas-${label}.png`;
  await canvas.screenshot({ path: path.join(outputDirectory, filename) });
  results.screenshots.push(filename);
  return details;
}

async function verifyNavigation(page, mobile) {
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  for (const [id, name] of [['services', 'Services'], ['approach', 'Approach'], ['company', 'Company'], ['resources', 'Resources'], ['contact', 'Contact'], ['home', 'Home']]) {
    if (mobile) {
      await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Close navigation', exact: true })).toHaveAttribute('aria-expanded', 'true');
    }
    await navigation.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expectAnchorPosition(page, id);
    if (mobile) await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
  }
  if (mobile) {
    await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
  }
}

async function verifyOrbit(page) {
  await scrollToSection(page, 'security-system');
  const website = page.getByRole('button', { name: 'Explore website security', exact: true });
  await website.click();
  await expect(website).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.inspector-content h3')).toHaveText('Website');
  await expect(page.locator('.inspector-checks')).toContainText('Security headers');
  const backups = page.getByRole('button', { name: 'Explore backups security', exact: true });
  await backups.focus();
  await page.keyboard.press('Enter');
  await expect(backups).toBeFocused();
  await expect(backups).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.inspector-content h3')).toHaveText('Backups');
  await expect(page.locator('.inspector-checks')).toContainText('Restore readiness');
  await page.getByRole('button', { name: 'Explore next security layer', exact: true }).click();
  await expect(page.locator('.inspector-content h3')).toHaveText('Access');
  await page.getByRole('button', { name: 'Explore next security layer', exact: true }).click();
  await expect(page.locator('.inspector-content h3')).toHaveText('Identity');
  await page.getByRole('button', { name: 'Explore previous security layer', exact: true }).click();
  await expect(page.locator('.inspector-content h3')).toHaveText('Access');
  await page.getByRole('button', { name: 'Explore email security', exact: true }).hover();
  await expect(page.locator('.inspector-content h3')).toHaveText('Email');
  const playState = await page.locator('.orbit-core-float').evaluate((element) => getComputedStyle(element).animationPlayState);
  assert.equal(playState, 'running', 'Visible orbital motion should run with normal motion preference.');
  await scrollToSection(page, 'contact');
  await expect(page.locator('#security-system')).toHaveAttribute('data-animate', 'false');
  assert.equal(await page.locator('.orbit-core-float').evaluate((element) => getComputedStyle(element).animationPlayState), 'paused', 'Offscreen orbital motion should pause.');
}

async function verifyContact(page) {
  const card = page.locator('.service-card').filter({ has: page.getByRole('heading', { name: 'Email Security', exact: true }) });
  await card.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('select[name="service"]')).toHaveValue('Email Security');
  await expect(dialog.getByRole('link', { name: 'penetixcybersolutions@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:penetixcybersolutions@gmail.com');
  await expect(dialog.getByText('nothing is submitted on this website.', { exact: false })).toBeVisible();
  // Only submit the empty, invalid form: native validation must block submission.
  // Never click a valid submit button or any mailto link in this verification.
  await dialog.getByRole('button', { name: 'Continue in email', exact: false }).click();
  assert.equal(await dialog.locator('form').evaluate((form) => form.checkValidity()), false);
  await expect(dialog.locator('[name="name"]')).toBeFocused();
  await expect(dialog.locator('.contact-status')).toHaveCount(0);
  await dialog.locator('[name="name"]').fill('Website verification');
  await dialog.locator('[name="email"]').fill('not-an-email');
  await dialog.locator('[name="message"]').fill('Local interface verification only. No message will be sent.');
  assert.equal(await dialog.locator('[name="email"]').evaluate((input) => input.validity.typeMismatch), true);
  await dialog.locator('[name="email"]').fill('verification@example.com');
  assert.equal(await dialog.locator('form').evaluate((form) => form.checkValidity()), true, 'A well-formed form should pass native validity checks.');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(card).toBeFocused();
  assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'Closing the dialog must restore document scrolling.');
}

async function verifyStory(page) {
  await scrollToSection(page, 'home');
  const trigger = page.getByRole('button', { name: 'Watch Our Story', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.story-word')).toHaveText('Clarity.');
  const pause = dialog.getByRole('button', { name: 'Pause story', exact: true });
  await expect(pause).toBeVisible();
  await pause.click();
  await expect(dialog.getByRole('button', { name: 'Play story', exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Next scene', exact: true }).click();
  await expect(dialog.locator('.story-word')).toHaveText('Protection.');
  await dialog.getByRole('button', { name: 'Next scene', exact: true }).click();
  await expect(dialog.locator('.story-word')).toHaveText('Confidence.');
  await dialog.getByRole('button', { name: 'Previous scene', exact: true }).click();
  await expect(dialog.locator('.story-word')).toHaveText('Protection.');
  await expect(dialog.locator('.story-image')).toBeVisible();
  await expect.poll(() => dialog.locator('.story-image').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
}

async function verifyReport(page) {
  const trigger = page.getByRole('button', { name: 'View a Sample Report', exact: false });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('SAMPLE / DEMONSTRATION', { exact: true })).toBeVisible();
  await expect(dialog.getByText('This is not a real client assessment.', { exact: false })).toBeVisible();
  const downloadEvent = page.waitForEvent('download');
  await dialog.getByRole('button', { name: 'Download sample', exact: false }).click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), 'penetix-sample-security-review.txt');
  assert.equal(await download.failure(), null);
  const filename = 'downloaded-sample-security-review.txt';
  await download.saveAs(path.join(outputDirectory, filename));
  const text = await readFile(path.join(outputDirectory, filename), 'utf8');
  assert.match(text, /DEMONSTRATION ONLY/);
  assert.match(text, /not a real customer assessment/);
  assert.match(text, /SECURITY POSTURE: 82 \/ 100/);
  for (const category of ['Website Security: 86', 'Email Security: 78', 'Account Security: 84', 'Backup Readiness: 75']) assert.ok(text.includes(category), `Missing sample category ${category}`);
  for (const finding of ['Critical: 0', 'High: 2', 'Medium: 5', 'Low: 8']) assert.ok(text.includes(finding), `Missing sample finding count ${finding}`);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  return { downloadedFile: filename, sampleDisclosure: true };
}

async function verifyReducedMotion() {
  const context = await browser.newContext({ viewport: viewportSizes[0], reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = monitorErrors(page, 'reduced-motion');
  try {
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page.locator('.hero-sphere canvas')).toBeVisible({ timeout: 20000 });
    await scrollToSection(page, 'security-system');
    assert.equal(await page.locator('.orbit-core-float').evaluate((element) => getComputedStyle(element).animationName), 'none');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await scrollToSection(page, 'home');
    await page.getByRole('button', { name: 'Watch Our Story', exact: true }).click();
    await expect(page.getByRole('dialog').getByRole('button', { name: 'Play story', exact: true })).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('button', { name: 'Pause story', exact: true })).toHaveCount(0);
    await page.keyboard.press('Escape');
    assert.deepEqual(errors, []);
  } finally {
    results.browserErrors.push(...errors);
    await context.close();
  }
}

try {
  await mkdir(outputDirectory, { recursive: true });
  const bundledBrowser = chromium.executablePath();
  const executablePath = [
    bundledBrowser,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ].find((candidate) => existsSync(candidate));
  if (!executablePath) throw new Error('No Chromium browser is installed. Install Chrome/Edge or run npx playwright install chromium.');
  results.browserExecutable = executablePath;
  browser = await chromium.launch({ executablePath, headless: true, args: ['--enable-webgl', '--enable-unsafe-swiftshader'] });

  for (const viewport of viewportSizes) {
    const label = `${viewport.width}x${viewport.height}`;
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, acceptDownloads: true });
    const page = await context.newPage();
    page.setDefaultTimeout(12000);
    const errors = monitorErrors(page, label);
    try {
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await check(`${label}: eight sections, 12 services, six resources and same-page navigation`, () => verifyStructure(page));
      await check(`${label}: real transparent WebGL hero`, () => verifyWebGL(page, label));
      await check(`${label}: every section fits horizontally and images load`, async () => {
        for (const id of sectionIds) {
          await scrollToSection(page, id);
          const overflow = await inspectOverflow(page);
          assert.ok(overflow.documentWidth <= overflow.viewportWidth + 1, `${id}: ${JSON.stringify(overflow)}`);
          assert.ok(overflow.bodyWidth <= overflow.viewportWidth + 1, `${id}: body has horizontal overflow.`);
          assert.deepEqual(overflow.offenders, [], `${id}: visible content must not extend outside the viewport.`);
          const height = await page.locator(`#${id}`).evaluate((element) => element.getBoundingClientRect().height);
          assert.ok(height >= viewport.height - 74, `${id}: major section should fill at least the viewport minus navigation.`);
        }
        await visitEntireDocument(page);
      });

      if (viewport.width === 1440 || viewport.width === 375) {
        await check(`${label}: ${viewport.width < 980 ? 'mobile menu' : 'desktop navigation'} scrolls to all six anchors`, () => verifyNavigation(page, viewport.width < 980));
        await check(`${label}: orbital layers respond to pointer, keyboard and inspector controls`, () => verifyOrbit(page));
        await check(`${label}: contact selection, native validation, email address and Escape focus return`, () => verifyContact(page));
        await check(`${label}: story controls, image loading and Escape focus return`, () => verifyStory(page));
        await check(`${label}: sample report disclosure and downloadable content`, () => verifyReport(page));
      }

      await check(`${label}: full-page screenshot`, async () => {
        if (await page.getByRole('dialog').count()) await page.keyboard.press('Escape');
        await visitEntireDocument(page);
        await scrollToSection(page, 'home');
        const filename = `homepage-${label}.png`;
        await page.screenshot({ path: path.join(outputDirectory, filename), fullPage: true, animations: 'disabled' });
        results.screenshots.push(filename);
      });
      await check(`${label}: no browser or resource errors`, () => assert.deepEqual(errors, []));
    } catch (error) {
      results.checks.push({ name: `${label}: page initialization`, passed: false, error: error.message });
      console.error(`FAIL ${label}: ${error.message}`);
    } finally {
      results.browserErrors.push(...errors);
      await context.close();
    }
  }
  await check('Reduced motion disables orbital motion and story autoplay', verifyReducedMotion);
} catch (error) {
  results.checks.push({ name: 'Verification setup', passed: false, error: error.message });
  console.error(error.message);
} finally {
  if (browser) await browser.close();
  results.finishedAt = new Date().toISOString();
  results.passed = results.checks.every((item) => item.passed);
  results.summary = { passed: results.checks.filter((item) => item.passed).length, failed: results.checks.filter((item) => !item.passed).length };
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'verification-results.json'), `${JSON.stringify(results, null, 2)}\n`);
  console.log(`\n${results.summary.passed} checks passed; ${results.summary.failed} failed.`);
  console.log(`Evidence: ${outputDirectory}`);
  process.exitCode = results.passed ? 0 : 1;
}
