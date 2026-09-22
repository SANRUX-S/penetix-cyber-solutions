import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { Color } from 'three';
// Test the actual in-component timing code; no duplicate helper can drift.
const componentSource = await readFile(new URL('../src/components/HeroSphere3D.jsx', import.meta.url), 'utf8');
const sequenceSource = componentSource.split('// security-sequence:start')[1]?.split('// security-sequence:end')[0];
assert.ok(sequenceSource, 'Self-contained component exposes its pure sequence for numeric verification.');
const { sampleSecuritySequence } = await import('data:text/javascript;base64,' + Buffer.from(sequenceSource).toString('base64'));

function verifySequence() {
  const sample = sampleSecuritySequence, epsilon = 1e-5;
  const close = (a, b, tolerance = 1e-4, label = 'Continuous sequence') => assert.ok(Math.abs(a - b) < tolerance, `${label}: ${a} versus ${b}`);
  const amountKeys = ['threatProgress', 'threatOpacity', 'isolation', 'resolve', 'defense'];
  const continuousKeys = ['speedA', 'speedB', ...amountKeys];
  const phases = [[0, 'protected'], [10, 'warning'], [20, 'defense'], [24, 'neutralizing'], [27, 'restored']];
  for (const [time, phase] of phases) assert.equal(sample(time).phase, phase);
  assert.deepEqual(sample(0), sample(30));
  assert.deepEqual(sample(0), sample(60));
  assert.deepEqual(sample(-1), sample(29));
  for (const time of [10, 15, 18, 18.6, 19, 20, 21, 24, 26, 27, 29]) {
    const before = sample(time - epsilon), after = sample(time + epsilon);
    for (const key of continuousKeys) close(before[key], after[key], 1e-4, `${key} at ${time}s`);
    before.color.forEach((channel, index) => close(channel, after.color[index], 1e-4, `Color at ${time}s`));
    close(before.angleA, after.angleA);
    close(before.angleB, after.angleB);
  }
  const initial = sample(0), ending = sample(30 - epsilon), alert = sample(22);
  close(ending.angleA + initial.speedA * epsilon, 6 * Math.PI, 1e-9, 'Three complete primary turns');
  close(ending.angleB + initial.speedB * epsilon, -4 * Math.PI, 1e-9, 'Two opposite secondary turns');
  for (const key of continuousKeys) close(ending[key], initial[key], 1e-9, `Loop boundary ${key}`);
  ending.color.forEach((channel, index) => close(channel, initial.color[index], 1e-9, 'Loop boundary color'));
  assert.ok(initial.speedA >= .45 && initial.speedA <= .65);
  assert.ok(initial.speedB <= -.25 && initial.speedB >= -.4);
  assert.ok(alert.speedA >= .8 && alert.speedA <= 1);
  assert.ok(alert.speedB <= -.55 && alert.speedB >= -.75);
  for (let index = 0; index <= 3000; index += 1) {
    const time = index / 100, state = sample(time);
    for (const key of amountKeys) assert.ok(state[key] >= 0 && state[key] <= 1, `${key} stays normalized at ${time}s`);
    state.color.forEach(channel => assert.ok(channel >= 0 && channel <= 1));
    if (time < 18 || time >= 27) assert.equal(state.threatOpacity, 0);
    if (time >= 20 && time < 27) assert.equal(state.threatProgress, 1, 'Visible threat stays at the perimeter.');
    if (index > 0 && index < 3000) {
      const before = sample(time - epsilon), after = sample(time + epsilon);
      close((after.angleA - before.angleA) / (2 * epsilon), state.speedA, 1e-6, 'Analytic primary rotation derivative');
      close((after.angleB - before.angleB) / (2 * epsilon), state.speedB, 1e-6, 'Analytic secondary rotation derivative');
    }
  }
  const hexAt = time => new Color().setRGB(...sample(time).color).getHexString();
  for (const [time, hex] of [[0, '35ff8a'], [10, '35ff8a'], [15, 'b8e35a'], [19, 'f5b942'], [22, 'ff4d4d'], [26, 'bdece3'], [29, '35ff8a']]) assert.equal(hexAt(time), hex);
  return { samples: 3001, duration: 30, normalSpeeds: [initial.speedA, initial.speedB], alertSpeeds: [alert.speedA, alert.speedB], turns: [3, -2] };
}

