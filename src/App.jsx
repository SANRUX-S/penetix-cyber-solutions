import { useEffect, useRef } from 'react'

function SecurityCore() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let cancelled = false
    let cleanup = () => {}

    const start = async () => {
      try {
        const THREE = await import('three')
        if (cancelled || !mount.isConnected) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
        camera.position.set(0, 0, 6)

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        })

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35))
        renderer.setClearColor(0x000000, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        mount.innerHTML = ''
        mount.appendChild(renderer.domElement)

        const group = new THREE.Group()
        scene.add(group)

        const coreMaterial = new THREE.MeshStandardMaterial({
          color: 0x172129,
          metalness: 0.9,
          roughness: 0.26,
        })

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.42, window.innerWidth < 720 ? 3 : 4),
          coreMaterial,
        )
        group.add(core)

        const bandGroups = []
        const angles = [
          [0.18, 0.2, 0.08],
          [-0.32, 0.55, 0.16],
          [0.48, -0.15, 0.3],
          [0.05, 0.78, -0.4],
          [-0.55, 0.2, 0.62],
          [0.64, 0.5, -0.16],
          [-0.18, -0.62, 0.44],
          [0.36, -0.28, -0.62],
        ]

        const ringCount = window.innerWidth < 720 ? 5 : 8

        angles.slice(0, ringCount).forEach(([x, y, z], i) => {
          const ringWrap = new THREE.Group()
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(1.62 + i * 0.02, 0.075, 8, window.innerWidth < 720 ? 54 : 78),
            new THREE.MeshStandardMaterial({
              color: i % 3 === 0 ? 0x2b3a3c : 0x243136,
              metalness: 0.88,
              roughness: 0.24,
            }),
          )
          ring.scale.y = 0.94
          ringWrap.rotation.set(x, y, z)
          ringWrap.add(ring)
          group.add(ringWrap)
          bandGroups.push(ringWrap)
        })

        const scanMaterial = new THREE.MeshStandardMaterial({
          color: 0x68c997,
          emissive: 0x2d765d,
          emissiveIntensity: 1.25,
          metalness: 0.2,
          roughness: 0.25,
        })

        const scanWrap = new THREE.Group()
        scanWrap.rotation.set(0.5, -0.22, 0.32)
        const scanRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.73, 0.022, 7, window.innerWidth < 720 ? 72 : 110),
          scanMaterial,
        )
        scanWrap.add(scanRing)
        group.add(scanWrap)

        const particleGeometry = new THREE.BufferGeometry()
        const particleCount = window.innerWidth < 720 ? 6 : 16
        const positions = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i += 1) {
          const r = 2.05 + Math.random() * 0.45
          const a = Math.random() * Math.PI * 2
          const b = Math.random() * Math.PI
          positions[i * 3] = Math.cos(a) * Math.sin(b) * r
          positions[i * 3 + 1] = Math.cos(b) * r * 0.82
          positions[i * 3 + 2] = Math.sin(a) * Math.sin(b) * r
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const particleMaterial = new THREE.PointsMaterial({
          color: 0x8ab8a6,
          size: 0.024,
          transparent: true,
          opacity: 0.48,
        })

        const particles = new THREE.Points(particleGeometry, particleMaterial)
        group.add(particles)

        scene.add(new THREE.HemisphereLight(0xeef4ef, 0x172129, 2.0))

        const key = new THREE.DirectionalLight(0xffffff, 3.8)
        key.position.set(-4, 5, 6)
        scene.add(key)

        const fill = new THREE.DirectionalLight(0x93b3ba, 1.65)
        fill.position.set(4, 0, 4)
        scene.add(fill)

        const rim = new THREE.PointLight(0x68c997, 5.5, 10)
        rim.position.set(2.8, -0.2, 3.2)
        scene.add(rim)

        const pointer = { x: 0, y: 0 }
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
        let inView = true
        let rafId = 0

        const onPointerMove = (event) => {
          const rect = mount.getBoundingClientRect()
          if (!rect.width || !rect.height) return
          pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
          pointer.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2)
        }

        mount.addEventListener('pointermove', onPointerMove)

        const resize = () => {
          const { clientWidth, clientHeight } = mount
          if (!clientWidth || !clientHeight) return
          renderer.setSize(clientWidth, clientHeight, false)
          camera.aspect = clientWidth / clientHeight
          camera.updateProjectionMatrix()
        }

        resize()

        let resizeObserver = null
        if ('ResizeObserver' in window) {
          resizeObserver = new ResizeObserver(resize)
          resizeObserver.observe(mount)
        } else {
          window.addEventListener('resize', resize)
        }

        let intersection = null
        if ('IntersectionObserver' in window) {
          intersection = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting
          }, { threshold: 0.05 })
          intersection.observe(mount)
        }

        const clock = new THREE.Clock()

        const animate = () => {
          rafId = requestAnimationFrame(animate)
          if (!inView) return

          const t = clock.getElapsedTime()

          if (!reducedMotion) {
            group.rotation.y += 0.00115
            const targetX = pointer.y * THREE.MathUtils.degToRad(3)
            const targetY = pointer.x * THREE.MathUtils.degToRad(5)
            group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.035)
            group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -targetY * 0.2, 0.03)

            bandGroups.forEach((band, i) => {
              band.rotation.z += 0.00028 * (i % 2 === 0 ? 1 : -1)
            })

            scanWrap.rotation.y = t * 0.13
            particles.rotation.y = t * 0.02
          }

          renderer.render(scene, camera)
        }

        animate()

        cleanup = () => {
          cancelAnimationFrame(rafId)
          intersection?.disconnect()
          resizeObserver?.disconnect()
          window.removeEventListener('resize', resize)
          mount.removeEventListener('pointermove', onPointerMove)

          particleGeometry.dispose()
          particleMaterial.dispose()
          core.geometry.dispose()
          coreMaterial.dispose()

          bandGroups.forEach((band) => {
            const mesh = band.children[0]
            mesh?.geometry?.dispose()
            mesh?.material?.dispose()
          })

          scanRing.geometry.dispose()
          scanMaterial.dispose()
          renderer.dispose()

          if (renderer.domElement.parentNode === mount) {
            mount.removeChild(renderer.domElement)
          }
        }
      } catch (error) {
        console.error('PENETIX 3D core failed to initialize:', error)
        if (!cancelled && mount) {
          mount.classList.add('core-fallback')
          mount.innerHTML = '<div class="core-fallback-mark"><span></span><strong>PENETIX</strong><small>SECURITY CORE</small></div>'
        }
      }
    }

    start()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <div className="visual-shell" aria-label="Interactive PENETIX security core">
      <div className="system-label">
        <strong>PENETIX</strong>
        <span>SECURITY SYSTEM 001</span>
      </div>
      <div ref={mountRef} className="security-core">
        <div className="core-loading" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="visual-rail">
        <span>ASSESS</span>
        <span>HARDEN</span>
        <span>PROTECT</span>
        <span>IMPROVE</span>
      </div>
      <div className="visual-quote">A SAFER DIGITAL WORLD BUILDS BRIGHTER TOMORROWS.</div>
    </div>
  )
}

