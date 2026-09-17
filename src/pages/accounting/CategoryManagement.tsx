// TODO：目前是靜態畫面。實際使用時要接：長按拖曳排序邏輯（可以查 dnd-kit 這類套件）、
// 點擊分類卡片要開啟編輯（可以沿用 AddCategoryModal 改成編輯模式）、
// 點擊「新增分類」要開啟 AddCategoryModal，這些留給你練習。

const CATEGORIES = [
  { name: '飲食', icon: '🍱', color: 'var(--color-accent-food)' },
  { name: '交通', icon: '🚌', color: 'var(--color-accent-exercise)' },
  { name: '社交', icon: '🎉', color: 'var(--color-accent-diary)' },
  { name: '學習/3C', icon: '💻', color: 'var(--color-accent-money)' },
  { name: '居家/水電', icon: '🏠', color: 'var(--color-accent-body)' },
  { name: '收入', icon: '💵', color: 'var(--color-accent-money)' },
  { name: '投資', icon: '📈', color: 'var(--color-accent-money)' },
];

export default function AccountingCategoryManagementPage() {
  return (
    <>
      <div className="mb-6.5 flex items-center justify-between">
        <button
          type="button"
          aria-label="返回"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ‹
        </button>
        <h1 className="text-[20px] font-bold">記帳分類</h1>
        <button
          type="button"
          aria-label="新增分類"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ＋
        </button>
      </div>

      <p className="mb-5 text-center text-[13px] text-ink-soft">
        長按拖曳以移動順序
      </p>

      <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              type="button"
              className="flex flex-col items-center gap-2 rounded-[14px] p-3.5 shadow-in"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg"
                style={{
                  backgroundColor: `color-mix(in srgb, ${category.color} 15%, transparent)`,
                }}
              >
                {category.icon}
              </span>
              <span className="text-xs font-semibold">{category.name}</span>
            </button>
          ))}

          <button
            type="button"
            className="flex flex-col items-center gap-2 rounded-[14px] border-2 border-dashed border-line p-3.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-ink-soft">
              ＋
            </span>
            <span className="text-xs font-semibold text-ink-soft">
              新增分類
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
