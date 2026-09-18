const mount = document.getElementById('security-core')

if (mount) {
  import('three')
    .then((THREE) => {
      const fallback = mount.querySelector('.core-fallback-mark')

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
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)

      if (fallback) fallback.style.display = 'none'

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
      window.addEventListener('resize', resize)

      const animate = () => {
        requestAnimationFrame(animate)

        if (!reducedMotion) {
          group.rotation.y += 0.00115
          const targetX = pointer.y * THREE.MathUtils.degToRad(3)
          const targetY = pointer.x * THREE.MathUtils.degToRad(5)
          group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.035)
          group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -targetY * 0.2, 0.03)

          bandGroups.forEach((band, i) => {
            band.rotation.z += 0.00028 * (i % 2 === 0 ? 1 : -1)
          })

          scanWrap.rotation.y += 0.002
        }

        renderer.render(scene, camera)
      }

      animate()
    })
    .catch((error) => {
      console.error('PENETIX 3D failed to load. Static fallback kept visible.', error)
    })
}
