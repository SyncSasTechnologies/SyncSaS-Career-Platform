import React, { useState } from 'react';

export default function EvaluationPage() {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [rating, setRating] = useState(0);

  const pendingEvaluations = [
    { id: 1, name: 'John Doe', program: 'STIP', daysOverdue: 2 },
    { id: 2, name: 'Jane Smith', program: 'STIP', daysOverdue: 0 },
    { id: 3, name: 'Bob Johnson', program: 'STIP', daysOverdue: 5 },
  ];

  return (
    <div className="evaluation-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Evaluations</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Pending Evaluations ({pendingEvaluations.length})</h2>
            <div className="space-y-3">
              {pendingEvaluations.map(eval => (
                <button
                  key={eval.id}
                  onClick={() => setSelectedIntern(eval)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedIntern?.id === eval.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold">{eval.name}</p>
                  <p className="text-xs text-gray-600">{eval.program}</p>
                  {eval.daysOverdue > 0 && (
                    <p className="text-xs text-red-600 mt-1">⚠ {eval.daysOverdue} days overdue</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Evaluation Form */}
          <div className="lg:col-span-2">
            {selectedIntern ? (
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6">Evaluate {selectedIntern.name}</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">Technical Skills</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Communication</label>
                    <select className="w-full border rounded-lg px-4 py-2">
                      <option>Select rating...</option>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Professionalism</label>
                    <select className="w-full border rounded-lg px-4 py-2">
                      <option>Select rating...</option>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Overall Comments</label>
                    <textarea
                      rows="4"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Provide feedback for the intern..."
                    ></textarea>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">
                      Save Draft
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                      Submit Evaluation
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600">Select an intern to begin evaluation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
