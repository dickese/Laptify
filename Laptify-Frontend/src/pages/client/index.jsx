import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const RootPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootPage
