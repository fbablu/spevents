// src/components/TimedEvents/EventModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FirstDanceAnimation } from './ThreeAnimations/FirstDanceAnimation';
import { DinnerAnimation } from './ThreeAnimations/DinnerAnimation';
import { CakeAnimation } from './ThreeAnimations/CakeAnimation';
// src/components/TimedEvents/EventModal.tsx
// ... imports remain the same ...

interface EventModalProps {
  title: string;
  description: string;
  isVisible: boolean;
  onClose: () => void;
  eventType: 'firstDance' | 'dinner' | 'cake';
}

export function EventModal({ 
  title, 
  description, 
  isVisible, 
  onClose,
  eventType,
}: EventModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal - Exact Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed grid place-items-center inset-0 z-50"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-hunter-green/90 backdrop-blur-md rounded-2xl overflow-hidden"
            >
              {/* Three.js Container */}
              <div className="h-64">
                <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                  
                  {eventType === 'firstDance' && <FirstDanceAnimation />}
                  {eventType === 'dinner' && <DinnerAnimation />}
                  {eventType === 'cake' && <CakeAnimation />}
                </Canvas>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
                <p className="text-timberwolf/90 mb-6">{description}</p>

                {/* Progress bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 10, ease: "linear" }}
                  onAnimationComplete={onClose}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sage to-fern-green origin-left"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}