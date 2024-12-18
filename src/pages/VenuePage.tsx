// src/pages/VenuePage.tsx
import { Scene } from '../components';
import { DemoControls } from '../components/TimedEvents/DemoControls';

export default function VenuePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-hunter-green to-brunswick-green">
      {/* Scene Container */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* Overlay Elements */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-end pb-8">
        <DemoControls />
        <div className="text-white/70 text-sm bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm mt-4">
          Hover over photos to see details • Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  );
}