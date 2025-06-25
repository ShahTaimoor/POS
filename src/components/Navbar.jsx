import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 bg-white shadow-sm z-30 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button className="mr-4 text-gray-500 lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
              6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 
              8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 
              17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
