import { useTags } from '@/hooks';
import { useState } from 'react';
import TagPicker from './TagPicker';

type TagFieldProps = {
  selectedTags: number[];
  onToggle: (id: number) => void;
  onReset: () => void;
};
export default function TagField({
  selectedTags,
  onToggle,
  onReset,
}: TagFieldProps) {
  const { data: tagList } = useTags();
  const [openTagPicker, setOpenTagPicker] = useState(false);

  const findTag = (tagId: number) => {
    return tagList?.find(({ id }) => tagId === id);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpenTagPicker(true);
        }}
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5"
      >
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-lg">🏷️</span>
          <span className="text-sm font-semibold">標籤</span>
        </div>

        {selectedTags.length > 0 ? (
          <div className="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="ml-auto flex items-center gap-2">
              {selectedTags.map((id) => {
                const tag = findTag(id);
                return (
                  <div
                    className="flex shrink-0 items-center gap-2 rounded-full border border-line px-3 py-1 text-xs whitespace-nowrap text-ink"
                    key={`tags-${id}`}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: tag?.color }}
                    ></div>
                    {tag?.name}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-1 text-sm text-ink-soft">
            新增標籤
          </div>
        )}
        <span className="shrink-0 text-ink-soft">›</span>
      </button>
      {openTagPicker && (
        <TagPicker
          tagList={tagList || []}
          onClose={() => {
            setOpenTagPicker(false);
          }}
          selectedTags={selectedTags}
          onClick={onToggle}
          onReset={onReset}
        />
      )}
    </>
  );
}
