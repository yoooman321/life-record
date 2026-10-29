// TODO：目前是靜態列表，每一列還沒有導向對應的子畫面（固定收支/預算設定/類別管理/
// 匯出記帳資料/標籤管理），之後每個子畫面做好後，這裡要接對應的路由連結或開啟 modal 的邏輯。

import { SETTING_NAV_ITEMS } from '@/const/accounting-settings';
import { NavLink } from 'react-router';

const SETTINGS_ITEMS = [
  {
    icon: '🔁',
    label: '固定收支',
    desc: '每月自動記錄的收入或支出',
    to: '/accounting/settings/recurring',
  },
  {
    icon: '🎯',
    label: '預算設定',
    desc: '設定每月各分類的花費上限',
    to: '/accounting/settings/budget',
  },
  {
    icon: '🗂️',
    label: '類別管理',
    desc: '新增、編輯、排序記帳分類',
    to: '/accounting/settings/category-management',
  },
  {
    icon: '📤',
    label: '匯出記帳資料',
    desc: '匯出成 CSV 檔案',
    to: '/accounting/settings/export',
  },
  {
    icon: '🏷️',
    label: '標籤管理',
    desc: '管理記帳時使用的標籤',
    to: '/accounting/settings/tag-management',
  },
];

export default function AccountingSettingsPage() {
  return (
    <div className="flex flex-col gap-1 rounded-[14px]">
      {Object.entries(SETTING_NAV_ITEMS).map(([key, item], index) => (
        <div key={key}>
          {index > 0 && <div className="h-px bg-line" />}
          <NavLink
            viewTransition
            to={item.to}
            type="button"
            className="flex w-full items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full text-base shadow-in">
                <item.icon className="h-4.5 w-4.5 text-ink-soft" />
              </span>
              <div className="text-left">
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs text-ink-soft">{item.subtitle}</div>
              </div>
            </div>
            <span className="text-ink-soft">›</span>
          </NavLink>
        </div>
      ))}
    </div>
  );
}
