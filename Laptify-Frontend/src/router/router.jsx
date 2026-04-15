import AdminPage from '@/pages/admin/index.jsx';
import ProductManagementPage from '@/pages/admin/product-page/index.jsx';
import RootPage from '@/pages/client/index.jsx';
import HomePage from '@/pages/client/home/index.jsx';
import SearchPage from '@/pages/client/product/search/index.jsx';
import ProductAdditionPage from '@/pages/admin/product-upsert-page/ProductAdditionPage.jsx';
import ProductUpdatingPage from '@/pages/admin/product-upsert-page/ProductUpdatingPage.jsx';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import OrderManagementPage from '@/pages/admin/order-page/index.jsx';
import OrderDetailPage from '@/pages/admin/order-detail-page/index.jsx';
import CartPage from '@/pages/user/cart-page/index.jsx';
import ProductPage from '@/pages/client/product';
import path from 'node:path';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'products',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <ProductPage type={'all'} title={'Tất cả sản phẩm'} />,
                    },
                    {
                        path: 'best-sellers',
                        element: <ProductPage type={'best-sellers'} title={'Bán chạy nhất'} />,
                    },
                    {
                        path: 'news',
                        element: <ProductPage type={'news'} title={'Sản phẩm mới'} />,
                    },
                    {
                        path: 'search',
                        element: <SearchPage />,
                    }
                ]
            },
            {
                path: 'categories',
                element: <Outlet />,
                children: [
                    {
                        path: ':category/products',
                        element: <ProductPage type={'product-by-category'} title={'Sản phẩm theo danh mục'} />,
                    },
                ]
            },
            {
                path: 'cart',
                element: <CartPage />
            }
        ],
    },
    {
        path: '/admin',
        element: <AdminPage />,
        children: [
            {
                path: 'products',
                element: <ProductManagementPage />,
            },
            {
                path: 'product-addition',
                element: <ProductAdditionPage />,
            },
            {
                path: 'product-updating/:id',
                element: <ProductUpdatingPage />,
            },
            {
                path: 'orders',
                element: <OrderManagementPage />,
            },
            {
                path: 'order-detail/:id',
                element: <OrderDetailPage />,
            },
        ],
    },
]);
