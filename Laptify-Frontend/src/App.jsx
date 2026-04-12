
import AdminPage from '@/pages/admin/index.jsx'
import './App.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from '@/router/router.jsx';

function App() {
 return <RouterProvider router={router} />;
}

export default App
