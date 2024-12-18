// src/components/TimedEvents/ThreeAnimations/DinnerAnimation.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

export function DinnerAnimation() {
  const plateRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (plateRef.current) {
      plateRef.current.rotation.y += 0.01;
      const t = state.clock.getElapsedTime();
      plateRef.current.position.y = Math.sin(t * 0.5) * 0.1 + 0.5;
    }
  });

  return (
    <group ref={plateRef}>
      {/* Plate */}
      <group position={[0, 0.5, 0]}>
        <Sphere args={[1, 32, 32]} scale={[1, 0.1, 1]}>
          <meshStandardMaterial color="#FFFFFF" metalness={0.3} roughness={0.2} />
        </Sphere>
        
        {/* Food items */}
        <Box args={[0.3, 0.2, 0.3]} position={[-0.3, 0.2, 0]}>
          <meshStandardMaterial color="#8B4513" metalness={0.2} roughness={0.8} />
        </Box>
        
        <Sphere args={[0.15, 16, 16]} position={[0.3, 0.2, 0]}>
          <meshStandardMaterial color="#228B22" metalness={0.1} roughness={0.9} />
        </Sphere>
        
        {/* Utensils */}
        <Box args={[0.1, 0.02, 0.6]} position={[0.8, 0, 0]} rotation={[0, 0.3, 0]}>
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </Box>
        <Box args={[0.1, 0.02, 0.6]} position={[-0.8, 0, 0]} rotation={[0, -0.3, 0]}>
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </Box>
      </group>
    </group>
  );
}