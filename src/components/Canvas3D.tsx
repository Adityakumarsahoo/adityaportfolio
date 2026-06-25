import { useEffect, useRef } from "react";

interface Canvas3DProps {
  isDarkMode: boolean;
}

interface Particle3D {
  x: number;
  y: number;
  z: number; // Depth coordinate
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  speedZ: number;
}

interface Shape3D {
  x: number;
  y: number;
  z: number;
  size: number;
  type: "cube" | "sphere" | "tetrahedron" | "ring";
  color: string;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedRotX: number;
  speedRotY: number;
  speedRotZ: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function Canvas3D({ isDarkMode }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 3D particles with our premium futuristic colors
    const particles: Particle3D[] = [];
    const particleCount = 150;
    
    // Premium sci-fi futuristic colors
    const colors = [
      "rgba(0, 212, 255, ",   // Electric Blue
      "rgba(139, 92, 246, ",  // Neon Purple
      "rgba(34, 211, 238, ",  // Cyan
      "rgba(255, 255, 255, "  // Soft Glass White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 900 + 100, // 100 to 1000 depth
        size: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        speedZ: -(Math.random() * 0.4 + 0.1), // move forward smoothly
      });
    }

    // Initialize larger 3D shapes
    const shapes: Shape3D[] = [];
    const shapeCount = 12;
    const shapeTypes: Array<Shape3D["type"]> = ["cube", "sphere", "tetrahedron", "ring"];

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: (Math.random() - 0.5) * width * 1.3,
        y: (Math.random() - 0.5) * height * 1.3,
        z: Math.random() * 700 + 200,
        size: Math.random() * 35 + 15,
        type: shapeTypes[i % shapeTypes.length],
        color: colors[i % (colors.length - 1)], // skip plain white for key shapes
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedRotX: (Math.random() - 0.5) * 0.01,
        speedRotY: (Math.random() - 0.5) * 0.01,
        speedRotZ: (Math.random() - 0.5) * 0.008,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Camera settings
    const fov = 400; // Field of view / Perspective focal length

    const project3D = (x: number, y: number, z: number) => {
      // Apply slight camera offset based on mouse
      const mouseFactor = 40;
      const camX = x - mouseRef.current.x * mouseFactor * (fov / z);
      const camY = y - mouseRef.current.y * mouseFactor * (fov / z);

      const scale = fov / (fov + z);
      const projX = camX * scale + width / 2;
      const projY = camY * scale + height / 2;
      return { x: projX, y: projY, scale, alpha: Math.max(0, Math.min(1, 1 - z / 900)) };
    };

    // Draw functions for 3D shapes
    const drawCube = (x: number, y: number, size: number, rotX: number, rotY: number, color: string, alpha: number) => {
      // 3D cube vertices
      const d = size / 2;
      const vertices = [
        { x: -d, y: -d, z: -d },
        { x: d, y: -d, z: -d },
        { x: d, y: d, z: -d },
        { x: -d, y: d, z: -d },
        { x: -d, y: -d, z: d },
        { x: d, y: -d, z: d },
        { x: d, y: d, z: d },
        { x: -d, y: d, z: d },
      ];

      // Rotate vertices
      const rotated = vertices.map((v) => {
        // Rot X
        let y1 = v.y * Math.cos(rotX) - v.z * Math.sin(rotX);
        let z1 = v.y * Math.sin(rotX) + v.z * Math.cos(rotX);
        // Rot Y
        let x2 = v.x * Math.cos(rotY) - z1 * Math.sin(rotY);
        let z2 = v.x * Math.sin(rotY) + z1 * Math.cos(rotY);
        return { x: x2, y: y1, z: z2 };
      });

      // Define 6 faces (indices into vertices)
      const faces = [
        [0, 1, 2, 3], // Front
        [1, 5, 6, 2], // Right
        [5, 4, 7, 6], // Back
        [4, 0, 3, 7], // Left
        [4, 5, 1, 0], // Top
        [3, 2, 6, 7], // Bottom
      ];

      // Sort faces by depth (average Z of vertices)
      const facesWithDepth = faces.map((face, index) => {
        const avgZ = face.reduce((sum, idx) => sum + rotated[idx].z, 0) / 4;
        return { face, avgZ, index };
      });
      facesWithDepth.sort((a, b) => b.avgZ - a.avgZ); // back to front

      facesWithDepth.forEach(({ face, index }) => {
        ctx.beginPath();
        face.forEach((idx, i) => {
          // Project to 2D screen
          const scale = fov / (fov + 400 + rotated[idx].z);
          const px = rotated[idx].x * scale + x;
          const py = rotated[idx].y * scale + y;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();

        // Face shading based on index to create 3D realism
        const intensity = 0.5 + (index / 10);
        ctx.fillStyle = `${color}${alpha * 0.15 * intensity})`;
        ctx.fill();

        ctx.strokeStyle = `${color}${alpha * 0.3 * intensity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    };

    const drawRing = (x: number, y: number, size: number, rotX: number, rotY: number, color: string, alpha: number) => {
      ctx.beginPath();
      const points = 32;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        // Inner coordinates on circle
        const rx = Math.cos(angle) * size;
        const ry = Math.sin(angle) * size;
        const rz = 0;

        // Rotate
        let y1 = ry * Math.cos(rotX) - rz * Math.sin(rotX);
        let z1 = ry * Math.sin(rotX) + rz * Math.cos(rotX);
        let x2 = rx * Math.cos(rotY) - z1 * Math.sin(rotY);
        let z2 = rx * Math.sin(rotY) + z1 * Math.cos(rotY);

        const scale = fov / (fov + 400 + z2);
        const px = x2 * scale + x;
        const py = y1 * scale + y;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = `${color}${alpha * 0.45})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    };

    const drawSphere = (x: number, y: number, size: number, color: string, alpha: number) => {
      // Render 3D gradient radial sphere
      const gradient = ctx.createRadialGradient(
        x - size * 0.3,
        y - size * 0.3,
        size * 0.05,
        x,
        y,
        size
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, " + alpha * 0.7 + ")");
      gradient.addColorStop(0.3, color + alpha * 0.4 + ")");
      gradient.addColorStop(1, "rgba(0, 0, 0, " + alpha * 0.05 + ")");

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Subtle atmospheric ring around sphere
      ctx.strokeStyle = `${color}${alpha * 0.25})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const drawTetrahedron = (x: number, y: number, size: number, rotX: number, rotY: number, color: string, alpha: number) => {
      const h = size * Math.sqrt(2 / 3);
      const vertices = [
        { x: 0, y: -h / 2, z: size / Math.sqrt(3) },
        { x: -size / 2, y: h / 2, z: -size / (2 * Math.sqrt(3)) },
        { x: size / 2, y: h / 2, z: -size / (2 * Math.sqrt(3)) },
        { x: 0, y: -h / 2 + h, z: 0 },
      ];

      // Rotate
      const rotated = vertices.map((v) => {
        let y1 = v.y * Math.cos(rotX) - v.z * Math.sin(rotX);
        let z1 = v.y * Math.sin(rotX) + v.z * Math.cos(rotX);
        let x2 = v.x * Math.cos(rotY) - z1 * Math.sin(rotY);
        let z2 = v.x * Math.sin(rotY) + z1 * Math.cos(rotY);
        return { x: x2, y: y1, z: z2 };
      });

      const faces = [
        [0, 1, 2],
        [0, 2, 3],
        [0, 3, 1],
        [1, 3, 2],
      ];

      const facesWithDepth = faces.map((face, index) => {
        const avgZ = face.reduce((sum, idx) => sum + rotated[idx].z, 0) / 3;
        return { face, avgZ, index };
      });
      facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

      facesWithDepth.forEach(({ face, index }) => {
        ctx.beginPath();
        face.forEach((idx, i) => {
          const scale = fov / (fov + 400 + rotated[idx].z);
          const px = rotated[idx].x * scale + x;
          const py = rotated[idx].y * scale + y;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();

        const intensity = 0.6 + (index / 10);
        ctx.fillStyle = `${color}${alpha * 0.18 * intensity})`;
        ctx.fill();

        ctx.strokeStyle = `${color}${alpha * 0.35 * intensity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    };

    const render = () => {
      // Clear with very slight fade for trailing effect if desired, or crisp clear
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Update and Draw Particles
      particles.forEach((p) => {
        // Move towards viewer
        p.z += p.speedZ;
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if behind camera
        if (p.z <= 0) {
          p.z = 800;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        const proj = project3D(p.x, p.y, p.z);
        if (proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${proj.alpha * 0.6})`;
          ctx.fill();

          // Connect nearby particles for a digital constellation grid
          particles.forEach((p2) => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dz = p.z - p2.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 120) {
              const proj2 = project3D(p2.x, p2.y, p2.z);
              ctx.beginPath();
              ctx.moveTo(proj.x, proj.y);
              ctx.lineTo(proj2.x, proj2.y);
              ctx.strokeStyle = `${p.color}${Math.min(proj.alpha, proj2.alpha) * 0.07 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          });
        }
      });

      // Update and Draw 3D Shapes
      shapes.forEach((s) => {
        // Ambient movement
        s.rotX += s.speedRotX;
        s.rotY += s.speedRotY;
        s.rotZ += s.speedRotZ;

        // Slowly move in depth
        s.z -= 0.15;
        if (s.z < 100) {
          s.z = 700;
          s.x = (Math.random() - 0.5) * width * 1.2;
          s.y = (Math.random() - 0.5) * height * 1.2;
        }

        // Pulse size
        const pulse = 1 + Math.sin(Date.now() * s.pulseSpeed + s.pulseOffset) * 0.06;
        const currentSize = s.size * pulse;

        const proj = project3D(s.x, s.y, s.z);

        if (proj.x >= -100 && proj.x <= width + 100 && proj.y >= -100 && proj.y <= height + 100) {
          if (s.type === "cube") {
            drawCube(proj.x, proj.y, currentSize * proj.scale, s.rotX, s.rotY, s.color, proj.alpha);
          } else if (s.type === "ring") {
            drawRing(proj.x, proj.y, currentSize * proj.scale, s.rotX, s.rotY, s.color, proj.alpha);
          } else if (s.type === "sphere") {
            drawSphere(proj.x, proj.y, currentSize * proj.scale, s.color, proj.alpha);
          } else if (s.type === "tetrahedron") {
            drawTetrahedron(proj.x, proj.y, currentSize * proj.scale, s.rotX, s.rotY, s.color, proj.alpha);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block transition-colors duration-700"
      style={{
        background: isDarkMode
          ? "radial-gradient(circle at 50% 50%, #0A0F1F 0%, #050505 100%)"
          : "radial-gradient(circle at 50% 50%, #111827 0%, #030712 100%)",
      }}
    />
  );
}
