import React, { useState } from 'react';

const Home = () => {
  const bankReceipts = [
    { name: 'Ali', description: 'Invoice #123', price: 2000 },
    { name: 'Sara', description: 'Payment for goods', price: 1500 },
    { name: 'John', description: 'Service Fee', price: 3500 },
  ];
  const bankPayments = [
    { name: 'Ahmad', description: 'Loan Repayment', price: 1000 },
    { name: 'Zara', description: 'Equipment Purchase', price: 1200 },
  ];
  const cashReceipts = [
    { name: 'Nadia', description: 'Cash Sale', price: 5000 },
    { name: 'Tom', description: 'Deposit', price: 2500 },
  ];
  const cashPayments = [
    { name: 'David', description: 'Office Rent', price: 1800 },
    { name: 'Emma', description: 'Supplies', price: 2200 },
  ];

  const [dateFilters, setDateFilters] = useState({ from: '', to: '' });

  const handleDateChange = (field, value) => {
    setDateFilters((prev) => ({ ...prev, [field]: value }));
  };

  const sum = (arr) => arr.reduce((acc, item) => acc + Number(item.price), 0);

  const [modalData, setModalData] = useState(null);

  const stats = [
    { title: 'Bank Receipts', data: bankReceipts },
    { title: 'Bank Payments', data: bankPayments },
    { title: 'Cash Receipts', data: cashReceipts },
    { title: 'Cash Payments', data: cashPayments },
  ];

  const openModal = (stat) => setModalData(stat);
  const closeModal = () => setModalData(null);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white p-6 min-h-screen">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-700">Transaction Summary</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div>
            <label className="block text-sm text-gray-600">From:</label>
            <input
              type="date"
              value={dateFilters.from}
              onChange={(e) => handleDateChange('from', e.target.value)}
              className="border rounded px-2 py-1 text-sm bg-white/30 backdrop-blur-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">To:</label>
            <input
              type="date"
              value={dateFilters.to}
              onChange={(e) => handleDateChange('to', e.target.value)}
              className="border rounded px-2 py-1 text-sm bg-white/30 backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/30 backdrop-blur-md ring-1 ring-white/40 shadow-lg rounded-lg p-6 text-gray-800"
          >
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <div className="flex justify-between items-end mt-2">
              <p className="text-2xl font-bold">${sum(stat.data).toLocaleString()}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50">
              <p className="text-gray-600 text-xs">
                <button
                  onClick={() => openModal(stat)}
                  className="text-blue-500 hover:underline"
                >
                  View All
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>

      
      {/* Modal */}
{modalData && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white/90 ring-1 ring-white/30 text-gray-800 rounded-lg p-6 w-full max-w-lg shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {modalData.title} - All Entries
        </h3>
        <button onClick={closeModal} className="text-red-500 text-sm">
          Close
        </button>
      </div>
      <p className="text-sm font-semibold mb-2">
        Total: ${sum(modalData.data).toLocaleString()}
      </p>
      <ul className="space-y-2 max-h-60 overflow-y-auto text-sm">
        <li className="grid grid-cols-3 font-semibold text-gray-700 border-b pb-1">
          <span>Name</span>
          <span>Description</span>
          <span className="text-right">Price</span>
        </li>
        {modalData.data.map((item, idx) => (
          <li
            key={idx}
            className="grid grid-cols-3 border-b py-1 text-gray-800 items-center"
          >
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span className="text-right font-medium">${item.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
