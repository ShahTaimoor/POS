import React, { useState } from 'react';

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
    }, 150);
  };

  const handleSave = () => {
    const updated = data.map((row) => ({
      ...row,
      Balance: row.PreviousBalance - row.Amount
    }));
    setData(updated);
    alert('Balances updated.');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Cash Receipt</h2>

      <div className="w-full overflow-x-auto border border-gray-200 rounded">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {allColumns.map((col) => (
                <th key={col} className="px-3 py-2 text-left font-semibold text-gray-700">
                  <div>{col}</div>
                  <input
                    type="text"
                    value={filters[col]}
                    onChange={(e) => handleFilterChange(col, e.target.value)}
                    placeholder={`Filter ${col}`}
                    className="mt-1 w-full border rounded px-2 py-1 text-xs"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const filteredSuggestions = accountOptions.filter(
                (name) =>
                  name.toLowerCase().includes(row.AccountName.toLowerCase()) &&
                  row.AccountName !== ''
              );

              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2 relative">
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
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                    {row.showSuggestions && filteredSuggestions.length > 0 && (
                      <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-y-auto shadow text-sm">
                        {filteredSuggestions.map((suggestion, sIndex) => (
                          <li
                            key={sIndex}
                            className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSelectSuggestion(index, suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-3 py-2">{row.Balance}</td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.Particular}
                      onChange={(e) => handleFieldChange(index, 'Particular', e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={row.Amount}
                      onChange={(e) => handleFieldChange(index, 'Amount', e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save & Update Balance
      </button>
    </div>
  );
};

export default CashReceipt;
