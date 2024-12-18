// src/components/TimedEvents/TimedEventsManager.tsx
import { useState, useEffect } from 'react';
import { EventModal } from './EventModal';

export interface TimedEvent {
  id: string;
  title: string;
  description: string;
  scheduledTime: Date;
  type: 'firstDance' | 'dinner' | 'cake';
}

interface TimedEventsManagerProps {
  events: TimedEvent[];
  isActive: boolean;
}

export function TimedEventsManager({ events, isActive }: TimedEventsManagerProps) {
  const [currentEvent, setCurrentEvent] = useState<TimedEvent | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!isActive || events.length === 0) return;

    const timeouts: NodeJS.Timeout[] = [];

    events.forEach((event) => {
      const now = new Date();
      const delay = event.scheduledTime.getTime() - now.getTime();

      if (delay > 0) {
        const timeout = setTimeout(() => {
          setCurrentEvent(event);
          setIsModalVisible(true);
        }, delay);
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [events, isActive]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setCurrentEvent(null), 300);
  };

  if (!currentEvent) return null;

  return (
    <EventModal
      title={currentEvent.title}
      description={currentEvent.description}
      eventType={currentEvent.type}
      isVisible={isModalVisible}
      onClose={handleCloseModal}
    />
  );
}