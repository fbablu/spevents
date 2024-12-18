// src/components/TimedEvents/DemoControls.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, UtensilsCrossed, Cake } from 'lucide-react';
import { EventModal } from './EventModal';

interface DemoEvent {
  id: string;
  title: string;
  description: string;
  type: 'firstDance' | 'dinner' | 'cake';
  icon: typeof Music;
}

const demoEvents: DemoEvent[] = [
  {
    id: '1',
    title: 'First Dance',
    description: 'The newlyweds take center stage for their magical first dance as husband and wife.',
    type: 'firstDance',
    icon: Music
  },
  {
    id: '2',
    title: 'Dinner Service',
    description: 'A gourmet dining experience is about to begin. Please take your seats.',
    type: 'dinner',
    icon: UtensilsCrossed
  },
  {
    id: '3',
    title: 'Cake Cutting',
    description: 'Join us for the ceremonial cake cutting and share in this sweet moment!',
    type: 'cake',
    icon: Cake
  }
];

export function DemoControls() {
  const [selectedEvent, setSelectedEvent] = useState<DemoEvent | null>(null);

  return (
    <>
      {/* Controls Panel */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-col gap-2 p-2">
            {demoEvents.map((event) => (
              <motion.button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-2 rounded-xl 
                  bg-white/10 hover:bg-white/20 transition-colors"
              >
                <event.icon className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm text-white font-medium whitespace-nowrap">
                  {event.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {selectedEvent && (
        <EventModal
          title={selectedEvent.title}
          description={selectedEvent.description}
          eventType={selectedEvent.type}
          isVisible={true}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}