import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
// security-sequence:start
/** A deterministic, frame-rate-independent 30-second security cycle. */
const DURATION = 30;
const TAU = Math.PI * 2;
const clamp01 = (value) => Math.min(1, Math.max(0, value));

function ramp(start, end, time) {
  const u = clamp01((time - start) / (end - start));
  return u * u * (3 - 2 * u);
}

// Exact integral from zero to time of a clamped cubic smoothstep.
// Inside the transition, integral(3u² - 2u³) = u³ - u⁴ / 2.
function rampIntegral(start, end, time) {
  if (time <= start) return 0;
  if (time >= end) return time - (start + end) / 2;
  const u = (time - start) / (end - start);
  return (end - start) * (u ** 3 - u ** 4 / 2);
}

function defenseIntegral(time) {
  return .2 * rampIntegral(10, 18, time)
    + .8 * rampIntegral(18, 20, time)
    - rampIntegral(24, 29, time);
}

// Normalize the entire speed curve, not individual phases. This preserves
// continuous velocity while completing exactly three / minus two full turns.
const NORMAL_A = 0.5;
const ACTIVE_A = 0.9;
const NORMAL_B = -0.28;
const ACTIVE_B = -0.65;
const DEFENSE_AREA = defenseIntegral(DURATION);
const SCALE_A = (3 * TAU) / (NORMAL_A * DURATION + (ACTIVE_A - NORMAL_A) * DEFENSE_AREA);
const SCALE_B = (-2 * TAU) / (NORMAL_B * DURATION + (ACTIVE_B - NORMAL_B) * DEFENSE_AREA);

function linearColor(hex) {
  return [16, 8, 0].map((shift) => {
    const srgb = ((hex >> shift) & 255) / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });
}

const GREEN = linearColor(0x35ff8a);
const YELLOW_GREEN = linearColor(0xb8e35a);
const AMBER = linearColor(0xf5b942);
const RED = linearColor(0xff4d4d);
const TEAL_WHITE = linearColor(0xbdece3);

function blend(from, to, amount) {
  return from.map((channel, index) => channel + (to[index] - channel) * amount);
}

function accentColor(time) {
  if (time < 10) return [...GREEN];
  if (time < 15) return blend(GREEN, YELLOW_GREEN, ramp(10, 15, time));
  if (time < 19) return blend(YELLOW_GREEN, AMBER, ramp(15, 19, time));
  if (time < 20) return [...AMBER];
  if (time < 21) return blend(AMBER, RED, ramp(20, 21, time));
  if (time < 24) return [...RED];
  if (time < 26) return blend(RED, TEAL_WHITE, ramp(24, 26, time));
  if (time < 29) return blend(TEAL_WHITE, GREEN, ramp(26, 29, time));
  return [...GREEN];
}

/**
 * Sample by elapsed seconds (never integrate these angles again in a renderer).
 *
 * color: linear RGB in [0, 1], ready for THREE.Color.setRGB(...color).
 * angleA / angleB: radians; wrap by +6π / -4π at the cycle boundary,
 *                 which is exactly the same physical orientation.
 * speedA / speedB: signed radians per second, derivatives of those angles.
 * threatProgress: 0 = outside approach start, 1 = outer perimeter; never inside.
 * threatOpacity: fades in after 18s, fades out 24–27s, otherwise zero or one.
 * isolation: containment envelope, rises 21–24s and falls 24–27s.
 * resolve: resolving-light envelope, rises 24–26s and falls 27–29s.
 * defense: rises to 20% during warning 10–18s, reaches 100% at 20s,
 *          then smoothly returns to normal during recovery 24–29s.
 * All numeric visual amounts are smooth at phase and loop boundaries.
 */
