"use client"

import { useTheme } from "../layout"

export default function AccountHistoryPage() {
  const { darkMode } = useTheme()

  return (
    <div className="space-y-6">
      {/* Activity Timeline */}
      <div className={`rounded-2xl p-6 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h3 className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recent Activity Flow</h3>
        <div className="flex items-start justify-between">
          {/* Login */}
          <div className="flex flex-col items-center relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login</span>
            <span className="text-xs text-gray-500">14:32</span>
          </div>

          {/* Connector */}
          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-500 mt-6 mx-2 rounded-full opacity-50" />

          {/* Deposit */}
          <div className="flex flex-col items-center relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Deposit</span>
            <span className="text-xs text-gray-500">14:35</span>
          </div>

          {/* Connector */}
          <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 via-purple-500 to-purple-500 mt-6 mx-2 rounded-full opacity-50" />

          {/* Bet */}
          <div className="flex flex-col items-center relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bet</span>
            <span className="text-xs text-gray-500">14:42</span>
          </div>

          {/* Connector */}
          <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 via-amber-500 to-amber-500 mt-6 mx-2 rounded-full opacity-50" />

          {/* Withdrawal */}
          <div className="flex flex-col items-center relative">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-2 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50 ring-offset-2 ${darkMode ? 'ring-offset-gray-900' : 'ring-offset-white'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-amber-400">Withdrawal</span>
            <span className="text-xs text-amber-400/70">PENDING</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`rounded-2xl overflow-hidden transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Transaction History
            </h3>
            <div className="flex items-center gap-2">
              <button className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${darkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-left text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500 bg-white/[0.02]' : 'text-gray-400 bg-gray-50'}`}>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
              <tr className={`group transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today, 14:47</div>
                  <div className="text-xs text-gray-500">2 minutes ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-amber-400 text-sm font-medium">Withdrawal</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-xs text-cyan-400">B</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Crypto (BTC)</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-red-400 font-mono font-medium">-R$ 2,500.00</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Pending
                  </span>
                </td>
              </tr>
              <tr className={`group transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today, 14:35</div>
                  <div className="text-xs text-gray-500">14 minutes ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-emerald-400 text-sm font-medium">Deposit</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-400">P</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pix</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-emerald-400 font-mono font-medium">+R$ 3,000.00</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </span>
                </td>
              </tr>
              <tr className={`group transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Yesterday, 19:22</div>
                  <div className="text-xs text-gray-500">19 hours ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-amber-400 text-sm font-medium">Withdrawal</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-400">P</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pix</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-red-400 font-mono font-medium">-R$ 1,000.00</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </span>
                </td>
              </tr>
              <tr className={`group transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Yesterday, 18:05</div>
                  <div className="text-xs text-gray-500">21 hours ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-emerald-400 text-sm font-medium">Deposit</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-xs text-cyan-400">U</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Crypto (USDT)</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-emerald-400 font-mono font-medium">+R$ 5,000.00</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </span>
                </td>
              </tr>
              <tr className={`group transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Jan 15, 2025</div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-amber-400 text-sm font-medium">Withdrawal</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-400">P</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pix</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-red-400 font-mono font-medium">-R$ 800.00</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Rejected
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <span className="text-sm text-gray-500">Showing 5 of 48 transactions</span>
          <div className="flex items-center gap-1">
            <button className={`p-2 rounded-lg text-gray-400 transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className={`w-8 h-8 rounded-lg text-sm font-medium ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>1</button>
            <button className={`w-8 h-8 rounded-lg text-gray-400 text-sm font-medium transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
              2
            </button>
            <button className={`w-8 h-8 rounded-lg text-gray-400 text-sm font-medium transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
              3
            </button>
            <span className="text-gray-500 px-2">...</span>
            <button className={`w-8 h-8 rounded-lg text-gray-400 text-sm font-medium transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
              10
            </button>
            <button className={`p-2 rounded-lg text-gray-400 transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}
