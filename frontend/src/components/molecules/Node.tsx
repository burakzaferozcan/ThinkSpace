import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { Input } from "@nextui-org/react";

interface NodeProps {
  id: string;
  x: number;
  y: number;
  text: string;
  onClick: () => void;
  onTextChange: (id: string, newText: string) => void;
  onNodeDrag: (id: string, deltaX: number, deltaY: number) => void;
  onRemoveNode: (id: string) => void; // Silme fonksiyonu
}

const Node: React.FC<NodeProps> = ({ id, x, y, text, onClick, onTextChange, onNodeDrag, onRemoveNode }) => {
  const [nodeText, setNodeText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(id, nodeText);
  };

  const handleClick = () => {
    onClick();
    setIsEditing(true);
  };

  const bind = useDrag(({ delta: [deltaX, deltaY] }) => {
    onNodeDrag(id, deltaX, deltaY);
  });

  const handleRemove = (e: React.MouseEvent ) => {
    e.stopPropagation(); // Olayın yukarıya doğru yayılmasını engelle
    onRemoveNode(id);
  };

  return (
    <div
      {...bind()}
      className="absolute flex items-center justify-center rounded-full shadow-xl cursor-pointer transition duration-200 ease-in-out hover:scale-105 bg-gradient-to-br from-blue-600 to-purple-600"
      style={{
        left: x - 50,
        top: y - 50,
        width: 100,
        height: 100,
      }}
      onClick={handleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          type="text"
          size="sm"
          className="text-center text-white font-semibold focus:outline-none bg-transparent"
          value={nodeText}
          onChange={handleTextChange}
          onBlur={handleBlur}
          style={{ color: 'white' }}
        />
      ) : (
        <div className="w-full h-full text-center text-white font-semibold flex items-center justify-center">
          {nodeText}
        </div>
      )}
      <button onClick={handleRemove} className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1">
        Sil
      </button>
    </div>
  );
};

export default Node;