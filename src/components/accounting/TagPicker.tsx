// TODO：目前是靜態骨架（標籤資料寫死、永遠渲染在畫面上）。
// 留給你練習的部分：開關 state（點 AddEntryModal 的「標籤」列才顯示）、標籤資料來源（參考 datatable-design.md 的 tag_list）、
// 選取／取消選取（多選）、「清空」「完成」「✕」的行為、把選取結果回傳給 AddEntryModal、「＋」新增標籤。
// 動畫（例如面板從下方滑出）也留給你練習。

import AddTagModal from './AddTagModal';
import { useState } from 'react';
import type { TagItem } from '@/type';

type TagPickerProps = {
  tagList: TagItem[];
  onClose: () => void;
  selectedTags: number[];
  onClick: (id: number) => void;
  onReset: () => void;
};

export default function TagPicker({
  tagList,
  onClose,
  selectedTags,
  onClick,
  onReset,
}: TagPickerProps) {
  const [openAddTag, setOpenAddTag] = useState(false);
  return (
    <div
      role="dialog"
      aria-label="標籤"
      className="absolute inset-x-0 bottom-0 z-10 flex h-3/5 flex-col rounded-[20px] border border-line bg-panel "
    >
      {/* 標頭：關閉 + 標題 */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={onClose}
          type="button"
          aria-label="關閉標籤選單"
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ✕
        </button>
        <div className="text-sm font-bold text-ink">標籤</div>
        {/* 佔位，讓標題置中 */}
        <div className="h-8 w-8" />
      </div>

      <div className="h-px bg-line" />

      {/* 標籤列表：可多選，選取的用 shadow-out + 深色字，沒選的用 shadow-in */}
      <div className="flex flex-1 flex-wrap content-start gap-2 overflow-y-auto p-5">
        {tagList &&
          tagList.map((tag) => {
            const selected = selectedTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                aria-pressed={selected}
                // 兩種狀態都有 2px 邊框（沒選的是透明），切換時尺寸不會跳動
                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm ${
                  selected
                    ? 'font-bold text-ink'
                    : 'border-transparent bg-bg font-semibold text-ink-soft shadow-in'
                }`}
                // 標籤顏色是資料，選取時的邊框與淡底色用 style 帶入（跟 CategoryList 的 category.color 一樣）
                style={
                  selected
                    ? {
                        borderColor: tag.color,
                        backgroundColor: `color-mix(in srgb, ${tag.color} 15%, transparent)`,
                      }
                    : undefined
                }
                onClick={() => {
                  onClick(tag.id);
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                {tag.name}
                {selected && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
      </div>

      <div className="h-px bg-line" />

      {/* 底部：清空 / 完成 / 新增標籤 */}
      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={onReset}
          type="button"
          className="text-sm font-semibold text-accent-food"
        >
          清空
        </button>
        <button
          onClick={onClose}
          type="button"
          className="rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] px-8 py-2.5 text-sm font-bold text-white "
        >
          完成
        </button>
        <button
          onClick={() => {
            setOpenAddTag(true);
          }}
          type="button"
          aria-label="新增標籤"
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-ink-soft shadow-in"
        >
          ＋
        </button>
      </div>

      {openAddTag && (
        <AddTagModal
          onClose={() => {
            setOpenAddTag(false);
          }}
        />
      )}
    </div>
  );
}
