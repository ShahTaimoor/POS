import React, { useState } from 'react';

const Home = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Example static data — ideally you'd filter this via backend API with fromDate & toDate
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

  const handleFilter = () => {
    console.log('Filtering from', fromDate, 'to', toDate);
    // You can send fromDate and toDate to backend here
  };

  return (
    <div className="p-4 sm:p-6">
  <div className="max-w-7xl mx-auto space-y-6">

    {/* Date Range Filters */}
    <div className="flex flex-col justify-center sm:flex-row sm:items-end gap-4">
      <div className="w-full sm:w-1/7">
        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-1/7">
        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-auto">
        <button
          onClick={handleFilter}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid sm:w-[700px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`border p-4 rounded-lg ${
            stat.value === 0
              ? ''
              : stat.title.includes('Receipt') || stat.title === 'Sale'
              ? 'border-green-500'
              : stat.title.includes('Payment') || stat.title === 'Expense'
              ? 'border-red-500'
              : 'border-blue-500'
          }`}
        >
          <h3 className="text-sm font-medium text-center text-gray-600">{stat.title}</h3>
          <p
            className={`text-2xl text-center font-semibold mt-2 ${
              stat.value === 0
                ? 'text-gray-500'
                : stat.title.includes('Receipt') || stat.title === 'Sale'
                ? 'text-green-600'
                : stat.title.includes('Payment') || stat.title === 'Expense'
                ? 'text-red-600'
                : 'text-blue-600'
            }`}
          >
            {stat.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Home;
