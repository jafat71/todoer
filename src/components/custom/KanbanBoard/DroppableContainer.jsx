import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DroppableContainer = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-2 h-full rounded-md overflow-y-auto ${isOver ? 'bg-f2green' : ''}`}
    >
      {children}
    </div>
  );
};
