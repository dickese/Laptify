import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-8 mb-8'>
          {/* About Section */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Exclusive</h3>
            <p className='text-sm text-gray-400 mb-4'>Subscribe to get special offers and free giveaways.</p>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600'
            />
          </div>

          {/* Support Links */}
          <div>
            <h4 className='text-sm font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li><a href='#' className='hover:text-white transition'>Gift Cards</a></li>
              <li><a href='#' className='hover:text-white transition'>Track Orders</a></li>
              <li><a href='#' className='hover:text-white transition'>Shipping Info</a></li>
              <li><a href='#' className='hover:text-white transition'>FAQ</a></li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className='text-sm font-semibold mb-4'>Account</h4>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li><a href='#' className='hover:text-white transition'>My Account</a></li>
              <li><a href='#' className='hover:text-white transition'>Login / Register</a></li>
              <li><a href='#' className='hover:text-white transition'>Cart</a></li>
              <li><a href='#' className='hover:text-white transition'>Wishlist</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-sm font-semibold mb-4'>Quick Link</h4>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li><a href='#' className='hover:text-white transition'>Privacy Policy</a></li>
              <li><a href='#' className='hover:text-white transition'>Terms of Use</a></li>
              <li><a href='#' className='hover:text-white transition'>Contact</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className='text-sm font-semibold mb-4'>Download App</h4>
            <p className='text-xs text-gray-400 mb-3'>Save $3 with App New User Only</p>
            <div className='flex gap-2 mb-4'>
              <div className='w-16 h-16 bg-gray-800 rounded flex items-center justify-center'>
                <span className='text-xs text-gray-500'>QR Code</span>
              </div>
              <div className='flex flex-col gap-1 justify-center'>
                <button className='text-xs border border-gray-400 px-2 py-1 rounded hover:border-white transition'>
                  Google Play
                </button>
                <button className='text-xs border border-gray-400 px-2 py-1 rounded hover:border-white transition'>
                  App Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {/* <div className='flex gap-4 mb-8'>
          <Facebook size={18} className='cursor-pointer hover:text-red-600 transition' />
          <Twitter size={18} className='cursor-pointer hover:text-red-600 transition' />
          <Instagram size={18} className='cursor-pointer hover:text-red-600 transition' />
          <Linkedin size={18} className='cursor-pointer hover:text-red-600 transition' />
        </div> */}
      </div>

      {/* Copyright */}
      <div className='bg-gray-950 py-4 px-4 text-center text-xs text-gray-500'>
        © 2024 Exclusive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
