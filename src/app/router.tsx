import { createBrowserRouter } from 'react-router'
import { AppLayout } from '../layouts/AppLayout.tsx'
import { RouteErrorPage } from '../layouts/RouteErrorPage.tsx'
import { customersLoader, customerDetailLoader } from '../routes/customers/customers.loader.ts'
import { CustomerDetailPage } from '../routes/customers/CustomerDetailPage.tsx'
import { CustomerListPage } from '../routes/customers/CustomerListPage.tsx'
import { DashboardPage } from '../routes/dashboard/DashboardPage.tsx'
import { NotFoundPage } from '../routes/NotFoundPage.tsx'
import { SettingsPage } from '../routes/settings/SettingsPage.tsx'
import { VoucherSearchPage } from '../routes/vouchers/VoucherSearchPage.tsx'
import { vouchersLoader } from '../routes/vouchers/vouchers.loader.ts'

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
        loader: customersLoader,
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
        loader: vouchersLoader,
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
