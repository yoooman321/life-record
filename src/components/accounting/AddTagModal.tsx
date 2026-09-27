import { useCreateTag } from '@/hooks';
import { useState } from 'react';

const COLORS = [
  '#e2574c',
  '#f09a37',
  '#f2b53d',
  '#4f9d8a',
  '#5c86c9',
  '#a55eea',
];

type AddTagModalProps = {
  onClose: () => void;
};

export default function AddTagModal({ onClose }: AddTagModalProps) {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState(COLORS[0]);
  const [useCustomColor, setUseCustomColor] = useState(false);
  const onColorChange = ({
    color,
    isCustom,
  }: {
    color: string;
    isCustom: boolean;
  }) => {
    setUseCustomColor(isCustom);
    setTagColor(color);
  };
  const { mutate, isPending } = useCreateTag();
  const handleAddTag = () => {
    mutate(
      {
        name: tagName,
        color: tagColor,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div
        role="dialog"
        aria-label="新增標籤"
        className="relative w-full max-w-100 rounded-[20px] border border-line bg-panel p-6 shadow-sm"
      >
        <button
          disabled={isPending}
          onClick={onClose}
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ✕
        </button>

        <div className="mb-5 text-center text-base font-bold">新增標籤</div>

        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-ink-soft">
            標籤名稱
          </label>
          <input
            value={tagName}
            onChange={(e) => {
              setTagName(e.target.value);
            }}
            type="text"
            placeholder="輸入標籤名稱"
            className="rounded-[11px] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft shadow-in outline-none"
          />
        </div>

        <div className="mb-5">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">顏色</div>
          <div className="flex gap-3">
            {COLORS.map((color) => {
              const selected = !useCustomColor && tagColor === color;
              return (
                <button
                  disabled={isPending}
                  key={color}
                  type="button"
                  aria-label={`選擇顏色 ${color}`}
                  aria-pressed={selected}
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    selected ? 'shadow-out ring-2 ring-ink-soft' : 'shadow-in'
                  }`}
                  onClick={() => {
                    onColorChange({ color, isCustom: false });
                  }}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
              );
            })}

            {/* 自訂顏色：原生 input 透明蓋在漸層圓形上，點下去會跳出系統取色器 */}
            <label
              aria-label="自訂顏色"
              className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[conic-gradient(#e2574c,#f2b53d,#4f9d8a,#5c86c9,#a55eea,#e2574c)] ${
                useCustomColor ? 'shadow-out ring-2 ring-ink-soft' : 'shadow-in'
              }`}
            >
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full bg-panel text-xs font-bold text-ink-soft"
                style={{ background: useCustomColor ? tagColor : undefined }}
              >
                ＋
              </span>
              <input
                disabled={isPending}
                value={tagColor}
                onChange={(e) => {
                  onColorChange({
                    color: e.target.value,
                    isCustom: true,
                  });
                }}
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>
        </div>

        {/* TODO: 改成 <form>, type = submit */}
        <button
          disabled={isPending || tagName === ''}
          type="button"
          onClick={handleAddTag}
          className="w-full rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3 text-sm font-bold text-white shadow-out"
        >
          新增標籤
        </button>
      </div>
    </div>
  );
}
