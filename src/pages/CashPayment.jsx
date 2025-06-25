import React, { useState } from 'react';

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
    }, 100); // Delay to allow click to register
  };

  const handleAddRow = () => {
    setData([...data, { ...initialRow }]);
  };

  const handleSave = () => {
    console.log('Saved data:', data);
    alert('Data saved successfully!');
  };

  const handleReset = () => {
    setData([{ ...initialRow }]);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cash Payment</h1>

      <div className="overflow-x-auto h-[300px] bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => {
              const filteredSuggestions = accountOptions.filter(option =>
                option.toLowerCase().includes(row.AccountName.toLowerCase()) &&
                row.AccountName !== ''
              );

              return (
                <tr key={index} className="relative">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-3 whitespace-nowrap relative">
                      {col === 'AccountName' ? (
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter account name"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
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
                          />
                          {row.showSuggestions && filteredSuggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-40 overflow-y-auto mt-1 rounded shadow">
                              {filteredSuggestions.map((suggestion, sIndex) => (
                                <li
                                  key={sIndex}
                                  className="px-2 py-1 text-sm hover:bg-blue-100 cursor-pointer"
                                  onClick={() =>
                                    handleSuggestionClick(index, suggestion)
                                  }
                                >
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <input
                          type={col === 'Balance' || col === 'Amount' ? 'number' : 'text'}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          value={row[col]}
                          onChange={(e) => handleCellChange(index, col, e.target.value)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button
          onClick={handleAddRow}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add New Row
        </button>
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CashPayment;
