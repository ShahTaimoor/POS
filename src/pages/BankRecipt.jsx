import React, { useState } from 'react';

const BankRecipt = () => {
  const bankOptions = [
    'HBL',
    'UBL',
    'MCB',
    'Allied Bank',
    'Bank Alfalah',
    'Meezan Bank',
    'National Bank of Pakistan'
  ];

  const customerOptions = [
    'Ali Autos',
    'Ahmed Traders',
    'CarPoint Lahore',
    'AutoZone Karachi',
    'Bilal & Co.',
    'Mehran Autos'
  ];

  const [bankName, setBankName] = useState('');
  const [showBankSuggestions, setShowBankSuggestions] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    previousBalance: '5000', // fixed dummy balance (can be made dynamic later)
    description: '',
    amount: ''
  });

  const handleBankChange = (e) => {
    setBankName(e.target.value);
    setShowBankSuggestions(true);
  };

  const handleCustomerChange = (e) => {
    setCustomerName(e.target.value);
    setShowCustomerSuggestions(true);
  };

  const handleBankSelect = (name) => {
    setBankName(name);
    setShowBankSuggestions(false);
  };

  const handleCustomerSelect = (name) => {
    setCustomerName(name);
    setShowCustomerSuggestions(false);
  };

  const handleBlur = (field) => {
    setTimeout(() => {
      if (field === 'bank') setShowBankSuggestions(false);
      else if (field === 'customer') setShowCustomerSuggestions(false);
    }, 100);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const receiptData = {
      bankName,
      customerName,
      ...formData
    };
    console.log('Saved Receipt Data:', receiptData);
    alert('Receipt saved successfully!');
  };

  const filteredBanks = bankOptions.filter(
    (bank) =>
      bank.toLowerCase().includes(bankName.toLowerCase()) && bankName !== ''
  );

  const filteredCustomers = customerOptions.filter(
    (customer) =>
      customer.toLowerCase().includes(customerName.toLowerCase()) &&
      customerName !== ''
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bank Receipt</h1>

      {/* Bank Name Input with Suggestions */}
      <div className="mb-6 relative">
        <label className="block mb-1 font-medium text-gray-700">Bank Name</label>
        <input
          type="text"
          value={bankName}
          onChange={handleBankChange}
          onFocus={() => setShowBankSuggestions(true)}
          onBlur={() => handleBlur('bank')}
          placeholder="Enter or select bank name"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {showBankSuggestions && filteredBanks.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-y-auto shadow">
            {filteredBanks.map((bank, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleBankSelect(bank)}
              >
                {bank}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Customer Name Input with Suggestions */}
      <div className="mb-6 relative">
        <label className="block mb-1 font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={handleCustomerChange}
          onFocus={() => setShowCustomerSuggestions(true)}
          onBlur={() => handleBlur('customer')}
          placeholder="Enter or select customer name"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {showCustomerSuggestions && filteredCustomers.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-y-auto shadow">
            {filteredCustomers.map((customer, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleCustomerSelect(customer)}
              >
                {customer}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Remaining Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Previous Balance</label>
          <input
            type="number"
            value={formData.previousBalance}
            disabled
            className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter amount"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter description"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default BankRecipt;
