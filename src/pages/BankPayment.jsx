import React, { useState } from 'react';

const BankPayment = () => {
  const bankOptions = ['HBL', 'UBL', 'MCB', 'Allied Bank', 'Bank Alfalah', 'Meezan Bank', 'National Bank of Pakistan'];
  const customerOptions = ['Ali Autos', 'Ahmed Traders', 'CarPoint Lahore', 'AutoZone Karachi', 'Bilal & Co.', 'Mehran Autos'];

  const [bankName, setBankName] = useState('');
  const [showBankSuggestions, setShowBankSuggestions] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    previousBalance: '5000', // dummy static value
    amount: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const previousBalance = Number(formData.previousBalance);
  const amount = Number(formData.amount || 0);
  const newBalance = previousBalance - amount;

  const validate = () => {
    const newErrors = {};
    if (!bankName) newErrors.bankName = 'Bank name is required';
    if (!customerName) newErrors.customerName = 'Customer name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const paymentData = {
      bankName,
      customerName,
      previousBalance: formData.previousBalance,
      amount: formData.amount,
      newBalance,
      description: formData.description
    };

    console.log('Saved Bank Payment Data:', paymentData);
    alert('Bank payment saved successfully!');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filteredBanks = bankOptions.filter(bank =>
    bank.toLowerCase().includes(bankName.toLowerCase()) && bankName !== ''
  );

  const filteredCustomers = customerOptions.filter(c =>
    c.toLowerCase().includes(customerName.toLowerCase()) && customerName !== ''
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bank Payment</h1>

      {/* Bank Name */}
      <div className="mb-4 relative">
        <label className="block font-medium">Bank Name</label>
        <input
          type="text"
          value={bankName}
          onChange={(e) => { setBankName(e.target.value); setShowBankSuggestions(true); }}
          onFocus={() => setShowBankSuggestions(true)}
          onBlur={() => setTimeout(() => setShowBankSuggestions(false), 100)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter or select bank"
        />
        {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
        {showBankSuggestions && filteredBanks.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded w-full max-h-40 mt-1 overflow-y-auto shadow">
            {filteredBanks.map((bank, i) => (
              <li
                key={i}
                onClick={() => { setBankName(bank); setShowBankSuggestions(false); }}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {bank}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Customer Name */}
      <div className="mb-4 relative">
        <label className="block font-medium">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => { setCustomerName(e.target.value); setShowCustomerSuggestions(true); }}
          onFocus={() => setShowCustomerSuggestions(true)}
          onBlur={() => setTimeout(() => setShowCustomerSuggestions(false), 100)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter or select customer"
        />
        {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        {showCustomerSuggestions && filteredCustomers.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded w-full max-h-40 mt-1 overflow-y-auto shadow">
            {filteredCustomers.map((cust, i) => (
              <li
                key={i}
                onClick={() => { setCustomerName(cust); setShowCustomerSuggestions(false); }}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {cust}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Previous Balance</label>
          <input
            type="number"
            value={formData.previousBalance}
            disabled
            className="w-full bg-gray-100 text-gray-700 border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium">New Balance (Auto-Calculated)</label>
          <input
            type="number"
            value={newBalance >= 0 ? newBalance : 0}
            disabled
            className="w-full bg-gray-100 text-gray-700 border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Payment
        </button>
      </div>
    </div>
  );
};

export default BankPayment;
