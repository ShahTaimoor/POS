import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="fixed sm:mt-0 top-0 left-0 right-0 bg-white/30 backdrop-blur-md ring-1 ring-white/10 shadow-md z-30 px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      
      {/* Left: Brand + Menu icon */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="flex items-center gap-3">
          <button className="text-gray-600 lg:hidden">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-800 pl-3 sm:pl-0">POS ZARYAB</h2>
        </div>
      </div>

      {/* Right: Navigation buttons */}
      <div className=" hidden sm:flex  flex-wrap gap-2">
        <button
          onClick={() => handleNavigate('/')}
          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigate('/purchase')}
          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Purchase
        </button>
        <button
          onClick={() => handleNavigate('/cashrecipt')}
          className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          Cash Receipt
        </button>
        <button
          onClick={() => handleNavigate('/cashpayment')}
          className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Cash Payment
        </button>
        <button
          onClick={() => handleNavigate('/bankrecipt')}
          className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          Bank Receipt
        </button>
        <button
          onClick={() => handleNavigate('/bankpayment')}
          className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Bank Payment
        </button>
        <button
          onClick={() => handleNavigate('/register-sale')}
          className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          Register Sale
        </button>
      </div>
    </div>
  );
};

export default Navbar;
