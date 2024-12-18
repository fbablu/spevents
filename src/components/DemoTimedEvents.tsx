// src/components/DemoTimedEvents.tsx
import { useEffect, useState } from 'react';
import { TimedEventsManager, TimedEvent } from './TimedEvents';

export function DemoTimedEvents() {
  const [isActive, setIsActive] = useState(false);
  const [events, setEvents] = useState<TimedEvent[]>([]);

  useEffect(() => {
    // Create demo events 10 seconds apart
    const now = new Date();
    const demoEvents: TimedEvent[] = [
      {
        id: '1',
        title: 'First Dance',
        description: 'The newlyweds take center stage for their magical first dance as husband and wife.',
        scheduledTime: new Date(now.getTime() + 10000),
        type: 'firstDance'
      },
      {
        id: '2',
        title: 'Dinner Service',
        description: 'A gourmet dining experience is about to begin. Please take your seats.',
        scheduledTime: new Date(now.getTime() + 20000),
        type: 'dinner'
      },
      {
        id: '3',
        title: 'Cake Cutting',
        description: 'Join us for the ceremonial cake cutting and share in this sweet moment!',
        scheduledTime: new Date(now.getTime() + 30000),
        type: 'cake'
      },
    ];

    setEvents(demoEvents);
    setIsActive(true);

    return () => {
      setIsActive(false);
    };
  }, []);

  return <TimedEventsManager events={events} isActive={isActive} />;
}