const numeric = verifySequence();
console.log('PASS analytic phase, color, speed, containment and seamless-cycle checks', numeric);
if (process.argv.includes('--numeric')) process.exit(0);

const directory = 'artifacts/hero';
await mkdir(directory, { recursive: true });
const captureOnly = process.argv.includes('--capture');
const errors = [];
const failedRequests = [], httpErrors = [];
const report = { status: 'running', numeric, phases: [], layouts: [], errors, failedRequests, httpErrors };
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.stack || error.message));
page.on('console', message => {
  if (message.type() !== 'error') return;
  const location = message.location();
  errors.push(message.text() + (location.url ? ` (${location.url}:${location.lineNumber + 1})` : ''));
});
page.on('requestfailed', request => failedRequests.push({
  url: request.url(), method: request.method(), resourceType: request.resourceType(),
  error: request.failure()?.errorText || 'Unknown request failure',
}));
page.on('response', response => {
  if (response.status() >= 400) httpErrors.push({ url: response.url(), status: response.status(), statusText: response.statusText() });
});
const sphere = page.locator('.hero-sphere');
const readState = () => page.evaluate(() => {
  const node = document.querySelector('.hero-sphere');
  return node ? {
    time: Number(node.dataset.securityTime), phase: node.dataset.securityPhase,
    speed: Number(node.dataset.shellSpeed), coreColor: node.dataset.coreColor,
    coreGlow: Number(node.dataset.coreGlow),
  } : null;
});

