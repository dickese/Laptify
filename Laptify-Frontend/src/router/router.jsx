import AdminPage from "@/pages/admin/index.jsx";
import ProductManagementPage from "@/pages/admin/product-page/index.jsx";
import RootPage from "@/pages/client/index.jsx";
import HomePage from "@/pages/client/home/index.jsx";
import SearchPage from "@/pages/client/search/index.jsx";
import ProductAdditionPage from "@/pages/admin/product-page/ProductAdditionPage.jsx";
import ProductUpdatingPage from "@/pages/admin/product-page/ProductUpdatingPage.jsx";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminPage />,
        children: [
            {
                path:"products",
                element: <ProductManagementPage/>
            },
            {
                path: "product-addition",
                element: <ProductAdditionPage/>
            },
            {
                path: "product-updating/:id",
                element: <ProductUpdatingPage/>
            }
        ]
    }
])
