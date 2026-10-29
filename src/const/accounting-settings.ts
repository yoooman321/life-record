import {
  Repeat,
  CircleGauge,
  FolderBookmark,
  FolderOutput,
  Tag,
} from 'lucide-react';

export const SETTING_NAV_ITEMS = {
  recurring: {
    icon: Repeat,
    title: '固定收支',
    subtitle: '每月自動記錄的收入或支出',
    to: '/accounting/settings/recurring',
  },
  budget: {
    icon: CircleGauge,
    title: '預算設定',
    subtitle: '設定每月各分類的花費上限',
    to: '/accounting/settings/budget',
  },
  category: {
    icon: FolderBookmark,
    title: '類別管理',
    subtitle: '新增、編輯、排序記帳分類',
    to: '/accounting/settings/category-management',
  },
  export: {
    icon: FolderOutput,
    title: '匯出記帳資料',
    subtitle: '匯出成 CSV 檔案',
    to: '/accounting/settings/export',
  },
  tags: {
    icon: Tag,
    title: '標籤管理',
    subtitle: '管理記帳時使用的標籤',
    to: '/accounting/settings/tag-management',
  },
};
