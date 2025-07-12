import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CashReceipt = () => {
  const customerOptions = [
    'AUTO GALLERY ABBOTTABAD MEHMOOD MALIK',
    'ELECTRONICS EMPORIUM',
    'FURNITURE WORLD',
    'Ali Autos',
    'Ahmed Traders',
    'Mehran Autos',
    'City Motors',
    'Premium Electronics',
    'Home Decor Plus',
    'Tech Solutions'
  ];

  const [customerName, setCustomerName] = useState('');
  const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    previousBalance: '5000',
    description: '',
    amount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate new balance whenever amount changes
  const newBalance = formData.amount 
    ? (parseFloat(formData.previousBalance) - parseFloat(formData.amount)).toFixed(2)
    : '';

  const handleCustomerChange = (e) => {
    setCustomerName(e.target.value);
    setShowCustomerSuggestions(true);
  };

  const handleCustomerSelect = (name) => {
    setCustomerName(name);
    setShowCustomerSuggestions(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const receiptData = {
      customerName,
      ...formData,
      newBalance
    };
    
    console.log('Saved Cash Receipt Data:', receiptData);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredCustomers = customerOptions.filter(customer =>
    customer.toLowerCase().includes(customerName.toLowerCase()) && customerName !== ''
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 text-blue-600"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.1 }}
      >
        Cash Receipt
      </motion.h1>

      {/* Customer Name Input */}
      <div className="mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
          <div className="relative">
            <input
              type="text"
              value={customerName}
              onChange={handleCustomerChange}
              onFocus={() => setShowCustomerSuggestions(true)}
              onBlur={() => setTimeout(() => setShowCustomerSuggestions(false), 200)}
              placeholder="Search customer..."
              className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                customerName ? 'border-blue-300' : 'border-gray-300'
              }`}
            />
            <motion.div 
              className="absolute right-3 top-3 text-gray-400"
              animate={{ rotate: showCustomerSuggestions ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
          
          <AnimatePresence>
            {showCustomerSuggestions && filteredCustomers.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
              >
                {filteredCustomers.map((customer, index) => (
                  <motion.li
                    key={index}
                    onClick={() => handleCustomerSelect(customer)}
                    whileHover={{ backgroundColor: '#f0f7ff' }}
                    className="px-4 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                  >
                    {customer}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Previous Balance</label>
          <motion.div whileHover={{ scale: 1.01 }}>
            <input
              type="number"
              value={formData.previousBalance}
              onChange={(e) => handleInputChange('previousBalance', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </motion.div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <motion.div whileHover={{ scale: 1.01 }}>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0.00"
            />
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <motion.div whileHover={{ scale: 1.01 }}>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24"
              placeholder="Transaction details..."
            />
          </motion.div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Balance</label>
          <motion.div whileHover={{ scale: 1.01 }}>
            <input
              type="number"
              value={newBalance}
              disabled
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-700"
            />
          </motion.div>
        </div>
      </div>

      {/* Save Button with Success Feedback */}
      <div className="mt-8 flex items-center space-x-4">
        <motion.button
          onClick={handleSave}
          disabled={isSubmitting || !customerName || !formData.amount}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md transition-all flex items-center ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : (!customerName || !formData.amount) 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Save Receipt'
          )}
        </motion.button>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-green-600"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">Cash Receipt Saved Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CashReceipt;