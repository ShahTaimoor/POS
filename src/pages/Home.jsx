import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setNotification } from '../store/slices/uiSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [fromDate, setFromDate] = useState(getCurrentDate());
  const [toDate, setToDate] = useState(getCurrentDate());
  const [isFiltering, setIsFiltering] = useState(false);

  // Example static data with better organization
  const stats = [
    { title: 'Sale Orders', value: 4, icon: '📊', color: 'blue' },
    { title: 'Cash Receipts', value: 30100, icon: '💵', color: 'green' },
    { title: 'Bank Receipts', value: 14400, icon: '🏦', color: 'blue' },
    { title: 'Ograi', value: 0, icon: '🔄', color: 'gray' },
    { title: 'Purchase', value: 0, icon: '🛒', color: 'purple' },
    { title: 'Expense', value: 100, icon: '💰', color: 'red' },
    { title: 'Sale', value: 19450, icon: '📈', color: 'green' },
    { title: 'Discount', value: 0, icon: '🎫', color: 'yellow'},
    { title: 'Cash Payment', value: 100, icon: '💸', color: 'red' },
    { title: 'Bank Payment', value: 0, icon: '💳', color: 'blue' },
    { title: 'Online Deposit', value: 0, icon: '🌐', color: 'green' },
    { title: 'Purchase Orders', value: 0, icon: '📋', color: 'purple' },
  ];

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/cashrecipt', label: 'Cash Receipt'},
    { path: '/cashpayment', label: 'Cash Payment' },
    { path: '/bankrecipt', label: 'Bank Receipt' },
    { path: '/bankpayment', label: 'Bank Payment' },
    
  ];

  
  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

   const isActive = (path) => location.pathname === path;
  const handleFilter = async () => {
    if (!fromDate || !toDate) {
      dispatch(setNotification({
        type: 'warning',
        title: 'Date Range Required',
        message: 'Please select both from and to dates.'
      }));
      return;
    }

    setIsFiltering(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    dispatch(setNotification({
      type: 'success',
      title: 'Data Updated',
      message: `Filtered data from ${fromDate} to ${toDate}`
    }));

    setIsFiltering(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      gray: 'bg-gray-50 border-gray-200 text-gray-700',
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="space-y-8">

        {/* Center - Desktop Navigation */}
        <div className="lg:hidden flex flex-wrap items-center text-sm space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`py-1 px-2 rounded-lg text-[10px] font-medium transition-all duration-200 flex items-center space-x-2 ${
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
      {/* Filter Section Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sm:hidden flex justify-center"
      >
        <motion.div
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-2 py-1 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="date"
            className="w-[100px] text-xs border-none focus:ring-0 focus:outline-none"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span className="text-gray-500 text-xs">→</span>
          <input
            type="date"
            className="w-[100px] text-xs border-none focus:ring-0 focus:outline-none"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            onClick={handleFilter}
            disabled={isFiltering}
            className={`flex items-center justify-center rounded-full p-1 transition ${
              isFiltering
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isFiltering ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Filter Section Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden sm:flex justify-center"
      >
        <motion.div
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="date"
            className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span className="text-gray-500 text-sm">→</span>
          <input
            type="date"
            className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <motion.button
            onClick={handleFilter}
            disabled={isFiltering}
            className={`p-2 rounded-lg text-white text-sm font-medium shadow-md transition-all flex items-center justify-center ${
              isFiltering
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
            whileHover={!isFiltering ? { scale: 1.02 } : {}}
            whileTap={!isFiltering ? { scale: 0.98 } : {}}
          >
            {isFiltering ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-2"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover="hover"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 cursor-pointer group hover:shadow-lg transition-shadow"
          >
            <div className={`p-3 w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-lg ${getColorClasses(stat.color)}`}>
              <span className="text-md sm:text-xl">{stat.icon}</span>
            </div>
            
            <div className="">
              <h3 className="text-[13px] sm:text-lg text-center font-medium text-gray-600">{stat.title}</h3>
              <p className="text-lg sm:text-lg text-center font-bold text-gray-900">
                {typeof stat.value === 'number' && stat.value >= 1000 
                  ? `${stat.value.toLocaleString()}`
                  : stat.value.toLocaleString()
                }
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;