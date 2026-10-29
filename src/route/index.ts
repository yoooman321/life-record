import { createBrowserRouter } from 'react-router';
import RootLayout from '@/layout/RootLayout';
import { rootLoader } from '@/layout/rootLoader';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
// import AccountingStatsPage from '@/pages/accounting/Stats';
// import AccountingTrendPage from '@/pages/accounting/Trend';
import AccountingSettingsPage from '@/pages/accounting/Settings';
import AccountingCategoryManagementPage from '@/pages/accounting/CategoryManagement';
import AccountingTagManagementPage from '@/pages/accounting/TagManagement';
import AccountingBudgetPage from '@/pages/accounting/Budget';
import AccountingExportPage from '@/pages/accounting/Export';
import AccountingHomePage from '@/pages/accounting/Home';
import AccountingLayout from '@/layout/AccountingLayout';
import { loginLoader } from '@/pages/loginLoader';
import AccountingSettingLayout from '@/layout/AccountingSettingLayout';
import AccountingRecurringPage from '@/pages/accounting/Recurring';
import { SETTING_NAV_ITEMS } from '@/const/accounting-settings';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
    loader: loginLoader,
  },
  {
    path: '/register',
    Component: LoginPage,
    loader: loginLoader,
  },
  {
    path: '/',
    Component: RootLayout,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/accounting',
        Component: AccountingLayout,
        children: [
          {
            index: true,
            Component: AccountingHomePage,
          },
          {
            path: 'settings',
            Component: AccountingSettingLayout,
            children: [
              {
                index: true,
                Component: AccountingSettingsPage,
                handle: { title: '設定', subtitle: '記帳相關設定' },
              },
              {
                path: 'recurring',
                Component: AccountingRecurringPage,
                handle: SETTING_NAV_ITEMS.recurring,
              },
              {
                path: 'budget',
                Component: AccountingBudgetPage,
                handle: SETTING_NAV_ITEMS.budget,
              },
              {
                path: 'category-management',
                Component: AccountingCategoryManagementPage,
                handle: SETTING_NAV_ITEMS.category,
              },
              {
                path: 'export',
                Component: AccountingExportPage,
                handle: SETTING_NAV_ITEMS.export,
              },
              {
                path: 'tag-management',
                Component: AccountingTagManagementPage,
                handle: SETTING_NAV_ITEMS.tags,
              },
            ],
          },
        ],
      },
    ],
  },
]);