export function sampleSecuritySequence(timeSeconds) {
  const elapsed = Number.isFinite(timeSeconds) ? timeSeconds : 0;
  const remainder = elapsed % DURATION;
  const time = remainder < 0 ? remainder + DURATION : remainder || 0;
  const defense = .2 * ramp(10, 18, time) + .8 * ramp(18, 20, time) - ramp(24, 29, time);
  const integratedDefense = defenseIntegral(time);

  const phase = time < 10 ? 'protected'
    : time < 20 ? 'warning'
      : time < 24 ? 'defense'
        : time < 27 ? 'neutralizing' : 'restored';

  return {
    phase,
    time,
    color: accentColor(time),
    angleA: SCALE_A * (NORMAL_A * time + (ACTIVE_A - NORMAL_A) * integratedDefense),
    angleB: SCALE_B * (NORMAL_B * time + (ACTIVE_B - NORMAL_B) * integratedDefense),
    speedA: SCALE_A * (NORMAL_A + (ACTIVE_A - NORMAL_A) * defense),
    speedB: SCALE_B * (NORMAL_B + (ACTIVE_B - NORMAL_B) * defense),
    threatProgress: ramp(18, 20, time) - ramp(27, 29, time),
    threatOpacity: ramp(18, 18.6, time) * (1 - ramp(24, 27, time)),
    isolation: ramp(21, 24, time) - ramp(24, 27, time),
    resolve: ramp(24, 26, time) - ramp(27, 29, time),
    defense,
  };
}
// security-sequence:end

// Closed bevelled metal sheets follow a sphere, with a gently raked path that
// breaks axial symmetry. Broad surfaces, not torus tubes or separate tiles.
function ribbonPoint(longitude, across, { latitude, halfWidth, radius, rake = .11, phase = 0, lap = 0 }, depth = 0) {
  const wave = rake * Math.cos(latitude) * (Math.sin(longitude + phase) + .22 * Math.sin(2 * longitude - .4));
  const center = latitude + wave;
  const lower = THREE.MathUtils.clamp(center - halfWidth, -Math.PI / 2 + .002, Math.PI / 2 - .002);
  const upper = THREE.MathUtils.clamp(center + halfWidth, -Math.PI / 2 + .002, Math.PI / 2 - .002);
  const fraction = (across + 1) / 2;
  // Gently crowned, lapped faces: continuous spherical silhouette, but each
  // sheet gets its own reflection instead of shading as one glossy ball.
  const r = radius + lap * across - .003 * Math.pow(Math.abs(across), 18) - depth;
  const angle = THREE.MathUtils.lerp(lower, upper, fraction);
  const radial = r * THREE.MathUtils.lerp(Math.cos(angle), THREE.MathUtils.lerp(Math.cos(lower), Math.cos(upper), fraction), .3);
  const y = r * THREE.MathUtils.lerp(Math.sin(angle), THREE.MathUtils.lerp(Math.sin(lower), Math.sin(upper), fraction), .3);
  return new THREE.Vector3(radial * Math.sin(longitude), y, radial * Math.cos(longitude));
}

function createRibbon(settings, segments, crossSegments = 10) {
  const positions = [], uvs = [], indices = [], groups = [];
  function surface(rows, point, reverse, materialIndex) {
    const start = positions.length / 3, firstIndex = indices.length;
    for (let row = 0; row <= rows; row += 1) {
      for (let column = 0; column <= segments; column += 1) {
        const v = point(column / segments * TAU, row / rows);
        positions.push(v.x, v.y, v.z);
        uvs.push(column / segments, row / rows);
      }
    }
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < segments; column += 1) {
        const a = start + row * (segments + 1) + column, b = a + 1, c = b + segments + 1, d = a + segments + 1;
        indices.push(...(reverse ? [a, c, b, a, d, c] : [a, b, c, a, c, d]));
      }
    }
    groups.push([firstIndex, indices.length - firstIndex, materialIndex]);
  }
  surface(crossSegments, (lon, v) => ribbonPoint(lon, v * 2 - 1, settings), false, 0);
  surface(crossSegments, (lon, v) => ribbonPoint(lon, v * 2 - 1, settings, .03), true, 1);
  surface(1, (lon, v) => ribbonPoint(lon, -1, settings, v * .03), true, 1);
  surface(1, (lon, v) => ribbonPoint(lon, 1, settings, v * .03), false, 1);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  groups.forEach(group => geometry.addGroup(...group));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

