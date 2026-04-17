import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useDispatch } from 'react-redux';
import { fetchUserWishlist } from '@/feature/wishlist/wishlistThunk.js';

const RootPage = () => {

  const dispatch = useDispatch();

  // TODO: Replace with actual authentication check
  const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Fetching user wishlist...");
      dispatch(fetchUserWishlist());
    } else {
      console.log("User not authenticated, skipping wishlist fetch.");
    }
  }, [dispatch, isAuthenticated]);

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
