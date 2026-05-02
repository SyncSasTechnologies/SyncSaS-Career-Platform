import React from 'react';

export default function TaskCard({ task, onComplete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{task.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
        <button
          onClick={onComplete}
          className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition"
        >
          {task.completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}
