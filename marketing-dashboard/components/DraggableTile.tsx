'use client';

import React from 'react';
import { GripVertical, Pin } from 'lucide-react';

interface DraggableTileProps {
  id: string;
  children: React.ReactNode;
  isPinned: boolean;
  onPinToggle: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDragOver: (id: string) => void;
  onDrop: (draggedId: string, targetId: string) => void;
  isDragging: boolean;
  dragOverId: string | null;
  className?: string;
}

export default function DraggableTile({
  id,
  children,
  isPinned,
  onPinToggle,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragging,
  dragOverId,
  className = '',
}: DraggableTileProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    if (isPinned) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id);
    onDragStart(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isPinned) {
      // Don't allow drops on pinned tiles
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(id);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isPinned) {
      // Don't allow drops on pinned tiles
      return;
    }
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/html');
    onDrop(draggedId, id);
  };

  return (
    <div
      draggable={!isPinned}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${
        dragOverId === id && !isPinned
          ? 'ring-2 ring-blue-500 scale-105'
          : ''
      } ${isPinned ? 'cursor-default' : 'cursor-move'} ${className}`}
    >
      {/* Pinned Badge */}
      {isPinned && (
        <div className="absolute top-2 left-2 z-10 bg-purple-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
          <Pin size={12} fill="white" />
          Pinned
        </div>
      )}

      {/* Controls (Grip and Pin Button) */}
      {(isHovered || isPinned) && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {/* Grip Handle (only show if not pinned) */}
          {!isPinned && (
            <div className="bg-white bg-opacity-90 p-1.5 rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
              <GripVertical size={14} className="text-gray-600" />
            </div>
          )}

          {/* Pin Button */}
          <button
            onClick={() => onPinToggle(id)}
            className={`p-1.5 rounded-lg shadow-lg transition-all ${
              isPinned
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-white bg-opacity-90 text-gray-600 hover:text-purple-600 hover:bg-white'
            }`}
            title={isPinned ? 'Unpin tile' : 'Pin tile'}
          >
            <Pin
              size={14}
              fill={isPinned ? 'white' : 'none'}
              className={isPinned ? '' : 'hover:fill-purple-600'}
            />
          </button>
        </div>
      )}

      {/* Tile Content */}
      {children}
    </div>
  );
}
