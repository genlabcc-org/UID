import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const ThreeGradientScene = forwardRef(function ThreeGradientScene(
  {
    interactive = true,
    parallaxStrength = 0.35,
    noiseOpacity = 0.045,
    children,
  },
  ref
) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollRef = useRef({ progress: 0, velocity: 0 });

  // Expose setScroll directly to avoid triggering React re-renders on scroll
  useImperativeHandle(ref, () => ({
    setScroll: (progress, velocity = 0) => {
      scrollRef.current.progress = progress;
      scrollRef.current.velocity = velocity;
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Camera Setup
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // 2. Scene & WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#d40f00'); // Base vibrant crimson

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

    // 3. Load Equirectangular Scene Texture
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

    // 4. Mouse & Parallax State
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

    // 5. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);
    handleResize();

    // 6. Animation Loop (Camera Orbit & Mouse Parallax)
    let animId = null;

    const renderLoop = () => {
      // Mouse lerp
      mouseState.currentX += (mouseState.targetX - mouseState.currentX) * 0.08;
      mouseState.currentY += (mouseState.targetY - mouseState.currentY) * 0.08;

      const p = THREE.MathUtils.clamp(scrollRef.current.progress, 0, 1);

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
      {/* Background 3D Equirectangular Gradient Canvas */}
      <canvas ref={canvasRef} className="webgl-canvas" />

      {/* Noise Texture */}
      {noiseOpacity > 0 && (
        <div
          className="noise-layer"
          style={{ opacity: noiseOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Middle Content Overlay */}
      {children}
    </div>
  );
});

export default ThreeGradientScene;
