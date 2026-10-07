import { useRef, useState } from 'react';

const REVEAL_WIDTH = 80;

type SwipeableRowProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  onClick?: () => void;
  deleteLabel?: string;
};

export default function SwipeableRow({
  children,
  isOpen,
  onOpenChange,
  onDelete,
  onClick,
  deleteLabel = '刪除',
}: SwipeableRowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const startOffsetRef = useRef(0);
  const startXRef = useRef(0);
  const restingOffset = isOpen ? -REVEAL_WIDTH : 0;
  const offset = isDragging ? translateX : restingOffset;

  return (
    <div className="relative overflow-hidden rounded-[14px]">
      <button
        type="button"
        onClick={() => {
          onDelete();
          onOpenChange(false);
        }}
        style={{ width: REVEAL_WIDTH }}
        className="absolute inset-y-0 right-0 flex items-center justify-center bg-accent-food text-xs font-bold text-white"
      >
        {deleteLabel}
      </button>

      <div
        style={{
          transform: `translateX(${offset}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease',
        }}
        className="relative bg-panel"
        onPointerDown={(e) => {
          startXRef.current = e.clientX;
          startOffsetRef.current = restingOffset;
          setIsDragging(true);
        }}
        onPointerMove={(e) => {
          if (isDragging) {
            const delta = e.clientX - startXRef.current;
            const next = startOffsetRef.current + delta;
            const clamped = Math.min(0, Math.max(-REVEAL_WIDTH, next));

            setTranslateX(clamped);
          }
        }}
        onPointerUp={(e) => {
          const delta = e.clientX - startXRef.current;
          setIsDragging(false);

          if (Math.abs(delta) < 5) {
            onClick?.();
            return;
          }

          if (translateX <= -REVEAL_WIDTH / 2) {
            onOpenChange(true);
          } else {
            onOpenChange(false);
            setTranslateX(0);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
