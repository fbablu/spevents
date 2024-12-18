// src/components/TimedEvents/TimedEventNotification.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

interface TimedEventNotificationProps {
  title: string;
  description: string;
  isVisible: boolean;
  onClose: () => void;
}

export function TimedEventNotification({ 
  title, 
  description, 
  isVisible, 
  onClose 
}: TimedEventNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-2xl overflow-hidden z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="p-2 bg-fern-green/10 rounded-full">
                  <Bell className="w-6 h-6 text-fern-green" />
                </div>
              </div>
              <div className="ml-4 w-full">
                <p className="text-sm font-medium text-brunswick-green">
                  {title}
                </p>
                <p className="mt-1 text-sm text-sage">
                  {description}
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              onAnimationComplete={onClose}
              className="absolute bottom-0 left-0 right-0 h-1 bg-fern-green origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
