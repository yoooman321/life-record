// TODO：目前只有結構骨架，拖曳的核心邏輯還沒寫。留給你練習的部分：
// - onPointerDown：記下起點（用 ref 存，不要用 state，拖曳中不需要為了存起點觸發 re-render）
// - onPointerMove：算出即時位移，夾在 [-REVEAL_WIDTH, 0] 之間，更新畫面（這段需要 state，因為要畫出來）
// - onPointerUp：
//   - 總位移很小（例如 < 5px）→ 當成點擊，呼叫 onClick，不要開/關
//   - 位移超過 REVEAL_WIDTH 一半 → 呼叫 onOpenChange(true)（吸附全開）
//   - 沒超過 → 呼叫 onOpenChange(false)（彈回關閉）
// - 拖曳中（isDragging）要拿掉 transition，放開的瞬間才要有動畫效果，不然會延遲跟不上手指
// - 目前 isOpen 只決定「靜止時」該停在開還是關，拖曳中即時的位移還沒接上

import { useState } from 'react';

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
  // TODO：拖曳中即時的位移，現在只是先放個 state 佔位，onPointerMove 要更新它
  const [isDragging, setIsDragging] = useState(false);

  const offset = isOpen ? -REVEAL_WIDTH : 0;

  return (
    <div className="relative overflow-hidden rounded-[14px]">
      {/* 下層：刪除按鈕，固定貼右邊，平常被上層蓋住 */}
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

      {/* 上層：實際內容，會被拖曳；bg-panel 要跟外層列表背景一致，平常才蓋得住下層 */}
      <div
        style={{
          transform: `translateX(${offset}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease',
        }}
        className="relative bg-panel"
        onPointerDown={() => {
          setIsDragging(true);
        }}
        onPointerMove={() => {
          // TODO：算位移、夾範圍、更新即時位移的 state
        }}
        onPointerUp={() => {
          setIsDragging(false);
          // TODO：依總位移判斷是點擊還是拖曳，呼叫 onClick 或 onOpenChange
        }}
      >
        {children}
      </div>
    </div>
  );
}
