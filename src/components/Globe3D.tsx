import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ── Lat/Lng to 3D coords on sphere ── */
function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* Country markers: Canada (UW), Kosovo, Mali, Palestine */
const LOCATIONS = [
  { name: "UWaterloo", lat: 43.4723, lng: -80.5449, color: "#60a5fa" },
  { name: "Kosovo", lat: 42.6026, lng: 20.903, color: "#f472b6" },
  { name: "Mali", lat: 17.5707, lng: -3.9962, color: "#fbbf24" },
  { name: "Palestine", lat: 31.9522, lng: 35.2332, color: "#34d399" },
];

const GLOBE_RADIUS = 1.8;

/* ── Globe wireframe sphere ── */
function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial color="#1d4ed8" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* ── Glowing dots on country positions ── */
function LocationMarkers() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {LOCATIONS.map((loc) => {
        const pos = latLngToVec3(loc.lat, loc.lng, GLOBE_RADIUS + 0.02);
        return (
          <group key={loc.name} position={pos}>
            {/* Inner dot */}
            <mesh>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color={loc.color} />
            </mesh>
            {/* Outer glow */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={loc.color} transparent opacity={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ── Arcs from UW to each country ── */
function ConnectionArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const arcLines = useMemo(() => {
    const uw = LOCATIONS[0];
    const from = latLngToVec3(uw.lat, uw.lng, GLOBE_RADIUS);

    return LOCATIONS.slice(1).map((loc) => {
      const to = latLngToVec3(loc.lat, loc.lng, GLOBE_RADIUS);
      const mid = from
        .clone()
        .add(to)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(GLOBE_RADIUS * 1.45);

      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: loc.color,
        transparent: true,
        opacity: 0.5,
      });
      const line = new THREE.Line(geometry, material);
      return line;
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {arcLines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

/* ── Floating particles ── */
function Particles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = GLOBE_RADIUS + 0.3 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#93c5fd"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Pulse rings at UW location ── */
function PulseRing() {
  const ref = useRef<THREE.Mesh>(null);
  const uwPos = latLngToVec3(
    LOCATIONS[0].lat,
    LOCATIONS[0].lng,
    GLOBE_RADIUS + 0.025,
  );
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.getElapsedTime() % 2) / 2;
      const scale = 1 + t * 3;
      ref.current.scale.set(scale, scale, scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - t);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.08 * (1 / 60);
    }
  });

  return (
    <group ref={groupRef}>
      <group position={uwPos}>
        <mesh
          ref={ref}
          rotation={[Math.PI / 2 - (LOCATIONS[0].lat * Math.PI) / 180, 0, 0]}
        >
          <ringGeometry args={[0.04, 0.06, 32]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Mouse-responsive camera ── */
function CameraRig() {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    canvas.addEventListener("pointermove", onMove);
    return () => canvas.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame(() => {
    const targetX = mouse.current.x * 0.3;
    const targetY = -mouse.current.y * 0.3;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY + 1 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Main exported component ── */
export default function Globe3D() {
  return (
    <div className="globe-3d-container">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        dpr={[1, 2]}
        style={{ pointerEvents: "auto" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />

        <GlobeWireframe />
        <LocationMarkers />
        <ConnectionArcs />
        <Particles count={250} />
        <PulseRing />
        <CameraRig />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  );
}
