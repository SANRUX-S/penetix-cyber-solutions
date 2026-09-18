import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroSphere3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    let frame = 0;
    let observer;
    let resizeObserver;
    let disposed = false;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.05, 6.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      mount.appendChild(renderer.domElement);

      const root = new THREE.Group();
      root.rotation.set(-0.12, -0.18, -0.22);
      scene.add(root);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(1.36, window.innerWidth < 720 ? 32 : 64, window.innerWidth < 720 ? 24 : 48),
        new THREE.MeshPhysicalMaterial({
          color: 0x07110f,
          metalness: 0.96,
          roughness: 0.19,
          clearcoat: 0.85,
          clearcoatRoughness: 0.15,
        })
      );
      root.add(core);

      const inner = new THREE.Mesh(
        new THREE.SphereGeometry(1.15, 40, 30),
        new THREE.MeshStandardMaterial({
          color: 0x13231e,
          metalness: 0.65,
          roughness: 0.3,
          emissive: 0x062319,
          emissiveIntensity: 0.25,
        })
      );
      root.add(inner);

      const bands = [];
      const bandAngles = [
        [0.05, 0.08, 0.68],
        [0.18, -0.08, 0.68],
        [-0.14, 0.2, 0.68],
        [0.32, 0.12, 0.68],
        [-0.3, -0.1, 0.68],
        [0.47, -0.08, 0.68],
        [-0.48, 0.14, 0.68],
        [0.64, 0.08, 0.68],
        [-0.63, -0.08, 0.68],
      ];

      bandAngles.forEach((rot, i) => {
        const wrap = new THREE.Group();
        wrap.rotation.set(rot[0], rot[1], rot[2]);
        const mesh = new THREE.Mesh(
          new THREE.TorusGeometry(1.48 + (i % 3) * 0.045, i % 2 ? 0.082 : 0.105, 14, window.innerWidth < 720 ? 72 : 128),
          new THREE.MeshPhysicalMaterial({
            color: i % 3 === 0 ? 0x303a37 : 0x171f1d,
            metalness: 1,
            roughness: i % 2 ? 0.17 : 0.24,
            clearcoat: 0.65,
            clearcoatRoughness: 0.2,
          })
        );
        mesh.scale.set(1, 0.95, 1);
        wrap.add(mesh);
        root.add(wrap);
        bands.push(wrap);
      });

      const scanWrap = new THREE.Group();
      scanWrap.rotation.set(0.22, -0.15, 0.71);
      const scan = new THREE.Mesh(
        new THREE.TorusGeometry(1.58, 0.025, 10, 150),
        new THREE.MeshStandardMaterial({
          color: 0x7ff0aa,
          emissive: 0x3fb96f,
          emissiveIntensity: 2.2,
          metalness: 0.35,
          roughness: 0.18,
        })
      );
      scanWrap.add(scan);
      root.add(scanWrap);

      const accentWrap = new THREE.Group();
      accentWrap.rotation.set(-0.35, 0.12, 0.69);
      const accent = new THREE.Mesh(
        new THREE.TorusGeometry(1.53, 0.012, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0xd7efe0, transparent: true, opacity: 0.58 })
      );
      accentWrap.add(accent);
      root.add(accentWrap);

      const particleCount = window.innerWidth < 720 ? 8 : 20;
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 1.9 + Math.random() * 0.7;
        const a = Math.random() * Math.PI * 2;
        const b = Math.random() * Math.PI;
        positions[i * 3] = Math.cos(a) * Math.sin(b) * r;
        positions[i * 3 + 1] = Math.cos(b) * r * 0.75;
        positions[i * 3 + 2] = Math.sin(a) * Math.sin(b) * r;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ color: 0xcfe8db, size: 0.022, transparent: true, opacity: 0.45 })
      );
      root.add(particles);

      scene.add(new THREE.HemisphereLight(0xeef4ef, 0x06100e, 2.1));

      const key = new THREE.DirectionalLight(0xffffff, 5.2);
      key.position.set(-4.5, 5.5, 6.5);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0x8caeaa, 2.0);
      fill.position.set(4, -0.5, 5);
      scene.add(fill);

      const rim = new THREE.PointLight(0x6ee59a, 13, 10);
      rim.position.set(2.8, 0.2, 3.5);
      scene.add(rim);

      const warm = new THREE.PointLight(0xffe2b4, 4.5, 10);
      warm.position.set(-2.5, 2.2, 4);
      scene.add(warm);

      const pointer = { x: 0, y: 0 };
      let visible = true;

      const onPointer = (e) => {
        const r = mount.getBoundingClientRect();
        if (!r.width || !r.height) return;
        pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        pointer.y = -(((e.clientY - r.top) / r.height - 0.5) * 2);
      };
      mount.addEventListener('pointermove', onPointer);

      const resize = () => {
        const w = mount.clientWidth || 1;
        const h = mount.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
      } else {
        window.addEventListener('resize', resize);
      }

      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.03 });
        observer.observe(mount);
      }

      const clock = new THREE.Clock();
      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (!visible || disposed) return;
        const t = clock.getElapsedTime();

        if (!reduced) {
          root.rotation.y += 0.00125;
          root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -0.12 + pointer.y * 0.045, 0.035);
          root.rotation.z = THREE.MathUtils.lerp(root.rotation.z, -0.22 - pointer.x * 0.06, 0.035);

          bands.forEach((band, i) => {
            band.rotation.z += (i % 2 ? -1 : 1) * 0.00022;
          });

          scanWrap.rotation.y = Math.sin(t * 0.35) * 0.18;
          scanWrap.rotation.z = 0.71 + t * 0.022;
          particles.rotation.y = t * 0.035;
          root.position.y = Math.sin(t * 0.65) * 0.035;
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        resizeObserver?.disconnect();
        window.removeEventListener('resize', resize);
        mount.removeEventListener('pointermove', onPointer);
        scene.traverse((obj) => {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material?.dispose?.();
        });
        renderer?.dispose();
        renderer?.domElement?.remove();
      };
    } catch (err) {
      console.error('PENETIX 3D hero failed:', err);
      mount.classList.add('sphere-fallback');
    }
  }, []);

  return <div ref={mountRef} className="hero-sphere-3d" aria-label="Animated PENETIX metallic security core" />;
}
