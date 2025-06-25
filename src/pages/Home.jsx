import React, { useState } from 'react';

const Home = () => {
  const bankReceipts = [{ amount: 2000 }, { amount: 1500 }, { amount: 3500 }];
  const bankPayments = [{ amount: 1000 }, { amount: 1200 }];
  const cashReceipts = [{ amount: 5000 }, { amount: 2500 }];
  const cashPayments = [{ amount: 1800 }, { amount: 2200 }];

  const [dateFilters, setDateFilters] = useState({ from: '', to: '' });

  const handleDateChange = (field, value) => {
    setDateFilters((prev) => ({ ...prev, [field]: value }));
  };

  const sum = (arr) => arr.reduce((acc, item) => acc + Number(item.amount), 0);

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
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">Transaction Summary</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div>
            <label className="block text-sm text-gray-600">From:</label>
            <input
              type="date"
              value={dateFilters.from}
              onChange={(e) => handleDateChange('from', e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">To:</label>
            <input
              type="date"
              value={dateFilters.to}
              onChange={(e) => handleDateChange('to', e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <div className="flex justify-between items-end mt-2">
              <p className="text-2xl font-bold">
                ${sum(stat.data).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-xs">
                <button
                  onClick={() => openModal(stat)}
                  className="text-blue-500"
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
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{modalData.title} - All Entries</h3>
              <button onClick={closeModal} className="text-red-500 text-sm">
                Close
              </button>
            </div>
            <p className="text-sm font-semibold mb-2">
              Total: ${sum(modalData.data).toLocaleString()}
            </p>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {modalData.data.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b py-1 text-sm text-gray-700"
                >
                  Entry {idx + 1}: ${item.amount.toLocaleString()}
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
