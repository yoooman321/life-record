import { createBrowserRouter } from 'react-router';
import RootLayout from '@/layout/RootLayout';
import { rootLoader } from '@/layout/rootLoader';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
// import AccountingStatsPage from '@/pages/accounting/Stats';
// import AccountingTrendPage from '@/pages/accounting/Trend';
// import AccountingSettingsPage from '@/pages/accounting/Settings';
// import AccountingCategoryManagementPage from '@/pages/accounting/CategoryManagement';
// import AccountingTagManagementPage from '@/pages/accounting/TagManagement';
// import AccountingRecurringPage from '@/pages/accounting/Recurring';
// import AccountingBudgetPage from '@/pages/accounting/Budget';
// import AccountingExportPage from '@/pages/accounting/Export';
import AccountingHomePage from '@/pages/accounting/Home';
import AccountingLayout from '@/layout/AccountingLayout';
import { loginLoader } from '@/pages/loginLoader';

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
        ],
      },
    ],
  },
]);
