import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CashReceipt = () => {
  const accountOptions = [
    'AUTO GALLERY ABBOTTABAD MEHMOOD MALIK',
    'ELECTRONICS EMPORIUM',
    'FURNITURE WORLD',
    'Ali Autos',
    'Ahmed Traders',
    'Mehran Autos'
  ];

  const [filters, setFilters] = useState({
    AccountName: '',
    Balance: '',
    Particular: '',
    Amount: ''
  });

  const [data, setData] = useState([
    {
      AccountName: 'AUTO GALLERY ABBOTTABAD MEHMOOD MALIK',
      Balance: 2330,
      Particular: 'Vehicle Sale',
      Amount: 150000,
      PreviousBalance: 152330,
      showSuggestions: false
    },
    {
      AccountName: 'ELECTRONICS EMPORIUM',
      Balance: 4500,
      Particular: 'Appliance Sale',
      Amount: 75000,
      PreviousBalance: 79500,
      showSuggestions: false
    },
    {
      AccountName: 'FURNITURE WORLD',
      Balance: 1200,
      Particular: 'Sofa Set',
      Amount: 120000,
      PreviousBalance: 121200,
      showSuggestions: false
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const allColumns = ['AccountName', 'Balance', 'Particular', 'Amount'];

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(row[key] || '').toLowerCase().includes(value.toLowerCase());
    })
  );

  const handleFieldChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = field === 'Amount' ? Number(value) : value;
    if (field === 'AccountName') newData[index].showSuggestions = true;
    setData(newData);
  };

  const handleSelectSuggestion = (index, suggestion) => {
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

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updated = data.map((row) => ({
      ...row,
      Balance: row.PreviousBalance - row.Amount
    }));
    
    setData(updated);
    setIsSaving(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white rounded-xl shadow-lg"
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-blue-600"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.1 }}
      >
        Cash Receipt
      </motion.h2>

      <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {allColumns.map((col) => (
                  <th 
                    key={col} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex flex-col"
                    >
                      <span>{col}</span>
                      <motion.input
                        type="text"
                        value={filters[col]}
                        onChange={(e) => handleFilterChange(col, e.target.value)}
                        placeholder={`Filter ${col}`}
                        className="mt-1 w-full border-2 border-gray-200 rounded-lg px-3 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        whileFocus={{ borderColor: "#3b82f6" }}
                      />
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredData.map((row, index) => {
                  const filteredSuggestions = accountOptions.filter(
                    (name) =>
                      name.toLowerCase().includes(row.AccountName.toLowerCase()) &&
                      row.AccountName !== ''
                  );

                  return (
                    <motion.tr 
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                    >
                      <td className="px-6 py-4 relative">
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <input
                            type="text"
                            value={row.AccountName}
                            onChange={(e) => handleFieldChange(index, 'AccountName', e.target.value)}
                            onFocus={() => {
                              const newData = [...data];
                              newData[index].showSuggestions = true;
                              setData(newData);
                            }}
                            onBlur={() => handleBlur(index)}
                            placeholder="Type or select account"
                            className={`w-full border-2 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              row.AccountName ? 'border-blue-300' : 'border-gray-300'
                            }`}
                          />
                          <AnimatePresence>
                            {row.showSuggestions && filteredSuggestions.length > 0 && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 bg-white border border-gray-200 rounded-lg w-full mt-1 shadow-lg max-h-40 overflow-y-auto"
                              >
                                {filteredSuggestions.map((suggestion, sIndex) => (
                                  <motion.li
                                    key={sIndex}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm"
                                    onClick={() => handleSelectSuggestion(index, suggestion)}
                                    whileHover={{ backgroundColor: '#f0f7ff' }}
                                  >
                                    {suggestion}
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.div 
                          className="px-4 py-2 bg-gray-100 rounded-lg text-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          {row.Balance.toLocaleString()}
                        </motion.div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <input
                            type="text"
                            value={row.Particular}
                            onChange={(e) => handleFieldChange(index, 'Particular', e.target.value)}
                            className={`w-full border-2 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              row.Particular ? 'border-blue-300' : 'border-gray-300'
                            }`}
                          />
                        </motion.div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <input
                            type="number"
                            value={row.Amount}
                            onChange={(e) => handleFieldChange(index, 'Amount', e.target.value)}
                            className={`w-full border-2 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              row.Amount ? 'border-blue-300' : 'border-gray-300'
                            }`}
                          />
                        </motion.div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center space-x-4">
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md transition-all flex items-center ${
            isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            'Save & Update Balance'
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
              <span className="font-medium">Balances Updated Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CashReceipt;