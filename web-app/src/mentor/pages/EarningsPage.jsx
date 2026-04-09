import React, { useState } from 'react';

export default function EarningsPage() {
  const [period, setPeriod] = useState('month');

  const earningsData = {
    totalEarnings: 4500,
    pendingPayment: 1200,
    lastPayment: 2000,
    lastPaymentDate: '2026-02-07',
    transactions: [
      { id: 1, date: '2026-02-10', type: 'Mentor Session', amount: 150, status: 'completed' },
      { id: 2, date: '2026-02-09', type: 'Evaluation', amount: 100, status: 'completed' },
      { id: 3, date: '2026-02-08', type: 'Mentoring', amount: 200, status: 'pending' },
      { id: 4, date: '2026-02-07', type: 'Workshop', amount: 300, status: 'completed' },
    ]
  };

  return (
    <div className="earnings-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Earnings</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">${earningsData.totalEarnings}</p>
            <p className="text-xs text-gray-500 mt-2">Lifetime</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Pending Payment</h3>
            <p className="text-3xl font-bold text-yellow-600">${earningsData.pendingPayment}</p>
            <p className="text-xs text-gray-500 mt-2">To be paid</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Last Payment</h3>
            <p className="text-2xl font-bold">${earningsData.lastPayment}</p>
            <p className="text-xs text-gray-500 mt-2">{earningsData.lastPaymentDate}</p>
          </div>
        </div>

        {/* Earnings Chart Placeholder */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Earnings Chart</h2>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Chart will be displayed here</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Transaction History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4 font-medium">{transaction.type}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">${transaction.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
