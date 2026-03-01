import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ChevronUp, ChevronDown, X, Edit, GripVertical } from 'lucide-react';
import type { Identifier, XYCoord } from 'dnd-core';

interface Section {
  id: string;
  name: string;
  category: string;
  component: string;
}

interface DraggableSectionCardProps {
  section: Section;
  index: number;
  hasCustomization: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onEdit: () => void;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  isLast: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ITEM_TYPE = 'section-card';

export function DraggableSectionCard({
  section,
  index,
  hasCustomization,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEdit,
  onDragEnd,
  isLast,
}: DraggableSectionCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onDragEnd(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: section.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      className={`bg-white rounded-lg border-2 transition-all ${
        isDragging ? 'border-[#E8D5B5] shadow-lg' : 'border-gray-300 hover:border-[#E8D5B5]'
      }`}
    >
      <div className="p-3 border-b border-gray-200 flex items-center gap-2">
        <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-[#2C3E50] transition-colors flex-shrink-0">
          <GripVertical className="w-5 h-5" />
        </div>
        <span className="text-sm font-semibold truncate flex-1">{section.name}</span>
        {hasCustomization && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#E8D5B5]/30 text-[#2C3E50] flex-shrink-0">
            Edited ✏️
          </span>
        )}
      </div>
      <div className="p-2 flex items-center gap-2">
        <div className="flex items-center gap-1 flex-1">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 hover:bg-red-100 text-red-600 rounded transition-colors"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onEdit}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-sm transition-colors ${
            hasCustomization
              ? 'bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50]'
              : 'bg-[#E8D5B5]/30 hover:bg-[#E8D5B5]/40 text-[#2C3E50]'
          }`}
          title="Edit this section"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}