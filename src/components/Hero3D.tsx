import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";

/* ============================================================
 * Floating copper RASA emblem with ambient smoke.
 * Client-only (mounted check). Gracefully no-ops on SSR.
 * Reacts to mouse for subtle camera parallax + dissolves on
 * scroll into the next section.
 * ============================================================ */

function CopperEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Logo as alpha map on a thin copper disc.
  const logoTex = useLoader(THREE.TextureLoader, rasaLogo.url);
  useEffect(() => {
    logoTex.colorSpace = THREE.SRGBColorSpace;
    logoTex.anisotropy = 8;
  }, [logoTex]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      // gentle float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
    }
  });

  // Copper PBR
  const copper = {
    color: new THREE.Color("#c97a4a"),
    metalness: 1,
    roughness: 0.28,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
  };

  return (
    <group ref={groupRef}>
      {/* Outer thin ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.018, 32, 220]} />
        <meshPhysicalMaterial {...copper} />
      </mesh>

      {/* Inner decorative ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.008, 24, 200]} />
        <meshPhysicalMaterial {...copper} roughness={0.4} />
      </mesh>

      {/* Copper medallion disc */}
      <mesh ref={discRef}>
        <cylinderGeometry args={[1.35, 1.35, 0.06, 96]} />
        <meshPhysicalMaterial
          color="#a45a30"
          metalness={1}
          roughness={0.38}
          clearcoat={0.5}
          clearcoatRoughness={0.35}
        />
      </mesh>

      {/* Logo etched as emissive bronze overlay on the disc front */}
      <mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial
          map={logoTex}
          transparent
          alphaTest={0.05}
          metalness={0.9}
          roughness={0.3}
          emissive={new THREE.Color("#3a1a0a")}
          emissiveMap={logoTex}
          emissiveIntensity={0.35}
          color="#d89568"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -0.032, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial
          map={logoTex}
          transparent
          alphaTest={0.05}
          metalness={0.9}
          roughness={0.3}
          emissive={new THREE.Color("#3a1a0a")}
          emissiveMap={logoTex}
          emissiveIntensity={0.35}
          color="#d89568"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ---------- Smoke sprite system ---------- */

function makeSmokeTexture(): THREE.Texture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255, 220, 190, 0.55)");
  g.addColorStop(0.35, "rgba(180, 130, 90, 0.22)");
  g.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Smoke({ count = 22 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [tex] = useState(() => (typeof document !== "undefined" ? makeSmokeTexture() : null));
  const seeds = useRef(
    Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 4,
      z: -2 - Math.random() * 4,
      s: 2.4 + Math.random() * 2.6,
      rot: Math.random() * Math.PI,
      drift: 0.04 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      key: i,
    })),
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const s = seeds.current[i];
      child.position.x = s.x + Math.sin(t * s.drift + s.phase) * 0.6;
      child.position.y = s.y + Math.cos(t * s.drift * 0.8 + s.phase) * 0.4;
      (child as THREE.Mesh).rotation.z = s.rot + t * s.drift * 0.3;
    });
  });

  if (!tex) return null;
  return (
    <group ref={groupRef}>
      {seeds.current.map((s) => (
        <mesh key={s.key} position={[s.x, s.y, s.z]} rotation={[0, 0, s.rot]}>
          <planeGeometry args={[s.s, s.s]} />
          <meshBasicMaterial
            map={tex}
            transparent
            depthWrite={false}
            opacity={0.32}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Camera parallax to mouse ---------- */

function MouseParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.04;
    camera.position.y += (-target.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------- Scene wrapper ---------- */

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Scroll dissolve — fades + scales the canvas as user scrolls through the hero.
  useEffect(() => {
    if (!mounted) return;
    const el = wrapperRef.current;
    if (!el) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vh = window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, window.scrollY / vh));
        el.style.opacity = String(1 - progress * 0.95);
        el.style.transform = `translate3d(0,${progress * -40}px,0) scale(${1 + progress * 0.18})`;
        el.style.filter = `blur(${progress * 6}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-[1] will-change-transform"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffd9b5" />
        <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#7a3a1a" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#ffb37a" />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <CopperEmblem />
        </Suspense>
        <Smoke />
        <MouseParallax />
      </Canvas>
    </div>
  );
}
