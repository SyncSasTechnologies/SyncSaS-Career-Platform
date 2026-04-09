import React from 'react';

export default function MentorHeader() {
  return (
    <div className="mentor-header bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Mentor Dashboard</h2>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <p className="text-sm font-semibold">Mentor</p>
                <p className="text-xs text-gray-600">Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
