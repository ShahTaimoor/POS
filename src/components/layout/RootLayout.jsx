import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar';
import Notification from '../Notification';

const RootLayout = ({ children }) => {
  const { notification } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Notification */}
      <AnimatePresence>
        {notification && <Notification />}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main 
        className="pt-20 px-4 sm:px-6 lg:px-8 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default RootLayout;
