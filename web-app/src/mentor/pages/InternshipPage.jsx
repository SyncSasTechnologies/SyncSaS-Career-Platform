import React, { useState } from 'react';

export default function InternshipPage() {
  const [filter, setFilter] = useState('all');

  const internships = [
    { id: 1, title: 'Full Stack Development', company: 'TechCorp', status: 'active', interns: 3 },
    { id: 2, title: 'Product Design', company: 'DesignStudio', status: 'active', interns: 2 },
    { id: 3, title: 'Data Science', company: 'DataInc', status: 'completed', interns: 5 },
  ];

  const filtered = filter === 'all' ? internships : internships.filter(i => i.status === filter);

  return (
    <div className="internship-page">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Internships</h1>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Create New
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`pb-2 px-4 capitalize font-medium ${
                filter === f ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(internship => (
            <div key={internship.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">{internship.title}</h3>
              <p className="text-gray-600 mb-4">{internship.company}</p>
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  internship.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {internship.status}
                </span>
                <span className="text-sm text-gray-600">{internship.interns} interns</span>
              </div>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
