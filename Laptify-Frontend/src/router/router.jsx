import AdminPage from "@/pages/admin/index.jsx";
import ProductManagementPage from "@/pages/admin/product-page/index.jsx";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([

    {
        path: "/admin",
        element: <AdminPage/>,
        children: [
            {
                index: true,
                element: <ProductManagementPage/>
            }
        ]
    }
])