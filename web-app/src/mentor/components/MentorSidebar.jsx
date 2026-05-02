import React from 'react';

export default function MentorSidebar() {
  const menuItems = [
    { label: 'Dashboard', icon: '📊' },
    { label: 'Interns', icon: '👥' },
    { label: 'Internships', icon: '💼' },
    { label: 'Evaluations', icon: '📋' },
    { label: 'Earnings', icon: '💰' },
    { label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="mentor-sidebar bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mentor Portal</h1>
      </div>
      
      <nav className="space-y-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
