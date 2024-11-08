import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DroppableContainer = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-2 h-56 rounded-md overflow-y-scroll ${isOver ? 'bg-blue-100' : ''}`}
    >
      {children}
    </div>
  );
};
