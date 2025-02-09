import React from 'react';
import MindMapCanvas from '../organisms/MindMapCanvas';

const MindMapTemplate: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen min-w-screen overflow-hidden relative">
      {/* Yıldız Efekti */}
      <div className="absolute w-full h-full animate-pulse opacity-40">
        <div style={{
          backgroundSize: '100px 100px',
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          height: '100%',
          width: '100%',
        }} />
      </div>

      {/* MindMapCanvas */}
      <MindMapCanvas />
    </div>
  );
};

export default MindMapTemplate;