import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0  right-0 bg-white/30 backdrop-blur-md ring-1 ring-white/10 shadow-md z-30 p-4 flex items-center justify-between">
      {/* Left: Menu button & Title */}
      <div className="flex items-center">
        <button className="mr-4 text-gray-600 lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
      </div>

      {/* Right: Notification & Avatar */}
      <div >
        <h2 className="text-xl font-semibold text-gray-800">POS ZARYAB</h2>
      </div>
    </div>
  );
};

export default Navbar;
