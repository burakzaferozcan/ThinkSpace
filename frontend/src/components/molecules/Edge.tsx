import React from 'react';

interface EdgeProps {
  source: { x: number; y: number; id: string };
  target: { x: number; y: number; id: string };
  onRemoveEdge: (sourceId: string, targetId: string) => void;
}

const Edge: React.FC<EdgeProps> = ({ source, target, onRemoveEdge }) => {
  const angle = Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
  const length = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2));

  const handleRemove = (e: React.MouseEvent ) => {
    e.stopPropagation();
    onRemoveEdge(source.id, target.id);
  };

  return (
    <div
      className="absolute bg-gradient-to-r from-purple-400 to-blue-400 shadow-md opacity-75"
      style={{
        left: source.x,
        top: source.y,
        width: length,
        height: 1.5,
        transformOrigin: '0 0',
        transform: `rotate(${angle}deg)`,
      }}
    >
      <button onClick={handleRemove} className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1">
        Sil
      </button>
    </div>
  );
};

export default Edge;