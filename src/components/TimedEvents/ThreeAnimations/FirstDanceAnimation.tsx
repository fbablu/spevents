// src/components/TimedEvents/ThreeAnimations/FirstDanceAnimation.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';

export function FirstDanceAnimation() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dancing couple representation */}
      <group position={[0, 0, 0]}>
        {/* Person 1 */}
        <Sphere args={[0.3, 32, 32]} position={[-0.4, 1, 0]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.2} />
        </Sphere>
        <mesh position={[-0.4, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 1]} />
          <meshStandardMaterial color="#FFD700" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Person 2 */}
        <Sphere args={[0.3, 32, 32]} position={[0.4, 1, 0]}>
          <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.2} />
        </Sphere>
        <mesh position={[0.4, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 1]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Dance floor ring */}
        <Torus args={[1.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </Torus>
      </group>
    </group>
  );
}