function App() {
  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav">
          <a className="brand" href="#" aria-label="PENETIX home">
            <span className="brand-mark">P</span>
            <span>
              <strong>PENETIX</strong>
              <small>SECURE TODAY. STRONGER TOMORROW.</small>
            </span>
          </a>

          <div className="nav-links">
            <a className="active" href="#">Home</a>
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#company">Company</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <span className="availability"><i />Available for Security Assessments</span>
            <a className="nav-cta" href="#contact">Start an Assessment <span>→</span></a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CYBERSECURITY FOR MODERN BUSINESSES</p>
          <h1>
            Security without<br />
            the noise.
            <span>Clarity. Protection. <em>Confidence.</em></span>
          </h1>

          <p className="lead">
            Practical cybersecurity assessments, hardening and risk reduction for growing businesses.
          </p>
          <p className="sublead">
            Understand your exposure. Fix what matters. Build stronger security.
          </p>

          <div className="hero-actions">
            <a className="primary-btn" href="#contact">Start a Security Review <span>→</span></a>
            <a className="secondary-btn" href="#approach"><b>▶</b> Watch Our Story</a>
          </div>

          <div className="trust-row">
            <span>✓ <b>Clear Reporting</b></span>
            <span>♙ <b>Business Focused</b></span>
            <span>♙ <b>Confidential by Design</b></span>
          </div>
        </div>

        <SecurityCore />
      </section>

      <section className="service-preview" id="services">
        <div>
          <p className="eyebrow">WHAT WE DO</p>
          <h2>Practical cybersecurity for real businesses.</h2>
        </div>
        <p>Focused security reviews designed to identify meaningful risk and give businesses a clear path forward.</p>
      </section>
    </main>
  )
}

export default App
