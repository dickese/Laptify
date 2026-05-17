import AdminPage from "@/pages/admin/index.jsx";
import ProductManagementPage from "@/pages/admin/product-page/index.jsx";
import RootPage from "@/pages/client/index.jsx";
import HomePage from "@/pages/client/home/index.jsx";
import SearchPage from "@/pages/client/product/search/index.jsx";
import ProductAdditionPage from "@/pages/admin/product-upsert-page/ProductAdditionPage.jsx";
import ProductUpdatingPage from "@/pages/admin/product-upsert-page/ProductUpdatingPage.jsx";
import { createBrowserRouter, Outlet } from "react-router-dom";
import OrderManagementPage from "@/pages/admin/order-page/index.jsx";
import OrderDetailPage from "@/pages/admin/order-detail-page/index.jsx";
import CartPage from "@/pages/user/cart-page/index.jsx";
import ProductPage from "@/pages/client/product";
import ProductDetailPage from "@/pages/client/product/detail/ProductDetailPage.jsx";
import CheckoutPage from "@/pages/user/checkout-page/index.jsx";
import UserWishlistPage from "@/pages/user/wishlist-page";
import RegisterPage from "@/pages/client/RegisterPage.jsx";
import LoginPage from "@/pages/client/LoginPage.jsx";
import ForgotPasswordPage from "@/pages/client/ForgotPasswordPage.jsx";
import ContactPage from "@/pages/client/ContactPage.jsx";
import AboutPage from "@/pages/client/about/AboutPage.jsx";
import DemoLoginPage from "@/pages/client/demo-auth.jsx";
import NotFoundPage from "@/pages/client/NotFoundPage.jsx";
import OrderSuccessPage from "@/pages/common/order-management/OrderSuccessPage.jsx";
import OrderDetailClientPage from "@/pages/client/order-detail-page/index.jsx";
import ProtectedRoute from "@/router/ProtectedRoute";
import OrderDetailUserPage from "@/pages/user/order-detail-page/index.jsx";
import UserDetailPage from "@/pages/client/profile/UserDetailPage.jsx";
import UserOrderPage from "@/pages/client/profile/UserOrderPage.jsx";

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
            element: (
              <ProductPage type={'best-sellers'} title={'Bán chạy nhất'} />
            ),
          },
          {
            path: 'news',
            element: <ProductPage type={'news'} title={'Sản phẩm mới'} />,
          },
          {
            path: 'search',
            element: <SearchPage />,
          },
          {
            path: ':productId',
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: 'orders',
        element: <Outlet />,
        children: [
          {
            path: ':id',
            element: <OrderDetailUserPage />,
          },
        ],
      },
      {
        path: 'categories',
        element: <Outlet />,
        children: [
          {
            path: ':category/products',
            element: (
              <ProductPage
                type={'product-by-category'}
                title={'Sản phẩm theo danh mục'}
              />
            ),
          },
        ],
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <UserWishlistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          // <ProtectedRoute>
          <CheckoutPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: 'order-success',
        element: <OrderSuccessPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <UserDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order-history',
        element: (
          <ProtectedRoute>
            <UserOrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'demo-auth',
        element: <DemoLoginPage />,
      },

      {
        path: 'track-order/:trackingCode',
        element: <OrderDetailClientPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      // <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminPage />
      // </ProtectedRoute>
    ),
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
        path: 'orders/:id',
        element: <OrderDetailPage />,
      },
    ],
  },
]);
