import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
    exit: { x: '-100%' },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.4 },
    exit: { opacity: 0 },
  };

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Cash Receipt', path: '/cashrecipt' },
    { label: 'Cash Payment', path: '/cashpayment' },
    { label: 'Bank Receipt', path: '/bankrecipt' },
    { label: 'Bank Payment', path: '/bankpayment' },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-2 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-md lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
            />

            {/* Sidebar */}
            <motion.div
              id="sidebar"
              className="fixed top-0 left-0 z-50 w-64 h-full text-white bg-white/10 backdrop-blur-md ring-1 ring-white/10 shadow-xl border-r border-white/20 lg:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {menuItems.map(({ label, path }) => (
                  <button
                    key={label}
                    onClick={() => handleNavigate(path)}
                    className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
