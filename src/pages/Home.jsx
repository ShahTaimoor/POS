import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  // Example static data
  const stats = [
    { title: 'Sale Orders', value: 4 },
    { title: 'Cash Receipts', value: 30100 },
    { title: 'Bank Receipts', value: 14400 },
    { title: 'Ograi', value: 0 },
    { title: 'Purchase', value: 0 },
    { title: 'Expense', value: 100 },
    { title: 'Sale', value: 19450 },
    { title: 'Discount', value: 0 },
    { title: 'Cash Payment', value: 100 },
    { title: 'Bank Payment', value: 0 },
    { title: 'Online Deposit', value: 0 },
    { title: 'Purchase Orders', value: 0 },
  ];

  const handleFilter = async () => {
    setIsFiltering(true);
    console.log('Filtering from', fromDate, 'to', toDate);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsFiltering(false);
  };

  // Animation variants
  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const getBorderColor = (stat) => {
    if (stat.value === 0) return 'border-gray-200';
    if (stat.title.includes('Receipt') || stat.title === 'Sale') return 'border-green-400';
    if (stat.title.includes('Payment') || stat.title === 'Expense') return 'border-red-400';
    return 'border-blue-400';
  };

  const getTextColor = (stat) => {
    if (stat.value === 0) return 'text-gray-500';
    if (stat.title.includes('Receipt') || stat.title === 'Sale') return 'text-green-600';
    if (stat.title.includes('Payment') || stat.title === 'Expense') return 'text-red-600';
    return 'text-blue-600';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Date Range Filters */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-end gap-4 bg-white p-4 rounded-xl shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-full sm:w-1/7"
            whileHover={{ scale: 1.01 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            className="w-full sm:w-1/7"
            whileHover={{ scale: 1.01 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </motion.div>
          
          <motion.div className="w-full sm:w-auto">
            <motion.button
              onClick={handleFilter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isFiltering}
              className={`w-full sm:w-auto px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all flex items-center justify-center ${
                isFiltering ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isFiltering ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={statItemVariants}
              className={`bg-white p-5 rounded-xl border-2 ${getBorderColor(stat)} shadow-sm`}
            >
              <h3 className="text-sm font-medium text-center text-gray-600">{stat.title}</h3>
              <motion.p
                className={`text-2xl text-center font-semibold mt-2 ${getTextColor(stat)}`}
              >
                {stat.value.toLocaleString()}
              </motion.p>
              
              {/* Animated bar indicator */}
              {stat.value > 0 && (
                <motion.div 
                  className={`mt-3 h-1 rounded-full ${getTextColor(stat).replace('text', 'bg')}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, stat.value / 500)}%` }}
                  transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;