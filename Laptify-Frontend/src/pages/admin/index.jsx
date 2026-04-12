import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import SideBar from './SideBar';

export default function AdminPage() {
  return (
    <div className='flex flex-col h-screen'>
      <TopBar />
      <div className='flex flex-1 overflow-hidden'>
        <SideBar />
        <main className='flex-1 ml-64 overflow-auto bg-gray-50'>
          <div className='p-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
