import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CashPayment = () => {
  const accountOptions = [
    '3 STAR AUTO SWABI',
    '3 STAR AUTOS PABBI',
    '3M AUTOS CHARSADA',
    '4 STAR AUTO DECORATION RAWALPINDI',
    '5D MAT AND DASHBOARD CLOTH',
    '7 ELEVEN TUCK SHOP CHARSADA'
  ];

  const initialRow = {
    AccountName: '',
    Balance: '',
    Particular: '',
    Amount: '',
    showSuggestions: false
  };

  const [data, setData] = useState([
    { ...initialRow, AccountName: '3 STAR AUTO SWABI', Balance: 0 }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const columns = ['AccountName', 'Balance', 'Particular', 'Amount'];

  const handleCellChange = (index, column, value) => {
    const newData = [...data];
    newData[index][column] = value;

    if (column === 'AccountName') {
      newData[index].showSuggestions = true;
    }

    setData(newData);
  };

  const handleSuggestionClick = (index, suggestion) => {
    const newData = [...data];
    newData[index].AccountName = suggestion;
    newData[index].showSuggestions = false;
    setData(newData);
  };

  const handleBlur = (index) => {
    setTimeout(() => {
      const newData = [...data];
      newData[index].showSuggestions = false;
      setData(newData);
    }, 200);
  };

  const handleAddRow = () => {
    setData([...data, { ...initialRow }]);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Saved data:', data);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    setData([{ ...initialRow, AccountName: '3 STAR AUTO SWABI', Balance: 0 }]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg"
    >
      <motion.h1 
        className="text-2xl font-bold mb-6 text-blue-600"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.1 }}
      >
        Cash Payment
      </motion.h1>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-y-auto h-[300px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {data.map((row, index) => {
                  const filteredSuggestions = accountOptions.filter(option =>
                    option.toLowerCase().includes(row.AccountName.toLowerCase()) &&
                    row.AccountName !== ''
                  );

                  return (
                    <motion.tr 
                      key={index} 
                      className="hover:bg-gray-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {columns.map((col) => (
                        <td key={col} className="px-6 py-4 whitespace-nowrap relative">
                          {col === 'AccountName' ? (
                            <div className="relative">
                              <motion.input
                                type="text"
                                placeholder="Enter account name"
                                className={`w-full border-2 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                  row.AccountName ? 'border-blue-300' : 'border-gray-300'
                                }`}
                                value={row.AccountName}
                                onChange={(e) =>
                                  handleCellChange(index, col, e.target.value)
                                }
                                onFocus={() => {
                                  const newData = [...data];
                                  newData[index].showSuggestions = true;
                                  setData(newData);
                                }}
                                onBlur={() => handleBlur(index)}
                                whileHover={{ scale: 1.01 }}
                              />
                              <AnimatePresence>
                                {row.showSuggestions && filteredSuggestions.length > 0 && (
                                  <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute z-10 bg-white border border-gray-200 w-full max-h-40 overflow-y-auto mt-1 rounded-lg shadow-lg"
                                  >
                                    {filteredSuggestions.map((suggestion, sIndex) => (
                                      <motion.li
                                        key={sIndex}
                                        className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                        onClick={() =>
                                          handleSuggestionClick(index, suggestion)
                                        }
                                        whileHover={{ backgroundColor: '#f0f7ff' }}
                                      >
                                        {suggestion}
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <motion.input
                              type={col === 'Balance' || col === 'Amount' ? 'number' : 'text'}
                              className={`w-full border-2 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                row[col] ? 'border-blue-300' : 'border-gray-300'
                              }`}
                              value={row[col]}
                              onChange={(e) => handleCellChange(index, col, e.target.value)}
                              whileHover={{ scale: 1.01 }}
                              placeholder={col === 'Amount' ? '0.00' : ''}
                            />
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <motion.button
          onClick={handleAddRow}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 transition-all"
        >
          Add New Row
        </motion.button>
        
        <motion.button
          onClick={handleSave}
          disabled={isSubmitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md transition-all flex items-center justify-center ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
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
            'Save Payment'
          )}
        </motion.button>
        
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition-all"
        >
          Reset
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
              <span className="font-medium">Payment Saved Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CashPayment;