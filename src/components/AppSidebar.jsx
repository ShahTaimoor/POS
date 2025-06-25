import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (isOpen && sidebar && !sidebar.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handles navigation and closes sidebar
  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Blurry Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* Glassmorphic Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 z-50 w-64 h-full text-white transition-transform duration-300
        bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
      >
        <div className="p-4 border-b border-white/20 flex justify-between items-center">
          <h1 className="text-xl font-bold">Menu</h1>
          <button onClick={() => setIsOpen(false)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-2">
          <button onClick={() => handleNavigate('/')} className="block w-full text-left px-2 py-1 rounded hover:bg-white/20">Dashboard</button>
          <button onClick={() => handleNavigate('/purchase')} className="block w-full text-left px-2 py-1 rounded hover:bg-white/20">Purchase</button>
          <button onClick={() => handleNavigate('/cashrecipt')} className="block w-full text-left px-2 py-1 rounded hover:bg-white/20">Cash Recipt</button>
          <button onClick={() => handleNavigate('/cashpayment')} className="block w-full text-left px-2 py-1 rounded hover:bg-white/20">Cash Payment</button>
          <button onClick={() => handleNavigate('/bankrecipt')} className="block w-full text-left px-2 py-1 rounded hover:bg-white/20">Bank Recipt</button>
          <button onClick={() => handleNavigate('/bankpayment')} className="block w-full text-left px-2 py-1 rounded hover:bg-white/20">Bank Payment</button>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
