// src/components/TimedEvents/ThreeAnimations/CakeAnimation.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function CakeAnimation() {
  const cakeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += 0.01;
      const t = state.clock.getElapsedTime();
      cakeRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={cakeRef}>
      {/* Three-tier cake */}
      {[1.2, 0.9, 0.6].map((size, index) => (
        <mesh key={index} position={[0, index * 0.5, 0]}>
          <cylinderGeometry args={[size, size, 0.4, 32]} />
          <meshStandardMaterial 
            color="#FFF5E1" 
            metalness={0.1} 
            roughness={0.8} 
          />
        </mesh>
      ))}

      {/* Cake topper */}
      <group position={[0, 1.5, 0]}>
        <mesh>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* Decorative elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.8,
              0.2,
              Math.sin(angle) * 0.8
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#FF69B4" metalness={0.3} roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}