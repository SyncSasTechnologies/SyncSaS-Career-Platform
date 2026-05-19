import React from 'react';

export default function MentorDashboard() {
  return (
    <div className="mentor-dashboard">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mentor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Interns</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Pending Evaluations</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold">$0</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <p className="font-semibold">My Interns</p>
              <p className="text-sm text-gray-600">View and manage interns</p>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <p className="font-semibold">Evaluations</p>
              <p className="text-sm text-gray-600">Complete evaluations</p>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <p className="font-semibold">Analytics</p>
              <p className="text-sm text-gray-600">View performance data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
