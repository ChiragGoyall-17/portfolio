import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const orbitNodes = [
  { color: 0x38bdf8, radius: 2.35, speed: 0.42, y: 0.2, size: 0.12 },
  { color: 0x6366f1, radius: 2.85, speed: -0.32, y: -0.55, size: 0.16 },
  { color: 0x10b981, radius: 3.15, speed: 0.26, y: 0.68, size: 0.14 },
  { color: 0xf59e0b, radius: 2.55, speed: -0.48, y: -0.05, size: 0.1 }
];

export default function DeveloperScene3D({ accent }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Reference for target colors based on the active project's accent
  const targetColorsRef = useRef({
    coreColor: new THREE.Color(0x67e8f9), // Default Cyan
    keyLightColor: new THREE.Color(0x93c5fd), // Default Blue
    rimLightColor: new THREE.Color(0x22d3ee), // Default Cyan
    wireColor: new THREE.Color(0xa5b4fc), // Default Indigo
    nodeColor1: new THREE.Color(0x38bdf8),
    nodeColor2: new THREE.Color(0x6366f1),
    nodeColor3: new THREE.Color(0x10b981),
    nodeColor4: new THREE.Color(0xf59e0b)
  });

  // Dynamically update target colors when the project profile switches
  useEffect(() => {
    if (accent === 'indigo') {
      targetColorsRef.current = {
        coreColor: new THREE.Color(0x6366f1),      // Indigo
        keyLightColor: new THREE.Color(0xa5b4fc),  // Blue-indigo
        rimLightColor: new THREE.Color(0x818cf8),  // Light indigo
        wireColor: new THREE.Color(0xc084fc),      // Purple
        nodeColor1: new THREE.Color(0x3b82f6),     // Blue
        nodeColor2: new THREE.Color(0x6366f1),     // Indigo
        nodeColor3: new THREE.Color(0x8b5cf6),     // Purple
        nodeColor4: new THREE.Color(0xec4899)      // Pink
      };
    } else if (accent === 'emerald') {
      targetColorsRef.current = {
        coreColor: new THREE.Color(0x10b981),      // Emerald
        keyLightColor: new THREE.Color(0xa7f3d0),  // Mint
        rimLightColor: new THREE.Color(0x059669),  // Deep emerald
        wireColor: new THREE.Color(0x2dd4bf),      // Teal
        nodeColor1: new THREE.Color(0x10b981),     // Emerald
        nodeColor2: new THREE.Color(0x14b8a6),     // Teal
        nodeColor3: new THREE.Color(0x06b6d4),     // Cyan
        nodeColor4: new THREE.Color(0x84cc16)      // Lime
      };
    }
  }, [accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.25, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    const keyLight = new THREE.DirectionalLight(0x93c5fd, 2.1);
    keyLight.position.set(3, 4, 5);
    const rimLight = new THREE.PointLight(0x22d3ee, 12, 12);
    rimLight.position.set(-3, -1, 4);
    scene.add(ambientLight, keyLight, rimLight);

    const root = new THREE.Group();
    scene.add(root);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 2),
      new THREE.MeshStandardMaterial({
        color: 0x67e8f9,
        emissive: 0x0f172a,
        metalness: 0.55,
        roughness: 0.18,
        transparent: true,
        opacity: 0.92
      })
    );
    root.add(core);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({
        color: 0xa5b4fc,
        wireframe: true,
        transparent: true,
        opacity: 0.28
      })
    );
    root.add(coreWire);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.42
    });

    const rings = [
      [1.95, Math.PI / 2.2, 0],
      [2.35, Math.PI / 2, Math.PI / 3],
      [2.75, Math.PI / 2.6, -Math.PI / 5]
    ].map(([radius, x, z]) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 12, 120), ringMaterial.clone());
      ring.rotation.set(x, 0, z);
      root.add(ring);
      return ring;
    });

    rings[1].material.color.set(0x38bdf8);
    rings[2].material.color.set(0x10b981);

    const nodeGeometry = new THREE.SphereGeometry(1, 24, 24);
    const nodes = orbitNodes.map((node, index) => {
      const mesh = new THREE.Mesh(
        nodeGeometry,
        new THREE.MeshStandardMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 0.35,
          metalness: 0.25,
          roughness: 0.28
        })
      );
      mesh.scale.setScalar(node.size);
      mesh.userData = { ...node, phase: index * 1.7 };
      root.add(mesh);
      return mesh;
    });

    const tileGeometry = new THREE.BoxGeometry(0.72, 0.44, 0.04);
    const tileMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      emissive: 0x312e81,
      emissiveIntensity: 0.14,
      metalness: 0.1,
      roughness: 0.45
    });

    const tiles = Array.from({ length: 8 }, (_, index) => {
      const tile = new THREE.Mesh(tileGeometry, tileMaterial.clone());
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(tileGeometry),
        new THREE.LineBasicMaterial({
          color: index % 2 ? 0x38bdf8 : 0x818cf8,
          transparent: true,
          opacity: 0.48
        })
      );
      tile.add(edge);
      tile.userData.phase = (index / 8) * Math.PI * 2;
      root.add(tile);
      return tile;
    });

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 640 ? 8.5 : 7;
      camera.updateProjectionMatrix();
    };

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Lerp colors smoothly towards active project accent colors
      const targetColors = targetColorsRef.current;
      core.material.color.lerp(targetColors.coreColor, 0.04);
      coreWire.material.color.lerp(targetColors.wireColor, 0.04);
      keyLight.color.lerp(targetColors.keyLightColor, 0.04);
      rimLight.color.lerp(targetColors.rimLightColor, 0.04);

      if (nodes[0]) nodes[0].material.color.lerp(targetColors.nodeColor1, 0.04);
      if (nodes[1]) nodes[1].material.color.lerp(targetColors.nodeColor2, 0.04);
      if (nodes[2]) nodes[2].material.color.lerp(targetColors.nodeColor3, 0.04);
      if (nodes[3]) nodes[3].material.color.lerp(targetColors.nodeColor4, 0.04);

      if (rings[0]) rings[0].material.color.lerp(targetColors.nodeColor2, 0.04);
      if (rings[1]) rings[1].material.color.lerp(targetColors.nodeColor1, 0.04);
      if (rings[2]) rings[2].material.color.lerp(targetColors.nodeColor3, 0.04);

      root.rotation.y += (pointer.x * 0.22 - root.rotation.y) * 0.035;
      root.rotation.x += (pointer.y * 0.18 - root.rotation.x) * 0.035;
      core.rotation.x = elapsed * 0.22;
      core.rotation.y = elapsed * 0.34;
      coreWire.rotation.x = -elapsed * 0.18;
      coreWire.rotation.y = elapsed * 0.16;

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0025 + index * 0.0007;
      });

      nodes.forEach((node) => {
        const { radius, speed, y, phase } = node.userData;
        const angle = elapsed * speed + phase;
        node.position.set(Math.cos(angle) * radius, y + Math.sin(angle * 1.7) * 0.12, Math.sin(angle) * radius * 0.42);
      });

      tiles.forEach((tile, index) => {
        const angle = elapsed * 0.18 + tile.userData.phase;
        tile.position.set(Math.cos(angle) * 3.65, Math.sin(angle * 1.25) * 1.05, Math.sin(angle) * 1.2);
        tile.rotation.set(0.2 + Math.sin(elapsed + index) * 0.18, -angle + Math.PI / 2, Math.cos(angle) * 0.16);
      });

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener('pointermove', handlePointerMove);

    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      scene.traverse((object) => {
        if (!object.isMesh && !object.isLineSegments) return;
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[340px] sm:h-[420px] lg:h-[500px] w-full overflow-hidden"
      aria-label="Interactive 3D developer system"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute left-0 top-8 hidden sm:block text-left">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">Interactive Stack</div>
        <div className="mt-2 text-sm text-slate-400 max-w-52 leading-relaxed">
          React interfaces, API logic, and databases moving as one build system.
        </div>
      </div>
      <div className="absolute right-0 bottom-12 hidden md:grid grid-cols-2 gap-3 text-xs text-slate-400">
        {['React', 'Node', 'SQL', 'AI APIs'].map((label) => (
          <span key={label} className="border border-slate-800 bg-slate-950/55 px-3 py-2 font-semibold text-slate-300 backdrop-blur">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
