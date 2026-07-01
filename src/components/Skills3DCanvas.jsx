import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Skills3DCanvas({ skillsData, activeIdx, setActiveIdx }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const activeIdxRef = useRef(activeIdx);

  // Keep ref updated to avoid re-running effect on every activeIdx change
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- 1. Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.02);

    // --- 2. Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 22);

    // --- 3. Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.8); // Indigo glow light
    dirLight2.position.set(-5, -10, -7);
    scene.add(dirLight2);

    // --- 5. Data & Positions Setup ---
    const nodePositions = [
      new THREE.Vector3(0, 7, -3),      // Languages
      new THREE.Vector3(6.5, 3.5, 3.5),  // Frontend
      new THREE.Vector3(-6.5, 3.5, 3.5), // Backend & Security
      new THREE.Vector3(-6.5, -3.5, -3.5),// Databases
      new THREE.Vector3(6.5, -3.5, -3.5), // Tools & Cloud
      new THREE.Vector3(0, -7, 3),      // AI & ML Integrations
      new THREE.Vector3(0, 0, 7),       // Core CS Subjects
    ];

    // --- Helper to Create High Quality Sprites for labels ---
    const createTextTexture = (text, colorHex, isHighlighted) => {
      const canvasTex = document.createElement('canvas');
      canvasTex.width = 512;
      canvasTex.height = 128;
      const ctx = canvasTex.getContext('2d');

      ctx.clearRect(0, 0, 512, 128);

      // Card Background with smooth rounded borders
      ctx.fillStyle = isHighlighted ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = colorHex;
      ctx.lineWidth = isHighlighted ? 6 : 3;

      const x = 16, y = 16, w = 480, h = 96, r = 24;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Apply subtle shadow/glow text
      ctx.shadowColor = colorHex;
      ctx.shadowBlur = isHighlighted ? 12 : 4;
      ctx.font = 'bold 34px "Outfit", "Inter", "Segoe UI", sans-serif';
      ctx.fillStyle = isHighlighted ? '#ffffff' : '#e2e8f0';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 64);

      const texture = new THREE.CanvasTexture(canvasTex);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const createSubSkillTexture = (text, colorHex) => {
      const canvasTex = document.createElement('canvas');
      canvasTex.width = 384;
      canvasTex.height = 96;
      const ctx = canvasTex.getContext('2d');

      ctx.clearRect(0, 0, 384, 96);

      // Capsule outline for sub skills
      ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
      ctx.strokeStyle = colorHex + 'dd';
      ctx.lineWidth = 3.5;

      const x = 8, y = 8, w = 368, h = 80, r = 40;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = colorHex;
      ctx.shadowBlur = 4;
      ctx.font = 'bold 28px "Outfit", "Inter", "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 192, 48);

      const texture = new THREE.CanvasTexture(canvasTex);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    // --- 6. Group Setup ---
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // --- 7. Rotating Tech Orbit Grid Lines ---
    const gridGroup = new THREE.Group();
    constellationGroup.add(gridGroup);

    const orbitColors = [0x3b82f6, 0x8b5cf6, 0xec4899];
    const ringRadii = [8, 12, 16];
    const ringMaterials = ringRadii.map((radius, idx) => {
      const mat = new THREE.LineBasicMaterial({
        color: orbitColors[idx % orbitColors.length],
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending
      });
      
      const geom = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      geom.setFromPoints(points);
      const ring = new THREE.Line(geom, mat);
      
      // Random tilt
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      gridGroup.add(ring);
      return ring;
    });

    // --- 8. Background Particle Field ---
    const particlesCount = 180;
    const positions = new Float32Array(particlesCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particlesCount; i++) {
      // Distributed inside a sphere of radius 25
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 18; // Distribute outside core

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });

    const starfield = new THREE.Points(particlesGeometry, particlesMaterial);
    constellationGroup.add(starfield);

    // --- 9. Build Category Nodes ---
    const categoryNodes = [];
    const labelSprites = [];

    // Pre-cache textures to avoid memory leakage
    const normalTextures = skillsData.map(item => createTextTexture(item.category, item.glowColor, false));
    const activeTextures = skillsData.map(item => createTextTexture(item.category, item.glowColor, true));

    skillsData.forEach((item, idx) => {
      const pos = nodePositions[idx];

      // Central core mesh sphere
      const sphereGeom = new THREE.SphereGeometry(0.35, 16, 16);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: item.glowColor,
        emissive: item.glowColor,
        emissiveIntensity: 0.6,
        shininess: 30
      });
      const mesh = new THREE.Mesh(sphereGeom, sphereMat);
      mesh.position.copy(pos);
      mesh.userData = { index: idx };
      constellationGroup.add(mesh);
      categoryNodes.push(mesh);

      // Label sprite positioned slightly above the sphere
      const spriteMat = new THREE.SpriteMaterial({
        map: idx === activeIdxRef.current ? activeTextures[idx] : normalTextures[idx],
        transparent: true,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.copy(pos).add(new THREE.Vector3(0, 1.2, 0));
      sprite.scale.set(4, 1.0, 1);
      constellationGroup.add(sprite);
      labelSprites.push(sprite);
    });

    // --- 10. Sub-Skills Orbit System ---
    let subSkillGroup = new THREE.Group();
    constellationGroup.add(subSkillGroup);

    let activeSubSkillNodes = [];
    let activeConnectionLines = [];

    const spawnSubSkills = (catIdx) => {
      // Clear previous sub skills
      activeSubSkillNodes.forEach(node => {
        if (node.sprite.material.map) node.sprite.material.map.dispose();
        node.sprite.material.dispose();
        subSkillGroup.remove(node.sprite);
      });
      activeSubSkillNodes = [];

      activeConnectionLines.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
        subSkillGroup.remove(line);
      });
      activeConnectionLines = [];

      const currentCategory = skillsData[catIdx];
      const categoryPos = nodePositions[catIdx];
      const count = currentCategory.skills.length;

      // Orbit configuration
      const orbitRadius = 4.2;

      currentCategory.skills.forEach((skill, i) => {
        // Distribute sub-skills in a tilted circle around the parent node
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        const localOffset = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi)
        ).multiplyScalar(orbitRadius);

        const targetPos = categoryPos.clone().add(localOffset);

        // Sub skill pill label sprite
        const texture = createSubSkillTexture(skill.name, currentCategory.glowColor);
        const spriteMat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0, // Animate fade in
          depthWrite: false
        });
        const sprite = new THREE.Sprite(spriteMat);
        
        // Spawn from the center parent node
        sprite.position.copy(categoryPos);
        sprite.scale.set(0.01, 0.01, 1); // Animate scale
        subSkillGroup.add(sprite);

        // Connection line
        const lineGeo = new THREE.BufferGeometry().setFromPoints([categoryPos, categoryPos]);
        const lineMat = new THREE.LineBasicMaterial({
          color: currentCategory.glowColor,
          transparent: true,
          opacity: 0,
          linewidth: 1.5,
          blending: THREE.AdditiveBlending
        });
        const line = new THREE.Line(lineGeo, lineMat);
        subSkillGroup.add(line);
        activeConnectionLines.push(line);

        activeSubSkillNodes.push({
          sprite,
          targetPos,
          targetScale: { x: 2.6, y: 0.65 },
          wobbleOffset: Math.random() * Math.PI * 2
        });
      });
    };

    // Initial spawn
    spawnSubSkills(activeIdxRef.current);

    // --- 11. Camera Smooth Lerping Logic ---
    const cameraTargetPos = new THREE.Vector3(0, 0, 22);
    const cameraLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    const updateCameraFocus = (catIdx) => {
      const activePos = nodePositions[catIdx];
      // Target camera should move slightly towards the active node, but keep distance
      cameraTargetPos.copy(activePos).multiplyScalar(0.4);
      cameraTargetPos.z = 21; // maintain depth distance

      // Lerp target lookAt towards a point close to the active node
      targetLookAt.copy(activePos).multiplyScalar(0.55);

      // Update node text textures
      labelSprites.forEach((sprite, idx) => {
        sprite.material.map = idx === catIdx ? activeTextures[idx] : normalTextures[idx];
      });
    };

    updateCameraFocus(activeIdxRef.current);

    // --- 12. Interaction (Mouse & Drag) Logic ---
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredNodeIdx = null;

    const drag = {
      isDragging: false,
      prevX: 0,
      prevY: 0,
      targetRotY: 0,
      targetRotX: 0,
      currRotY: 0,
      currRotX: 0,
      dragMoved: false
    };

    const handlePointerDown = (e) => {
      drag.isDragging = true;
      drag.prevX = e.clientX;
      drag.prevY = e.clientY;
      drag.dragMoved = false;
    };

    const handlePointerMove = (e) => {
      // Calculate normalized mouse coords for Raycasting
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (drag.isDragging) {
        const deltaX = e.clientX - drag.prevX;
        const deltaY = e.clientY - drag.prevY;
        
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          drag.dragMoved = true;
        }

        drag.targetRotY += deltaX * 0.0055;
        drag.targetRotX += deltaY * 0.0055;

        drag.prevX = e.clientX;
        drag.prevY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      drag.isDragging = false;
      
      // If pointer down and pointer up happened with minimal movement, it's a click!
      if (!drag.dragMoved) {
        raycaster.setFromCamera(mouse, camera);
        
        // Raycast against category sphere meshes (transformed by constellation group)
        const intersects = raycaster.intersectObjects(categoryNodes);
        
        if (intersects.length > 0) {
          const clickedIdx = intersects[0].object.userData.index;
          if (clickedIdx !== activeIdxRef.current) {
            setActiveIdx(clickedIdx);
            spawnSubSkills(clickedIdx);
            updateCameraFocus(clickedIdx);
          }
        }
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- 13. Window Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- 14. Animation Loop ---
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Standard ambient rotation when not dragging
      if (!drag.isDragging) {
        drag.targetRotY += 0.0016;
        // Slowly oscillate rotation X to bring 3D depth to life
        drag.targetRotX = Math.sin(elapsed * 0.25) * 0.12;
      }

      // Constrain tilt rotation on X
      drag.targetRotX = Math.max(-0.45, Math.min(0.45, drag.targetRotX));

      // Interpolate rotation with smooth easing damping
      drag.currRotY += (drag.targetRotY - drag.currRotY) * 0.075;
      drag.currRotX += (drag.targetRotX - drag.currRotX) * 0.075;

      constellationGroup.rotation.y = drag.currRotY;
      constellationGroup.rotation.x = drag.currRotX;

      // Animate background starfield particle drift
      const positionsArr = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const speed = particleSpeeds[i];
        // Bob particles up and down
        positionsArr[i * 3 + 1] += Math.sin(elapsed * 0.5 + speed.phase) * 0.002;
        // Slowly float around
        positionsArr[i * 3] += speed.x * 0.1;
        positionsArr[i * 3 + 2] += speed.z * 0.1;

        // Re-center if drift goes too far
        const distSq = positionsArr[i * 3] ** 2 + positionsArr[i * 3 + 1] ** 2 + positionsArr[i * 3 + 2] ** 2;
        if (distSq > 30 * 30) {
          positionsArr[i * 3] = (Math.random() - 0.5) * 15;
          positionsArr[i * 3 + 1] = (Math.random() - 0.5) * 15;
          positionsArr[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Rotate decorative orbit lines
      gridGroup.children.forEach((ring, idx) => {
        ring.rotation.z += 0.002 * (idx % 2 === 0 ? 1 : -1);
      });

      // Raycaster check for Hover Highlights
      if (!drag.isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(categoryNodes);
        
        if (intersects.length > 0) {
          const hitIdx = intersects[0].object.userData.index;
          container.style.cursor = 'pointer';

          if (hoveredNodeIdx !== hitIdx) {
            hoveredNodeIdx = hitIdx;
          }

          // Scale up hovered node and its label
          categoryNodes[hitIdx].scale.setScalar(THREE.MathUtils.lerp(categoryNodes[hitIdx].scale.x, 1.4, 0.12));
          labelSprites[hitIdx].scale.set(
            THREE.MathUtils.lerp(labelSprites[hitIdx].scale.x, 4.6, 0.12),
            THREE.MathUtils.lerp(labelSprites[hitIdx].scale.y, 1.15, 0.12),
            1
          );
        } else {
          container.style.cursor = 'default';
          hoveredNodeIdx = null;
        }
      }

      // Slowly reset scales of non-hovered nodes
      categoryNodes.forEach((mesh, idx) => {
        if (idx !== hoveredNodeIdx && idx !== activeIdxRef.current) {
          mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, 1.0, 0.1));
          labelSprites[idx].scale.set(
            THREE.MathUtils.lerp(labelSprites[idx].scale.x, 4.0, 0.1),
            THREE.MathUtils.lerp(labelSprites[idx].scale.y, 1.0, 0.1),
            1
          );
        } else if (idx === activeIdxRef.current && idx !== hoveredNodeIdx) {
          // Highlight active index slightly, even if not hovered
          mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, 1.25, 0.1));
          labelSprites[idx].scale.set(
            THREE.MathUtils.lerp(labelSprites[idx].scale.x, 4.3, 0.1),
            THREE.MathUtils.lerp(labelSprites[idx].scale.y, 1.08, 0.1),
            1
          );
        }
      });

      // Animate Sub-skill nodes (blossoming outward and bobbing)
      const activeCategoryPos = nodePositions[activeIdxRef.current];
      activeSubSkillNodes.forEach((node, idx) => {
        const sprite = node.sprite;
        
        // Dynamic floating bobbing offset
        const bob = Math.sin(elapsed * 1.5 + node.wobbleOffset) * 0.15;
        const actualTarget = node.targetPos.clone();
        actualTarget.y += bob;

        // Smooth position lerping
        sprite.position.lerp(actualTarget, 0.08);

        // Smooth scale lerping
        sprite.scale.x = THREE.MathUtils.lerp(sprite.scale.x, node.targetScale.x, 0.08);
        sprite.scale.y = THREE.MathUtils.lerp(sprite.scale.y, node.targetScale.y, 0.08);

        // Smooth opacity fade in
        sprite.material.opacity = THREE.MathUtils.lerp(sprite.material.opacity, 0.95, 0.08);

        // Update connection lines
        const line = activeConnectionLines[idx];
        if (line) {
          const linePositions = line.geometry.attributes.position.array;
          
          // Start of line (Category Node)
          linePositions[0] = activeCategoryPos.x;
          linePositions[1] = activeCategoryPos.y;
          linePositions[2] = activeCategoryPos.z;

          // End of line (Sub-skill Node)
          linePositions[3] = sprite.position.x;
          linePositions[4] = sprite.position.y;
          linePositions[5] = sprite.position.z;

          line.geometry.attributes.position.needsUpdate = true;
          // Fade line in sync with node
          line.material.opacity = THREE.MathUtils.lerp(line.material.opacity, 0.35, 0.08);
        }
      });

      // Sync React changes smoothly
      if (activeIdxRef.current !== null) {
        updateCameraFocus(activeIdxRef.current);
      }

      // Camera position interpolation
      camera.position.lerp(cameraTargetPos, 0.045);
      
      // Camera lookAt interpolation
      cameraLookAt.lerp(targetLookAt, 0.045);
      camera.lookAt(cameraLookAt);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // React prop updates watcher to sync state changes back to 3D
    const intervalId = setInterval(() => {
      // Periodic check if prop is out of sync with 3D Focus
      // Ensures clicking tabs on the right initiates 3D transition
      const activePos = nodePositions[activeIdxRef.current];
      const targetFocusCam = activePos.clone().multiplyScalar(0.4);
      targetFocusCam.z = 21;
      
      if (cameraTargetPos.distanceTo(targetFocusCam) > 0.5) {
        spawnSubSkills(activeIdxRef.current);
        updateCameraFocus(activeIdxRef.current);
      }
    }, 150);

    // --- 15. Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);

      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      resizeObserver.disconnect();

      // Dispose resources
      normalTextures.forEach(t => t.dispose());
      activeTextures.forEach(t => t.dispose());
      
      categoryNodes.forEach(node => {
        node.geometry.dispose();
        node.material.dispose();
      });

      labelSprites.forEach(sprite => {
        sprite.material.dispose();
      });

      activeSubSkillNodes.forEach(node => {
        if (node.sprite.material.map) node.sprite.material.map.dispose();
        node.sprite.material.dispose();
      });

      activeConnectionLines.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
      });

      ringMaterials.forEach(ring => {
        ring.geometry.dispose();
        ring.material.dispose();
      });

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
