import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ProductsPage } from './pages/ProductsPage';
import Layout from './components/Layout';
import { BasketPage } from './pages/BasketPage';
import { DetailPage } from './pages/DetailPage';
import NotFoundPage, { NotFoundRedirect } from './pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundRedirect />,
    children: [
      {
        path: '/',
        element: <ProductsPage />,
        index: true,
      },
      {
        path: '/basket',
        element: <BasketPage />,
        errorElement: <NotFoundRedirect />,
      },
      {
        path: '/details/:id',
        element: <DetailPage />,
        errorElement: <NotFoundRedirect />,
      },
      {
        path: "/404",
        element: <NotFoundPage />,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
