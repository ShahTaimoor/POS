import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/cashrecipt', label: 'Cash Receipt', icon: '💵' },
    { path: '/cashpayment', label: 'Cash Payment', icon: '💸' },
    { path: '/bankrecipt', label: 'Bank Receipt', icon: '🏦' },
    { path: '/bankpayment', label: 'Bank Payment', icon: '💳' },
    { path: '/purchase', label: 'Purchase', icon: '🛒' },
    { path: '/add-customer', label: 'Customers', icon: '👥' },
    { path: '/register-sale', label: 'Sales', icon: '📈' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => handleNavigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              POS ZARYAB
            </motion.h1>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Side - Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden bg-white rounded-xl shadow-elevated border border-gray-100 overflow-hidden mb-4"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;