// Flat edge inlay, integrated into the metal surface rather than a loose ring.
function createInlay(settings, segments, from = 0, length = TAU, halfWidth = .0035, edge = null) {
  const positions = [], indices = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = from + i / segments * length;
    for (const side of [-1, 1]) {
      const point = edge === null ? ribbonPoint(angle, side, { ...settings, halfWidth })
        : ribbonPoint(angle, edge + side * halfWidth / settings.halfWidth, settings, -.0012);
      positions.push(point.x, point.y, point.z);
    }
    if (i < segments) { const a = i * 2; indices.push(a, a + 2, a + 3, a, a + 3, a + 1); }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function softTexture(color, opacity = .5) {
  const canvas = document.createElement('canvas'); canvas.width = 128; canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 62);
  gradient.addColorStop(0, `rgba(${color},${opacity})`);
  gradient.addColorStop(.32, `rgba(${color},${opacity * .42})`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  context.fillStyle = gradient; context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}


const SPHERE_STYLES = `
.penetix-security-core { position: relative; width: 100%; height: 100%; aspect-ratio: 1; isolation: isolate; background: transparent; user-select: none; }
.penetix-security-core > canvas { display: block; width: 100%; height: 100%; background: transparent; pointer-events: none; }
.penetix-security-core__fallback { position: absolute; inset: 0; display: grid; place-content: center; color: #293b43; font: 10px/1.9 sans-serif; letter-spacing: .15em; text-align: center; }
.penetix-security-core--unavailable > canvas { opacity: 0; }
/* Only the existing PENETIX hero uses this placement. Other parents are filled. */
.hero-object > .penetix-security-core[data-layout="auto"] { position: absolute; width: min(37vw, 530px); height: min(37vw, 530px); right: -1%; top: 51%; transform: translateY(-50%); }
@media (max-width: 1100px) { .hero-object > .penetix-security-core[data-layout="auto"] { width: 41vw; height: 41vw; right: -2%; } }
@media (max-width: 760px) { .hero-object > .penetix-security-core[data-layout="auto"] { width: min(100%, 345px); height: min(100vw - 40px, 345px); right: 50%; top: 50%; transform: translate(50%, -50%); } }
`;

export function HeroSphere3D({ className = '', style, fit = 'auto' } = {}) {
  const mountRef = useRef(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { setUnavailable(true); return undefined; }
    let disposed = false, lost = false, visible = false, frame = 0, previousTime = null, elapsed = 0, lastMetadata = -1, environment;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const segments = mobile ? 104 : 176;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, .1, 30);
    camera.position.set(0, .55, 7.25); camera.lookAt(0, -.08, 0);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
    renderer.domElement.setAttribute('aria-hidden', 'true'); mount.appendChild(renderer.domElement);
    function refreshEnvironment() {
      const source = new RoomEnvironment(), pmrem = new THREE.PMREMGenerator(renderer);
      const next = pmrem.fromScene(source, .025);
      scene.environment = next.texture; environment?.dispose(); environment = next;
      source.dispose(); pmrem.dispose();
    }
    refreshEnvironment(); scene.environmentIntensity = 1.1;
    scene.add(new THREE.HemisphereLight(0xcbd8e5, 0x202329, .55));
    const key = new THREE.DirectionalLight(0xfff5e7, .025); key.position.set(-3.5, 5.5, 3.5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xc6d9f3, .025); fill.position.set(4, 1.5, -2); scene.add(fill);
    const root = new THREE.Group(); root.name = 'rootGroup'; scene.add(root);
    const coreGroup = new THREE.Group(), shellGroupA = new THREE.Group(), shellGroupB = new THREE.Group(), scanGroup = new THREE.Group(), threatEffectGroup = new THREE.Group();
    for (const [group, name] of [[coreGroup, 'coreGroup'], [shellGroupA, 'shellGroupA'], [shellGroupB, 'shellGroupB'], [scanGroup, 'scanGroup'], [threatEffectGroup, 'threatGroup']]) { group.name = name; root.add(group); }
    const primaryCarrier = new THREE.Group(), secondaryCarrier = new THREE.Group();
    shellGroupA.add(primaryCarrier); shellGroupB.add(secondaryCarrier);
    shellGroupA.rotation.set(.3, -.18, .65); shellGroupB.rotation.set(.4, .18, -.57); scanGroup.rotation.copy(shellGroupA.rotation);
    const coreMaterial = new THREE.MeshStandardMaterial({ color: 0x030908, metalness: 0, roughness: .9, emissive: 0x35ff8a, emissiveIntensity: .002, envMapIntensity: 0, side: THREE.BackSide });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.46, mobile ? 48 : 72, mobile ? 32 : 48), coreMaterial);
    core.name = 'darkInnerChamber'; coreGroup.add(core);
    const nucleusMaterial = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(0x35ff8a) }, power: { value: 1 }, cycle: { value: 0 } },
      vertexShader: `
        varying vec3 vLocal;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vLocal = normalize(position);
          vNormal = normalize(normalMatrix * normal);
          vec4 viewed = modelViewMatrix * vec4(position, 1.0);
          vView = -viewed.xyz;
          gl_Position = projectionMatrix * viewed;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float power;
        uniform float cycle;
        varying vec3 vLocal;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vec3 n = normalize(vLocal);
          float longitude = atan(n.z, n.x);
          float latitude = asin(clamp(n.y, -1.0, 1.0));
          float horizontal = smoothstep(0.988, 1.0, cos(latitude * 42.0));
          float vertical = smoothstep(0.997, 1.0, cos(longitude * 32.0));
          float activity = pow(max(0.0, sin(longitude * 9.0 + latitude * 21.0 + cycle * 4.0)), 14.0);
          vec2 cellUV = vec2(longitude * 11.0, latitude * 14.0);
          vec2 cellId = floor(cellUV);
          float seed = fract(sin(dot(cellId, vec2(127.1, 311.7))) * 43758.5453);
          float dotShape = 1.0 - smoothstep(0.035, 0.12, length(fract(cellUV) - 0.5));
          float cells = horizontal * (0.035 + activity * 0.5) + vertical * 0.05;
          cells += dotShape * step(0.62, seed) * (0.4 + activity * 2.0);
          float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.0);
          float flow = pow(max(0.0, sin(latitude * 19.0 - longitude * 4.0 + cycle * 2.0)), 24.0);
          vec3 light = color * (0.018 + cells + rim * 0.4 + flow * 0.2) * power;
          gl_FragColor = vec4(light, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(.405, mobile ? 40 : 64, mobile ? 28 : 44), nucleusMaterial);
    nucleus.name = 'protectedDigitalNucleus'; coreGroup.add(nucleus);
    // The light belongs to the inner core, below the opaque metal shell. Depth
    // testing reveals its curved rim only through real openings between blades.
    const coreGlowMaterial = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(0x44c982) }, power: { value: 1 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vec4 viewed = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = -viewed.xyz;
          gl_Position = projectionMatrix * viewed;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float power;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float facing = max(dot(normalize(vNormal), normalize(vView)), 0.0);
          float rim = pow(1.0 - facing, 2.2);
          gl_FragColor = vec4(color * (0.25 + rim * 1.8) * power, 0.015 + rim * 0.28);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true, depthWrite: false, depthTest: true,
    });
    const coreHalo = new THREE.Mesh(new THREE.SphereGeometry(.435, mobile ? 36 : 56, mobile ? 24 : 36), coreGlowMaterial);
    coreHalo.name = 'internalCoreGlow'; coreGroup.add(coreHalo);
    const coreTraceMaterial = new THREE.MeshBasicMaterial({ color: 0x44c982, transparent: true, opacity: .22 });
    const coreTraces = new THREE.Group(); coreTraces.rotation.set(.42, .1, -.3); coreGroup.add(coreTraces);
    [-.48, .35].forEach(latitude => coreTraces.add(new THREE.Mesh(createInlay({ latitude, radius: 1.085, rake: 0 }, segments, 0, TAU, .003), coreTraceMaterial)));
    const coreLight = new THREE.PointLight(0x44c982, .6, 2.5, 2); coreLight.position.set(-.1, .1, .55); coreGroup.add(coreLight);
    const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x21272d, metalness: 1, roughness: .25 });
    const lipMaterial = new THREE.MeshStandardMaterial({ color: 0x8b9195, metalness: 1, roughness: .24, envMapIntensity: .9, side: THREE.DoubleSide });
    const primary = [0x343d41, 0x505960, 0x252e34, 0x484f53, 0x30383d, 0x51585d, 0x62696d];
    primary.forEach((color, index) => {
      const latitude = [-1.38, -.94, -.51, .51, .94, 1.38, .12][index];
      const halfWidth = index === 0 || index === 5 ? .205 : index === 6 ? .055 : .185;
      const settings = { latitude, halfWidth, radius: 1.52 + (index % 2) * .008, rake: index === 6 ? .18 : .08, phase: index === 6 ? 1.5 : .2, lap: .021 };
      const material = new THREE.MeshPhysicalMaterial({ color, metalness: .98, roughness: .17, clearcoat: .25, clearcoatRoughness: .18, envMapIntensity: 1.45, side: THREE.DoubleSide });
      const band = new THREE.Mesh(createRibbon(settings, segments), [material, edgeMaterial]); band.name = `primaryRibbon${index + 1}`; primaryCarrier.add(band);
      primaryCarrier.add(new THREE.Mesh(createInlay(settings, segments, 0, TAU, .0018, .98), lipMaterial));
    });
    [-.91, .72, 1.19].forEach((latitude, index) => {
      const settings = { latitude, halfWidth: [.036, .046, .038][index], radius: 1.541 + index * .004, rake: .19, phase: 1.5, lap: .005 };
      const material = new THREE.MeshPhysicalMaterial({ color: [0xa9b0b6, 0x858e97, 0x969fa7][index], metalness: .98, roughness: .14, clearcoat: .3, clearcoatRoughness: .2, envMapIntensity: 1.2, side: THREE.DoubleSide });
      const band = new THREE.Mesh(createRibbon(settings, segments, 6), [material, edgeMaterial]); band.name = `secondaryRibbon${index + 1}`; secondaryCarrier.add(band);
      secondaryCarrier.add(new THREE.Mesh(createInlay(settings, segments, 0, TAU, .0013, .96), lipMaterial));
    });
    const scanCarrier = new THREE.Group(); scanGroup.add(scanCarrier);
    const scanSettings = { latitude: .0, halfWidth: .0035, radius: 1.545, rake: .08, phase: .2 };
    const scanMaterial = new THREE.MeshStandardMaterial({ color: 0x68bd99, emissive: 0x469b78, emissiveIntensity: 1, metalness: .25, roughness: .28, side: THREE.DoubleSide });
    const scan = new THREE.Mesh(createInlay(scanSettings, segments), scanMaterial); scan.name = 'integratedSecurityPath'; scanCarrier.add(scan);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x64bc96, transparent: true, opacity: .11, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    scanCarrier.add(new THREE.Mesh(createInlay({ ...scanSettings, radius: 1.545 }, segments, 0, TAU, .014), glowMaterial));
    const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xb1e4c9, transparent: true, opacity: .0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const pulseCarrier = new THREE.Group();
    const pulseSettings = { ...scanSettings, radius: 1.552, halfWidth: .009 };
    const pulseGeometry = createInlay(pulseSettings, 34, 0, .52, .009);
    pulseGeometry.getAttribute('position').setUsage(THREE.DynamicDrawUsage);
    pulseCarrier.add(new THREE.Mesh(pulseGeometry, pulseMaterial)); scanGroup.add(pulseCarrier);
    const shadowTexture = softTexture('9, 17, 23', .36);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, opacity: .65 });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.2), shadowMaterial); shadow.rotation.x = -Math.PI / 2; shadow.position.set(.02, -1.9, -.1); scene.add(shadow);
    const glowTexture = softTexture('255, 255, 255', .75);
    const nucleusGlowMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0x35ff8a, transparent: true, opacity: .65, depthWrite: false, blending: THREE.AdditiveBlending });
    const nucleusGlow = new THREE.Sprite(nucleusGlowMaterial); nucleusGlow.scale.set(.92, .92, 1); nucleusGlow.position.set(0, 0, .49); coreGroup.add(nucleusGlow);
    const nucleusSparkMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0xbdffe0, transparent: true, opacity: .9, depthWrite: false, blending: THREE.AdditiveBlending });
    const nucleusSpark = new THREE.Sprite(nucleusSparkMaterial); nucleusSpark.scale.set(.23, .23, 1); nucleusSpark.position.set(0, 0, .51); coreGroup.add(nucleusSpark);
    const nucleusFlare = new THREE.Sprite(nucleusSparkMaterial); nucleusFlare.scale.set(.5, .013, 1); nucleusFlare.position.copy(nucleusSpark.position); coreGroup.add(nucleusFlare);
    const nucleusFlareVertical = new THREE.Sprite(nucleusSparkMaterial); nucleusFlareVertical.scale.set(.011, .3, 1); nucleusFlareVertical.position.copy(nucleusSpark.position); coreGroup.add(nucleusFlareVertical);
    const scanGlintMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0x70e5b2, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending });
    const scanGlint = new THREE.Sprite(scanGlintMaterial); scanGlint.scale.set(.22, .22, 1); scanCarrier.add(scanGlint);
    const threatMaterial = new THREE.MeshBasicMaterial({ color: 0xbf4d40, transparent: true, opacity: 0 });
    const threat = new THREE.Mesh(new THREE.SphereGeometry(.021, 12, 8), threatMaterial);
    const threatGlowMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0xb44537, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const threatGlow = new THREE.Sprite(threatGlowMaterial); threatGlow.scale.set(.22, .22, 1); threat.add(threatGlow); threatEffectGroup.add(threat);
    const contactDirection = new THREE.Vector3(.74, .45, 1.18).normalize();
    const perimeter = contactDirection.clone().multiplyScalar(1.604), approachStart = new THREE.Vector3(2.0, .92, .82);
    const contactPulseMaterial = new THREE.MeshBasicMaterial({ color: 0xb84d42, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
    const contactPulse = new THREE.Mesh(new THREE.RingGeometry(.047, .055, 36), contactPulseMaterial);
    contactPulse.position.copy(perimeter); contactPulse.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), contactDirection); threatEffectGroup.add(contactPulse);
    const localLight = new THREE.PointLight(0x67af93, .15, 1.3, 2); localLight.position.copy(contactDirection).multiplyScalar(1.9); threatEffectGroup.add(localLight);
    const accent = new THREE.Color(), resolvingColor = new THREE.Color(0xace2d2), threatRed = new THREE.Color(0xba443b);
    const pointer = new THREE.Vector2(), pointerTarget = new THREE.Vector2();
    const pointerSurface = mount.closest('section') || mount;

    function renderAt(time, delta = 0) {
      if (disposed || lost) return;
      const state = sampleSecuritySequence(reducedMotion.matches ? 0 : time), cycle = state.time / 30 * TAU;
      primaryCarrier.rotation.y = state.angleA; secondaryCarrier.rotation.y = state.angleB;
      shellGroupA.rotation.x = .3 + .06 * Math.sin(cycle); shellGroupA.rotation.z = .65 + .055 * Math.sin(cycle * 2);
      shellGroupB.rotation.x = .4 + .065 * Math.sin(cycle); shellGroupB.rotation.z = -.57 + .065 * Math.sin(cycle * 2);
      scanGroup.rotation.copy(shellGroupA.rotation); scanCarrier.rotation.y = state.angleA; pulseCarrier.rotation.y = state.angleA;
      // Move a short luminous segment along the exact raked inlay. Rotating a
      // separate ring here would drift off the shell's security path.
      const pulsePositions = pulseGeometry.getAttribute('position');
      for (let i = 0; i <= 34; i += 1) {
        for (let side = 0; side < 2; side += 1) {
          const point = ribbonPoint(cycle * 2 + i / 34 * .52, side * 2 - 1, pulseSettings);
          pulsePositions.setXYZ(i * 2 + side, point.x, point.y, point.z);
        }
      }
      pulsePositions.needsUpdate = true;
      scanGlint.position.copy(ribbonPoint(-.48 + cycle * 2, 0, { ...scanSettings, radius: 1.57 }));
      coreGroup.rotation.y = .012 * Math.sin(cycle);
      pointer.lerp(pointerTarget, 1 - Math.exp(-delta * 4)); root.rotation.set(pointer.y * .02, pointer.x * .03, 0);
      root.position.y = reducedMotion.matches ? 0 : .025 * Math.sin(cycle * 5); shadowMaterial.opacity = .64 - root.position.y * .5;
      accent.setRGB(...state.color); scanMaterial.color.copy(accent); scanMaterial.emissive.copy(accent);
      const corePower = .94 + .1 * Math.sin(cycle * 2) + .2 * state.defense + .12 * state.resolve;
      coreMaterial.emissive.copy(accent); coreMaterial.emissiveIntensity = .002 * corePower;
      coreGlowMaterial.uniforms.color.value.copy(accent); coreGlowMaterial.uniforms.power.value = corePower;
      nucleusMaterial.uniforms.color.value.copy(accent); nucleusMaterial.uniforms.power.value = corePower; nucleusMaterial.uniforms.cycle.value = cycle;
      nucleusGlowMaterial.color.copy(accent); nucleusGlowMaterial.opacity = .3 * corePower;
      nucleusSparkMaterial.color.copy(accent).lerp(resolvingColor, .88);
      coreTraceMaterial.color.copy(accent); coreLight.color.copy(accent); coreLight.intensity = .62 * corePower;
      scanGlintMaterial.color.copy(accent); scanGlintMaterial.opacity = .5 + .1 * state.resolve;
      scanMaterial.emissiveIntensity = 1 + state.defense * .12; glowMaterial.color.copy(accent); glowMaterial.opacity = .085 + state.defense * .03;
      pulseMaterial.color.copy(accent).lerp(resolvingColor, .18); pulseMaterial.opacity = .13 * state.defense + .34 * state.resolve;
      threatEffectGroup.visible = state.threatOpacity > .001 || state.defense > .001 || state.resolve > .001;
      threat.position.lerpVectors(approachStart, perimeter, state.threatProgress);
      threatMaterial.color.copy(threatRed).lerp(resolvingColor, state.resolve); threatMaterial.opacity = state.threatOpacity;
      threatGlowMaterial.color.copy(threatMaterial.color); threatGlowMaterial.opacity = state.threatOpacity * .5; threat.scale.setScalar(1 - .45 * state.resolve);
      const pulse = .5 + .5 * Math.sin(state.time * 1.7);
      contactPulse.scale.setScalar(1 + pulse * .7 + state.isolation * .22); contactPulseMaterial.color.copy(accent);
      contactPulseMaterial.opacity = state.threatOpacity * state.defense * (.14 + .18 * pulse);
      localLight.color.copy(accent); localLight.intensity = .055 + state.defense * .16 + state.resolve * .13;
      renderer.render(scene, camera);
      if (Math.abs(time - lastMetadata) > .1 || lastMetadata === -1) {
        mount.dataset.securityPhase = state.phase; mount.dataset.securityTime = state.time.toFixed(3); mount.dataset.shellSpeed = state.speedA.toFixed(3);
        mount.dataset.coreColor = accent.getHexString(); mount.dataset.coreGlow = corePower.toFixed(3); lastMetadata = time;
      }
    }
    function tick(now) {
      frame = 0;
      if (disposed || lost || !visible || document.hidden || reducedMotion.matches) return;
      const delta = previousTime === null ? 0 : Math.max(0, (now - previousTime) / 1000); previousTime = now; elapsed += delta;
      renderAt(elapsed, Math.min(delta, .1)); frame = requestAnimationFrame(tick);
    }
    function updateAnimation() {
      cancelAnimationFrame(frame); frame = 0; previousTime = null;
      mount.dataset.animation = visible && !document.hidden && !lost && !reducedMotion.matches ? 'running' : 'paused';
      if (disposed || lost || !visible || document.hidden) return;
      renderAt(elapsed); if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (disposed || lost || !mount.clientWidth || !mount.clientHeight) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight, false); camera.aspect = mount.clientWidth / mount.clientHeight; camera.zoom = Math.min(1, camera.aspect); camera.updateProjectionMatrix();
      if (!document.hidden) renderAt(elapsed);
    }
    function movePointer(event) {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      const rect = pointerSurface.getBoundingClientRect();
      pointerTarget.set(THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1), THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1));
    }
    function resetPointer() { pointerTarget.set(0, 0); }
    function motionChange() { pointer.set(0, 0); pointerTarget.set(0, 0); elapsed = 0; lastMetadata = -1; updateAnimation(); }
    function contextLost(event) { event.preventDefault(); lost = true; cancelAnimationFrame(frame); previousTime = null; mount.dataset.animation = 'paused'; setUnavailable(true); }
    function contextRestored() { if (disposed) return; refreshEnvironment(); lost = false; setUnavailable(false); resize(); updateAnimation(); }
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(mount);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateAnimation(); }, { threshold: .02 }); observer.observe(mount);
    document.addEventListener('visibilitychange', updateAnimation); reducedMotion.addEventListener('change', motionChange);
    pointerSurface.addEventListener('pointermove', movePointer, { passive: true }); pointerSurface.addEventListener('pointerleave', resetPointer);
    renderer.domElement.addEventListener('webglcontextlost', contextLost); renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    resize();
    return () => {
      disposed = true; cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect();
      document.removeEventListener('visibilitychange', updateAnimation); reducedMotion.removeEventListener('change', motionChange);
      pointerSurface.removeEventListener('pointermove', movePointer); pointerSurface.removeEventListener('pointerleave', resetPointer);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost); renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
      shadowTexture.dispose(); glowTexture.dispose(); environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    };
  }, []);
  return <><style>{SPHERE_STYLES}</style><div ref={mountRef} className={`hero-sphere penetix-security-core${unavailable ? ' penetix-security-core--unavailable' : ''} ${className}`} style={style} data-layout={fit} role="img" aria-label="PENETIX security illustration: graphite protective ribbons rotate around a stable illuminated inner core, visible through the shell. Its light changes from secure green through amber and alert red and back to green as a simulated threat is contained and neutralized in a repeating 30-second sequence." data-shell-count="10">
    {unavailable && <span className="penetix-security-core__fallback">PENETIX<br />SECURITY SYSTEM 001</span>}
  </div></>;
}

export default HeroSphere3D;
