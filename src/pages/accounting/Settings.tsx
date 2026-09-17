// TODO：目前是靜態列表，每一列還沒有導向對應的子畫面（固定收支/預算設定/類別管理/
// 匯出記帳資料/標籤管理），之後每個子畫面做好後，這裡要接對應的路由連結或開啟 modal 的邏輯。

const SETTINGS_ITEMS = [
  { icon: '🔁', label: '固定收支', desc: '每月自動記錄的收入或支出' },
  { icon: '🎯', label: '預算設定', desc: '設定每月各分類的花費上限' },
  { icon: '🗂️', label: '類別管理', desc: '新增、編輯、排序記帳分類' },
  { icon: '📤', label: '匯出記帳資料', desc: '匯出成 CSV 檔案' },
  { icon: '🏷️', label: '標籤管理', desc: '管理記帳時使用的標籤' },
];

export default function AccountingSettingsPage() {
  return (
    <>
      <div className="mb-6.5">
        <h1 className="mb-1 text-[26px]">設定</h1>
        <p className="text-sm text-ink-soft">記帳相關設定</p>
      </div>

      <div className="rounded-[20px] border-2 border-line bg-panel p-5.5">
        <div className="flex flex-col gap-1 rounded-[14px]">
          {SETTINGS_ITEMS.map((item, index) => (
            <div key={item.label}>
              {index > 0 && <div className="h-px bg-line" />}
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-base shadow-in">
                    {item.icon}
                  </span>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-ink-soft">{item.desc}</div>
                  </div>
                </div>
                <span className="text-ink-soft">›</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
