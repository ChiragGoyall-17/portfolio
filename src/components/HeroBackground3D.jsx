import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 15, 35);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Particles Grid Setup
    const numX = 45;
    const numZ = 45;
    const separation = 1.8;
    const count = numX * numZ;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Palette: Indigo (#6366f1) to Purple (#a855f7) to Cyan (#06b6d4)
    const colorIndigo = new THREE.Color(0.388, 0.4, 0.945); // 6366f1
    const colorPurple = new THREE.Color(0.659, 0.333, 0.969); // a855f7
    const colorCyan = new THREE.Color(0.024, 0.714, 0.831); // 06b6d4

    let index = 0;
    for (let x = 0; x < numX; x++) {
      for (let z = 0; z < numZ; z++) {
        // Center the grid around origin
        const posX = (x - numX / 2) * separation;
        const posZ = (z - numZ / 2) * separation;
        positions[index * 3] = posX;
        positions[index * 3 + 1] = 0; // Will be animated
        positions[index * 3 + 2] = posZ;

        // Color interpolation based on position
        const t = (x / numX + z / numZ) / 2;
        const color = new THREE.Color();
        if (t < 0.5) {
          color.lerpColors(colorIndigo, colorPurple, t * 2);
        } else {
          color.lerpColors(colorPurple, colorCyan, (t - 0.5) * 2);
        }

        colors[index * 3] = color.r;
        colors[index * 3 + 1] = color.g;
        colors[index * 3 + 2] = color.b;

        index++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture (soft circle)
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 16;
    canvasTexture.height = 16;
    const ctx = canvasTexture.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);

    const texture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation variables
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update particle heights based on waves & mouse influence
      const positionsAttr = geometry.attributes.position;
      const array = positionsAttr.array;

      let idx = 0;
      for (let x = 0; x < numX; x++) {
        for (let z = 0; z < numZ; z++) {
          const posX = array[idx * 3];
          const posZ = array[idx * 3 + 2];

          // Compute complex wave pattern
          let y = Math.sin(posX * 0.15 + elapsed) * 1.5 + Math.cos(posZ * 0.15 + elapsed) * 1.5;
          y += Math.sin((posX + posZ) * 0.08 + elapsed * 1.5) * 0.8;

          // Mouse dist distortion
          const dx = posX - mouse.x * 20;
          const dz = posZ - mouse.y * 20;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < 15) {
            y += (15 - dist) * 0.35 * (1 + Math.sin(elapsed * 4));
          }

          array[idx * 3 + 1] = y;
          idx++;
        }
      }
      positionsAttr.needsUpdate = true;

      // Animate Camera/Scene perspective based on mouse movement
      particleSystem.rotation.y = elapsed * 0.02 + mouse.x * 0.15;
      particleSystem.rotation.x = mouse.y * 0.1;

      // Subtle lookAt adjust
      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.05;
      camera.position.y += ((15 - mouse.y * 4) - camera.position.y) * 0.05;
      camera.lookAt(0, -2, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
