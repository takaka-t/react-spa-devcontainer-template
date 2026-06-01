import { createBrowserRouter } from 'react-router'
import { AppLayout } from '../layouts/AppLayout.tsx'
import { RouteErrorPage } from '../layouts/RouteErrorPage.tsx'
import { CustomerDetailPage, loader as customerDetailLoader } from '../pages/customers/CustomerDetailPage.tsx'
import { CustomerListPage, loader as customerListLoader } from '../pages/customers/CustomerListPage.tsx'
import { DashboardPage } from '../pages/dashboard/DashboardPage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { SettingsPage } from '../pages/settings/SettingsPage.tsx'
import { VoucherSearchPage, loader as voucherSearchLoader } from '../pages/vouchers/VoucherSearchPage.tsx'

// React Router のルート定義は、アプリ全体の画面構造を表す「地図」です。
// 画面が増えたときも、このファイルを見ることで URL、レイアウト、データ取得の関係を追いやすくなります。
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'customers',
        loader: customerListLoader,
        element: <CustomerListPage />,
        errorElement: <RouteErrorPage />,
      },
      {
        path: 'customers/:customerId',
        loader: customerDetailLoader,
        element: <CustomerDetailPage />,
        errorElement: <RouteErrorPage />,
      },
      {
        path: 'vouchers',
        loader: voucherSearchLoader,
        element: <VoucherSearchPage />,
        errorElement: <RouteErrorPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