function assertCoreState(actual) {
  assert.ok(actual, 'Hero exposes core animation metadata.');
  assert.ok(Number.isFinite(actual.time), 'Core metadata includes a finite sequence time.');
  const hex = String(actual.coreColor || '').replace(/^#/, '');
  assert.match(hex, /^[a-f\d]{6}$/i, `Core must expose an accent hex color: ${JSON.stringify(actual)}`);
  assert.ok(Number.isFinite(actual.coreGlow) && actual.coreGlow > 0, `Inner core glow must stay active: ${JSON.stringify(actual)}`);
  const expected = new Color().setRGB(...sampleSecuritySequence(actual.time).color).getHex();
  const observed = parseInt(hex, 16);
  for (const shift of [16, 8, 0]) {
    // securityTime is rounded to milliseconds; tolerate byte rounding during transitions.
    assert.ok(Math.abs(((observed >> shift) & 255) - ((expected >> shift) & 255)) <= 2,
      `Core color must follow the current security phase: ${JSON.stringify(actual)}, expected #${expected.toString(16).padStart(6, '0')}`);
  }
}

try {
  await page.goto('http://127.0.0.1:5173/#home', { waitUntil: 'networkidle' });
  await expect(sphere.locator('canvas')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: directory + '/desktop-secure.png' });
  await sphere.screenshot({ path: directory + '/sphere-secure.png' });
  console.log('Captured static secure sphere and hero.');
  if (captureOnly) process.exitCode = 0;
  else {
    const webgl = await sphere.locator('canvas').evaluate(canvas => {
      const gl = canvas.getContext('webgl2');
      return gl ? { available: true, alpha: gl.getContextAttributes().alpha, clear: gl.getParameter(gl.COLOR_CLEAR_VALUE)[3], dpr: canvas.width / canvas.clientWidth } : { available: false };
    });
    report.webgl = webgl;
    assert.equal(webgl.available, true, 'Hero has a usable WebGL2 context.');
    assert.equal(webgl.alpha, true); assert.equal(webgl.clear, 0); assert.ok(webgl.dpr <= 1.51);
    assert.deepEqual(sampleSecuritySequence(0), sampleSecuritySequence(30));
    await expect(sphere).toHaveAttribute('data-security-phase', 'protected');
    await expect(sphere).toHaveAttribute('data-animation', 'paused');
    report.initialCore = await readState();
    assertCoreState(report.initialCore);
    console.log('PASS reduced-motion secure inner core', report.initialCore);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const starts = Date.now();
    for (const [time, phase] of [[1, 'protected'], [11.5, 'warning'], [15, 'warning'], [19, 'warning'], [22, 'defense'], [25.5, 'neutralizing'], [28.5, 'restored']]) {
      await page.waitForFunction(target => Number(document.querySelector('.hero-sphere').dataset.securityTime) >= target, time, { timeout: 14000 });
      const actual = await readState();
      report.phases.push(actual);
      assert.equal(actual.phase, phase); assertCoreState(actual);
      await sphere.screenshot({ path: directory + '/phase-' + time + '-' + phase + '.png' });
      console.log('PASS real-time phase', actual);
    }
    await page.waitForFunction(() => Number(document.querySelector('.hero-sphere').dataset.securityTime) < 1, undefined, { timeout: 10000 });
    assert.ok(Date.now() - starts >= 29500, 'Watch at least a full real-time loop.');
    await expect(sphere).toHaveAttribute('data-security-phase', 'protected');
    report.restartedCore = await readState();
    assertCoreState(report.restartedCore);
    console.log('PASS full 30-second sequence and restart.');
    await page.locator('#resources').scrollIntoViewIfNeeded();
    await expect(sphere).toHaveAttribute('data-animation', 'paused');
    const paused = await sphere.getAttribute('data-security-time');
    await page.waitForTimeout(400);
    assert.equal(await sphere.getAttribute('data-security-time'), paused);
    await page.locator('#home').scrollIntoViewIfNeeded();
    await expect(sphere).toHaveAttribute('data-animation', 'running');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(sphere).toHaveAttribute('data-security-time', '0.000');
    report.reducedMotionCore = await readState();
    assertCoreState(report.reducedMotionCore);
    assert.equal(report.reducedMotionCore.coreColor, report.initialCore.coreColor, 'Live reduced motion restores the initial green core.');
    console.log('PASS offscreen pause, resume and live reduced-motion change.');
    for (const width of [1440, 1280, 1024, 768, 375, 390]) {
      await page.setViewportSize({ width, height: width < 600 ? 1000 : 900 });
      await sphere.scrollIntoViewIfNeeded();
      await page.waitForTimeout(80);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, canvas: document.querySelector('.hero-sphere canvas').getBoundingClientRect().toJSON() }));
      assert.ok(dimensions.document <= width, JSON.stringify(dimensions));
      assert.ok(dimensions.canvas.left >= 0 && dimensions.canvas.right <= width + 1, 'Sphere canvas stays inside viewport.');
      report.layouts.push(dimensions);
      if (width === 375) { await page.locator('#home').screenshot({ path: directory + '/mobile-hero.png' }); await sphere.screenshot({ path: directory + '/mobile-sphere.png' }); }
      console.log('PASS responsive sphere', width);
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(failedRequests, [], 'No failed network requests; see recorded URLs in verification.json.');
    assert.deepEqual(httpErrors, [], 'No HTTP error responses; see recorded URLs in verification.json.');
  }
  report.status = captureOnly ? 'captured' : 'passed';
} catch (error) {
  report.status = 'failed';
  report.failure = { message: error.message, stack: error.stack, url: page.url() };
  report.lastState = await readState().catch(() => null);
  if (failedRequests.length || httpErrors.length) console.error('Network failures:', JSON.stringify({ failedRequests, httpErrors }, null, 2));
  throw error;
} finally {
  await writeFile(directory + '/verification.json', JSON.stringify(report, null, 2));
  await browser.close();
}
