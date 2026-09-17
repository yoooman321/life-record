import { createBrowserRouter } from 'react-router';
import RootLayout from '@/layout/RootLayout';
import HomePage from '@/pages/Home';
// import AccountingStatsPage from '@/pages/accounting/Stats';
// import AccountingTrendPage from '@/pages/accounting/Trend';
// import AccountingSettingsPage from '@/pages/accounting/Settings';
// import AccountingCategoryManagementPage from '@/pages/accounting/CategoryManagement';
// import AccountingTagManagementPage from '@/pages/accounting/TagManagement';
// import AccountingRecurringPage from '@/pages/accounting/Recurring';
// import AccountingBudgetPage from '@/pages/accounting/Budget';
import AccountingExportPage from '@/pages/accounting/Export';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/accounting',
        Component: AccountingExportPage,
      },
    ],
  },
]);
