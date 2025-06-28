import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Dashboard', color: 'blue' },
    { path: '/cashrecipt', label: 'Cash Receipt', color: 'green' },
    { path: '/cashpayment', label: 'Cash Payment', color: 'red' },
    { path: '/bankrecipt', label: 'Bank Receipt', color: 'green' },
    { path: '/bankpayment', label: 'Bank Payment', color: 'red' },
   
  ];

  const buttonColors = {
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    green: 'bg-green-100 text-green-700 hover:bg-green-200',
    red: 'bg-red-100 text-red-700 hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  };

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm z-30 px-4 py-3 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Brand + Mobile Menu Button */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button 
              className="text-gray-600 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.svg 
                className="w-6 h-6"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </motion.svg>
            </button>
            <motion.h2 
              className="text-xl font-semibold text-gray-800 pl-3 sm:pl-0 cursor-pointer"
              onClick={() => handleNavigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              POS ZARYAB
            </motion.h2>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`text-sm px-4 py-1.5 rounded-full transition-all ${buttonColors[item.color]}`}
              whileHover={{ 
                y: -2,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="sm:hidden bg-white/95 mt-3 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-2 gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${buttonColors[item.color]}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;