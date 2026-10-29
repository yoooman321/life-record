import { iconMapping } from '@/config/icons';
import type { CategoryItem } from '@/type';
import { PointerActivationConstraints } from '@dnd-kit/dom';
import { DragDropProvider, PointerSensor } from '@dnd-kit/react';
import { isSortable, useSortable } from '@dnd-kit/react/sortable';
import type React from 'react';
import { Pencil, X } from 'lucide-react';

type SortableCardProps = {
  id: number;
  index: number;
  children: React.ReactNode;
  disabled: boolean;
};
function SortableCard({ id, index, children, disabled }: SortableCardProps) {
  const { ref, isDragging } = useSortable({ id, index, disabled: disabled });
  return (
    <div ref={ref} className={isDragging ? 'opacity-50' : ''}>
      {children}
    </div>
  );
}

type SortableCategoryItemsProps = {
  isEditing: boolean;
  items: CategoryItem[];
  setItems: (initialIndex: number, newIndex: number) => void;
  openCategoryModal: (item: CategoryItem | undefined) => void;
  onDelete: (item: CategoryItem) => void;
};

const sensors = [
  PointerSensor.configure({
    activationConstraints: [
      new PointerActivationConstraints.Delay({
        value: 200,
        tolerance: 5,
      }),
    ],
  }),
];

export default function SortableCategoryItems({
  isEditing,
  items,
  setItems,
  openCategoryModal,
  onDelete,
}: SortableCategoryItemsProps) {
  const itemButtonHandler = isEditing ? onDelete : openCategoryModal;
  return (
    <DragDropProvider
      sensors={sensors}
      onDragEnd={(event) => {
        if (event.canceled) return;
        const { source } = event.operation;
        if (!isSortable(source)) return;
        const { initialIndex, index } = source.sortable;
        setItems(initialIndex, index);
      }}
    >
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, i) => (
          <SortableCard
            key={item.id}
            id={item.id}
            index={i}
            disabled={!isEditing}
          >
            <div className="relative">
              <div
                className={`flex flex-col items-center gap-2 rounded-[14px] border-2 border-line p-3.5 ${isEditing ? 'jiggle' : ''}`}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-lg"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                  }}
                >
                  {iconMapping[item.iconId]}
                </span>
                <span className="text-xs font-semibold">{item.name}</span>
                <button
                  onClick={() => {
                    itemButtonHandler(item);
                  }}
                  type="button"
                  aria-label={isEditing ? '刪除類別' : '編輯類別'}
                  className={`absolute -top-1.5 -right-1 flex  items-center justify-center rounded-full ${isEditing ? 'bg-danger h-6 w-6' : 'bg-panel h-6.5 w-6.5'} shadow-out`}
                >
                  {isEditing ? (
                    <X className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <Pencil className="h-4 w-4 text-ink-soft" />
                  )}
                </button>
              </div>
            </div>
          </SortableCard>
        ))}
      </div>
    </DragDropProvider>
  );
}
