import React from 'react';

export default function InternCard({ intern, onView }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">{intern.name}</h3>
          <p className="text-sm text-gray-600">{intern.position}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          intern.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {intern.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition"
              style={{ width: `${intern.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Started: {intern.startDate}</span>
          <span>Duration: {intern.duration}</span>
        </div>
      </div>

      <button
        onClick={onView}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        View Details
      </button>
    </div>
  );
}
