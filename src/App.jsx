import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './components/layout/RootLayout';
import BankRecipt from './pages/BankRecipt';
import BankPayment from './pages/BankPayment';
import CashPayment from './pages/CashPayment';
import CashRecipt from './pages/CashRecipt';
import Purchase from './pages/Purchase';
import AddCustomer from './pages/AddCustomer';
import RegisterSale from './pages/RegisterSale';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout><Home /></RootLayout>,
    },
    {
      path: "/bankrecipt",
      element: <RootLayout><BankRecipt /></RootLayout>,
    },
    {
      path: "/bankpayment",
      element: <RootLayout><BankPayment /></RootLayout>,
    },
    {
      path: "/cashpayment",
      element: <RootLayout><CashPayment /></RootLayout>,
    },
    {
      path: "/cashrecipt",
      element: <RootLayout><CashRecipt /></RootLayout>,
    },
    {
      path: "/purchase",
      element: <RootLayout><Purchase /></RootLayout>,
    },
    {
      path: "/add-customer",
      element: <RootLayout><AddCustomer /></RootLayout>,
    },
    {
      path: "/register-sale",
      element: <RootLayout><RegisterSale /></RootLayout>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;