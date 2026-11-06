"use client";

import React, { useEffect, useRef } from "react";

interface NexoraQuantumCanvasProps {
  modeIndex?: number;
  className?: string;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  isCore?: boolean;
}

/**
 * ENGINE 3D INTERATIVA EM CANVAS — NEXORA QUANTUM CORE
 * Renderiza uma estrutura espacial tridimensional real com projeção de perspectiva,
 * malha sináptica N×X, partículas orbitais e resposta gravitacional ao cursor.
 */
export function NexoraQuantumCanvas({
  modeIndex = 0,
  className = "",
}: NexoraQuantumCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<number>(modeIndex);

  useEffect(() => {
    modeRef.current = modeIndex;
  }, [modeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Build 3D Geometric Lattice Vertices (Outer Icosahedron/Tesseract + Inner N×X Core)
    const vertices: Vec3[] = [];
    const edges: [number, number, boolean][] = [];

    // 1. Inner N×X Architectural Monogram in 3D space (8 key structural vertices)
    const nxScale = 68;
    const nxCoords: [number, number, number][] = [
      [-1, -1.1, 0.35], // 0: Top-Left N
      [-1, 1.1, 0.35],  // 1: Bottom-Left N
      [1, 1.1, 0.35],   // 2: Bottom-Right N
      [1, -1.1, 0.35],  // 3: Top-Right N
      [0, 0, 0],        // 4: Center Nexus
      [-1, -1.1, -0.35], // 5: Back depth Top-Left
      [1, 1.1, -0.35],   // 6: Back depth Bottom-Right
      [1, -1.1, -0.35],  // 7: Back depth Top-Right
      [-1, 1.1, -0.35],  // 8: Back depth Bottom-Left
    ];

    nxCoords.forEach(([x, y, z]) => {
      vertices.push({
        x: x * nxScale,
        y: y * nxScale,
        z: z * nxScale,
        baseX: x * nxScale,
        baseY: y * nxScale,
        baseZ: z * nxScale,
        isCore: true,
      });
    });

    // N×X Core Edges (Highlighted in glowing Cyan/Electric Blue)
    edges.push(
      [0, 1, true], // Left N pillar
      [0, 2, true], // N diagonal
      [2, 3, true], // Right N pillar
      [3, 1, true], // X cross diagonal
      [5, 8, false],
      [7, 6, false],
      [0, 5, false],
      [1, 8, false],
      [2, 6, false],
      [3, 7, false]
    );

    // 2. Outer Architectural Geodesic / Tesseract Shell (24 vertices)
    const shellRadius = 155;
    const rings = 3;
    const segments = 8;
    const startIdx = vertices.length;

    for (let r = 0; r < rings; r++) {
      const phi = ((r + 0.5) / rings) * Math.PI;
      for (let s = 0; s < segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        const x = shellRadius * Math.sin(phi) * Math.cos(theta);
        const y = shellRadius * Math.cos(phi);
        const z = shellRadius * Math.sin(phi) * Math.sin(theta);
        vertices.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          isCore: false,
        });
      }
    }

    // Connect outer shell rings & meridians
    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < segments; s++) {
        const curr = startIdx + r * segments + s;
        const nextInRing = startIdx + r * segments + ((s + 1) % segments);
        edges.push([curr, nextInRing, false]);

        if (r < rings - 1) {
          const nextRing = startIdx + (r + 1) * segments + s;
          edges.push([curr, nextRing, false]);
        }
      }
    }

    // Connect core nodes to outer shell nodes (Synaptic bridges)
    edges.push(
      [0, startIdx + 2, false],
      [1, startIdx + 18, false],
      [2, startIdx + 22, false],
      [3, startIdx + 6, false]
    );

    // 3. Ambient Floating Data Particles
    const particles = Array.from({ length: 48 }, (_, i) => ({
      angle: (i / 48) * Math.PI * 2,
      radius: 90 + (i % 5) * 32,
      yOffset: ((i % 7) - 3) * 35,
      speed: 0.003 + (i % 4) * 0.0015,
      size: i % 3 === 0 ? 2.2 : 1.3,
    }));

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.18;
    let targetRotY = -0.32;
    let currentRotX = 0.18;
    let currentRotY = -0.32;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX = nx;
      mouseY = ny;
      targetRotY = nx * 0.85;
      targetRotX = -ny * 0.55;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const activeMode = modeRef.current;

      // Smooth interpolation of rotation + continuous orbital drift
      currentRotX += (targetRotX + Math.sin(time * 0.5) * 0.12 - currentRotX) * 0.05;
      currentRotY += (targetRotY + time * 0.28 - currentRotY) * 0.05;

      // Morph vertex positions slightly based on selected architectural mode (0..3)
      vertices.forEach((v, idx) => {
        if (v.isCore) return;
        let targetX = v.baseX;
        let targetY = v.baseY;
        let targetZ = v.baseZ;

        if (activeMode === 1) {
          // SaaS Multi-Tenant Cubic Grid expansion
          targetX = Math.sign(v.baseX) * Math.pow(Math.abs(v.baseX), 0.92) * 1.18;
          targetY = Math.sign(v.baseY) * Math.pow(Math.abs(v.baseY), 0.92) * 1.08;
        } else if (activeMode === 2) {
          // Neural AI Wave Oscillation
          const wave = Math.sin(time * 2 + idx * 0.5) * 18;
          targetX = v.baseX + wave;
          targetZ = v.baseZ + Math.cos(time * 2 + idx) * 18;
        } else if (activeMode === 3) {
          // High-Velocity Orbital Torus compression
          targetY = v.baseY * 0.65;
          targetX = v.baseX * 1.15;
          targetZ = v.baseZ * 1.15;
        }

        v.x += (targetX - v.x) * 0.08;
        v.y += (targetY - v.y) * 0.08;
        v.z += (targetZ - v.z) * 0.08;
      });

      // Ambient Radial Backdrop Glow
      const grad = ctx.createRadialGradient(
        cx + mouseX * 40,
        cy + mouseY * 40,
        10,
        cx,
        cy,
        Math.max(width, height) * 0.48
      );
      grad.addColorStop(0, "rgba(0, 229, 255, 0.16)");
      grad.addColorStop(0.45, "rgba(29, 78, 216, 0.08)");
      grad.addColorStop(1, "rgba(5, 8, 17, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Project 3D vertices to 2D screen space
      const fov = 520;
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      const projected = vertices.map((v) => {
        // Rotate around Y
        const x1 = v.x * cosY - v.z * sinY;
        const z1 = v.z * cosY + v.x * sinY;
        // Rotate around X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + v.y * sinX;

        const scale = fov / (fov + z2 + 260);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          z: z2,
          scale,
          isCore: v.isCore,
        };
      });

      // Draw Outer Equatorial Telemetry Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(currentRotX * 0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, 210, 68, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.14)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 7]);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 155, 48, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.18)";
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      // Draw Edges
      edges.forEach(([i, j, isPrimary]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        if (!p1 || !p2) return;

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);

        if (isPrimary) {
          const lineGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
          lineGrad.addColorStop(0, "#F4F7FB");
          lineGrad.addColorStop(0.5, "#00E5FF");
          lineGrad.addColorStop(1, "#2563EB");
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 3.2;
          ctx.shadowColor = "#00E5FF";
          ctx.shadowBlur = 14;
        } else {
          const depthAlpha = Math.max(
            0.08,
            Math.min(0.42, (p1.scale + p2.scale) * 0.25)
          );
          ctx.strokeStyle = `rgba(96, 165, 250, ${depthAlpha})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      });

      ctx.shadowBlur = 0;

      // Draw Vertices Nodes
      projected.forEach((p, idx) => {
        ctx.beginPath();
        const radius = p.isCore ? (idx === 4 ? 6 : 3.8) : 2.2 * p.scale;
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);

        if (idx === 4) {
          // Central Nexus Quantum Node
          ctx.fillStyle = "#050811";
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "#00E5FF";
          ctx.stroke();
        } else if (p.isCore) {
          ctx.fillStyle = idx % 2 === 0 ? "#00E5FF" : "#F4F7FB";
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(0, 229, 255, 0.55)";
          ctx.fill();
        }
      });

      // Draw Orbiting Synaptic Particles
      particles.forEach((pt) => {
        pt.angle += pt.speed;
        const px3d = Math.cos(pt.angle) * pt.radius;
        const pz3d = Math.sin(pt.angle) * pt.radius;
        const py3d = pt.yOffset + Math.sin(time + pt.angle) * 12;

        const x1 = px3d * cosY - pz3d * sinY;
        const z1 = pz3d * cosY + px3d * sinY;
        const y2 = py3d * cosX - z1 * sinX;
        const z2 = z1 * cosX + py3d * sinX;

        const scale = fov / (fov + z2 + 260);
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, pt.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 229, 255, 0.65)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    />
  );
}

