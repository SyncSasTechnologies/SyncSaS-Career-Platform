import React, { useState } from 'react';

export default function InternsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const interns = [
    { id: 1, name: 'John Doe', email: 'john@example.com', program: 'STIP', status: 'active', progress: 75 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', program: 'STIP', status: 'active', progress: 60 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', program: 'STIP', status: 'completed', progress: 100 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', program: 'STIP', status: 'active', progress: 45 },
  ];

  const filtered = interns.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="interns-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Interns</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Interns Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Program</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(intern => (
                <tr key={intern.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{intern.name}</td>
                  <td className="px-6 py-4 text-gray-600">{intern.email}</td>
                  <td className="px-6 py-4">{intern.program}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      intern.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${intern.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{intern.progress}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No interns found</p>
          </div>
        )}
      </div>
    </div>
  );
}
