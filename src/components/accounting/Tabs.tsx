// TODO: move to UI component
type TabsProps<T extends string> = {
  tabs: {
    label: string;
    id: T;
  }[];
  onChange: (tab: T) => void;
  currentTab: T;
};
export default function Tabs<T extends string>({
  tabs,
  onChange,
  currentTab,
}: TabsProps<T>) {
  return (
    <div className="flex gap-1 rounded-full bg-bg p-1">
      {tabs.map((tab) => {
        return (
          <button
            key={tab.id}
            type="button"
            className={`rounded-full px-3 py-1 text-xs ${currentTab === tab.id ? 'font-bold text-ink shadow-out' : 'font-semibold text-ink-soft'}`}
            onClick={() => {
              onChange(tab.id);
            }}
          >
            {tab.label}
          </button>
        );
      })}
      {/* <button
        type="button"
        className="rounded-full bg-panel px-3 py-1 text-xs font-bold text-ink shadow-out"
      >
        支出
      </button>
      <button
        type="button"
        className="rounded-full px-3 py-1 text-xs font-semibold text-ink-soft"
      >
        收入
      </button> */}
    </div>
  );
}
