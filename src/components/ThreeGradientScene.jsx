import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ThreeGradientScene = forwardRef(function ThreeGradientScene(
  {
    interactive = true,
    parallaxStrength = 0.35,
    noiseOpacity = 0.045,
  },
  ref
) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const scrollRef = useRef({ progress: 0, velocity: 0 });

  // Expose setScroll directly to avoid triggering React re-renders on scroll
  useImperativeHandle(ref, () => ({
    setScroll: (progress, velocity = 0) => {
      scrollRef.current.progress = progress;
      scrollRef.current.velocity = velocity;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#d40f00'); // Instant rich base color

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Camera Setup (fov: 35, position: [0, 0, 6])
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor('#d40f00', 1.0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // 4. Load Equirectangular Scene Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/textures/scene-gradient.webp',
      (tex) => {
        tex.mapping = THREE.EquirectangularReflectionMapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        scene.background = tex;
        scene.environment = tex;
      },
      undefined,
      (err) => {
        console.warn('Fallback loading gradient texture...', err);
        textureLoader.load('https://guillaumezhu.com/home/hero/textures/desktop/scene-gradient.webp', (tex) => {
          tex.mapping = THREE.EquirectangularReflectionMapping;
          tex.colorSpace = THREE.SRGBColorSpace;
          scene.background = tex;
          scene.environment = tex;
        });
      }
    );

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const pinkBackLight = new THREE.DirectionalLight(0xff4477, 0.6);
    pinkBackLight.position.set(-3, -2, -4);
    scene.add(pinkBackLight);

    // 6. Central 3D Logo Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/logo.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color('#ffffff'),
              metalness: 0.95,
              roughness: 0.35,
              clearcoat: 0.8,
              clearcoatRoughness: 0.2,
              reflectivity: 1.0,
            });
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.0 / (maxDim || 1);
        model.scale.setScalar(scale);

        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scale));

        logoGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('GLTF load error:', err);
      }
    );

    // 7. Typography in 3D Space
    const createDynamicTextTexture = (
      text,
      {
        fontSize = 200,
        fontWeight = '800',
        lineHeight = 1.05,
        letterSpacing = '-0.02em',
        textAlign = 'center',
        width = 2048,
        height = 1024,
      } = {}
    ) => {
      const textCanvas = document.createElement('canvas');
      textCanvas.width = width;
      textCanvas.height = height;
      const ctx = textCanvas.getContext('2d');

      const lines = Array.isArray(text) ? text : String(text).split('\n');
      const totalLines = lines.length;

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';

        let activeFontSize = fontSize;
        ctx.font = `${fontWeight} ${activeFontSize}px 'Mori', 'Cabinet Grotesk', 'Space Grotesk', 'Inter', -apple-system, sans-serif`;

        // Check if any line overflows canvas width and reduce font size accordingly
        let maxW = 0;
        lines.forEach((l) => {
          const w = ctx.measureText(l.trim()).width;
          if (w > maxW) maxW = w;
        });

        if (maxW > width * 0.86) {
          activeFontSize = Math.floor(activeFontSize * ((width * 0.86) / maxW));
          ctx.font = `${fontWeight} ${activeFontSize}px 'Mori', 'Cabinet Grotesk', 'Space Grotesk', 'Inter', -apple-system, sans-serif`;
        }

        ctx.textAlign = textAlign;
        ctx.textBaseline = 'middle';
        if (ctx.letterSpacing !== undefined) {
          ctx.letterSpacing = letterSpacing;
        }

        const lineSpacing = activeFontSize * lineHeight;
        const startY = height / 2 - ((totalLines - 1) * lineSpacing) / 2;

        let drawX = width / 2;
        if (textAlign === 'left') {
          drawX = (width - maxW) / 2;
        } else if (textAlign === 'right') {
          drawX = (width + maxW) / 2;
        }

        lines.forEach((line, idx) => {
          ctx.fillText(line.trim(), drawX, startY + idx * lineSpacing);
        });
      };

      render();

      const tex = new THREE.CanvasTexture(textCanvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          render();
          tex.needsUpdate = true;
        });
      }

      return tex;
    };

    const createTextPlane = (texturePath, w, h, posX, posY, posZ, rotY) => {
      const tex = textureLoader.load(texturePath);
      tex.colorSpace = THREE.SRGBColorSpace;
      const geom = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(posX, posY, posZ);
      mesh.rotation.y = rotY;
      scene.add(mesh);
      return mesh;
    };

    const createDynamicTextPlane = (text, w, h, posX, posY, posZ, rotY, opts = {}) => {
      const tex = createDynamicTextTexture(text, opts);
      const geom = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(posX, posY, posZ);
      mesh.rotation.y = rotY;
      scene.add(mesh);
      return mesh;
    };

    // Responsive textures for Hero: Desktop (2 lines: "uncommon" / "institute of design") & Mobile (3 lines)
    const heroDesktopTex = createDynamicTextTexture('uncommon\ninstitute of design', {
      fontSize: 180,
      fontWeight: '800',
      lineHeight: 1.05,
      width: 2048,
      height: 1024,
    });

    const heroMobileTex = createDynamicTextTexture('uncommon\ninstitute\nof design', {
      fontSize: 220,
      fontWeight: '800',
      lineHeight: 1.08,
      width: 2048,
      height: 1200,
    });

    // Text 1: "uncommon" on line 1, "institute of design" on line 2 (Center initial view facing Z)
    const textNameMesh = createDynamicTextPlane(
      'uncommon\ninstitute of design',
      9.0,
      4.5,
      0,
      0,
      -2.5,
      0,
      { fontSize: 180, fontWeight: '800', lineHeight: 1.05, width: 2048, height: 1024 }
    );

    // Text 2: "think\nuncommon" (Left alignment, Orbit view facing -X)
    const textArtDirectorMesh = createDynamicTextPlane(
      'think\nuncommon',
      5.2,
      2.6,
      1.0,
      5.25,
      -1.75,
      -Math.PI * 0.5,
      { fontSize: 220, fontWeight: '700', lineHeight: 1.05, textAlign: 'left', width: 2048, height: 1024 }
    );
    textArtDirectorMesh.material.opacity = 0;

    // Text 3: "be\nuncommon" (Right alignment, Orbit view facing -X)
    const textCreativeDevMesh = createDynamicTextPlane(
      'be\nuncommon',
      5.2,
      2.6,
      1.0,
      6.5,
      1.25,
      -Math.PI * 0.5,
      { fontSize: 220, fontWeight: '700', lineHeight: 1.05, textAlign: 'right', width: 2048, height: 1024 }
    );
    textCreativeDevMesh.material.opacity = 0;



    // 8. Mouse & Parallax State
    const mouseState = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseState.targetX = x * parallaxStrength;
      mouseState.targetY = y * parallaxStrength;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 9. Resize Handling (Optimized for both mobile and desktop views)
    let lastWidth = 0;
    let lastHeight = 0;

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      // Prevent WebGL canvas buffer reallocation on mobile address bar scroll (blinking fix)
      const isMobileHeightJitter = Math.abs(w - lastWidth) < 2 && Math.abs(h - lastHeight) < 140;
      if (lastWidth > 0 && lastHeight > 0 && isMobileHeightJitter) {
        return;
      }
      lastWidth = w;
      lastHeight = h;

      const isMobile = w <= 860 || w < h;
      camera.fov = isMobile ? 42 : 35;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Calculate view dimensions at hero text distance
      const distHero = camera.position.distanceTo(textNameMesh.position);
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeightHero = 2 * distHero * Math.tan(fovRad * 0.5);
      const visibleWidthHero = visibleHeightHero * camera.aspect;

      if (isMobile) {
        // Swap to 3-line mobile texture ("uncommon\ninstitute\nof design")
        if (textNameMesh.material.map !== heroMobileTex) {
          textNameMesh.material.map = heroMobileTex;
          textNameMesh.material.needsUpdate = true;
        }

        // Clean mobile scale that fits comfortably within mobile screen width
        const mobileHeroScale = Math.min(
          (visibleWidthHero * 0.84) / 6.0,
          (visibleHeightHero * 0.50) / 4.5
        );
        textNameMesh.scale.setScalar(mobileHeroScale);

        // 2. Orbit texts ("think\nuncommon" & "be\nuncommon")
        // Center both along screen center (Z = 0) and stack above and below the 3D logo
        const distOrbit = 6.0;
        const visibleHeightOrbit = 2 * distOrbit * Math.tan(fovRad * 0.5);
        const visibleWidthOrbit = visibleHeightOrbit * camera.aspect;

        // Position "be\nuncommon" above logo, scaled to stay comfortably on-screen
        textCreativeDevMesh.position.set(-0.1, 7.0, 0);
        const devScale = Math.min(1.0, (visibleWidthOrbit * 0.84) / 4.8);
        textCreativeDevMesh.scale.setScalar(devScale);

        // Position "think\nuncommon" below logo, scaled to stay comfortably on-screen
        textArtDirectorMesh.position.set(0.1, 5.0, 0);
        const instScale = Math.min(1.0, (visibleWidthOrbit * 0.84) / 4.8);
        textArtDirectorMesh.scale.setScalar(instScale);
      } else {
        // Swap to desktop 2-line texture ("uncommon\ninstitute of design")
        if (textNameMesh.material.map !== heroDesktopTex) {
          textNameMesh.material.map = heroDesktopTex;
          textNameMesh.material.needsUpdate = true;
        }

        // Desktop sizing and positions
        const targetScale = Math.min(
          1,
          (visibleWidthHero * 0.86) / 9.0,
          (visibleHeightHero * 0.86) / 4.5
        );
        textNameMesh.scale.setScalar(targetScale);

        // Restore desktop staggered positions and 1.0 scale
        textCreativeDevMesh.position.set(1.0, 6.5, 1.25);
        textCreativeDevMesh.scale.setScalar(1.0);

        textArtDirectorMesh.position.set(1.0, 5.25, -1.75);
        textArtDirectorMesh.scale.setScalar(1.0);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);
    handleResize();

    // 10. Animation & Render Loop
    let animId = null;
    let lastTime = performance.now();

    const renderLoop = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse lerp
      mouseState.currentX += (mouseState.targetX - mouseState.currentX) * 0.08;
      mouseState.currentY += (mouseState.targetY - mouseState.currentY) * 0.08;

      const p = THREE.MathUtils.clamp(scrollRef.current.progress, 0, 1);
      const vel = Math.abs(scrollRef.current.velocity);

      // Camera Orbit & Rise calculation
      const targetHeight = p * 6.0;
      const targetAngle = -p * (Math.PI * 0.5); // 90 degree camera rotation around center

      const baseCamX = Math.sin(targetAngle) * 6.0;
      const baseCamZ = Math.cos(targetAngle) * 6.0;

      // Apply mouse parallax relative to camera orientation
      const perpAngle = targetAngle + Math.PI * 0.5;
      camera.position.x = baseCamX + Math.cos(perpAngle) * mouseState.currentX * 0.6;
      camera.position.z = baseCamZ + Math.sin(perpAngle) * mouseState.currentX * 0.6;
      camera.position.y = targetHeight + mouseState.currentY * 0.4;
      camera.lookAt(0, targetHeight, 0);

      // 3D Logo floats with height and spins continuously on tilted axis
      logoGroup.position.y = targetHeight;
      const spinSpeed = 0.25 + THREE.MathUtils.clamp(vel * 0.002, 0, 1.5);
      logoGroup.rotateOnAxis(new THREE.Vector3(0.2, 1.0, 0.1).normalize(), delta * spinSpeed);

      // 1. Text: "uncommon institute of design" translates upwards and fades out cleanly
      const nameOpacity = 1.0 - THREE.MathUtils.smoothstep(p, 0.08, 0.38);
      textNameMesh.material.opacity = nameOpacity;
      // Translates upward relative to camera so it moves up and out of the viewport
      textNameMesh.position.y = targetHeight + p * 5.0;

      // 2. Texts: "art director" and "creative developer" emerge between 0.45 and 0.75
      // and remain 100% visible and settled from 0.75 to 1.0
      const emergeOpacity = THREE.MathUtils.smoothstep(p, 0.45, 0.75);
      textArtDirectorMesh.material.opacity = emergeOpacity;
      textCreativeDevMesh.material.opacity = emergeOpacity;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, [interactive, parallaxStrength]);

  return (
    <div ref={containerRef} className="scene-container">
      <canvas ref={canvasRef} className="webgl-canvas" />
      {noiseOpacity > 0 && (
        <div
          className="noise-layer"
          style={{ opacity: noiseOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  );
});

export default ThreeGradientScene;
