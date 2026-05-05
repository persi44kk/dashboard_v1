"use client"

import { useTheme } from "../layout"

export default function WorkflowPage() {
  const { darkMode } = useTheme()

  const cases = [
    { id: "CASE-001", type: "High Risk Withdrawal", status: "In Review", priority: "high", assignee: "Ana M.", created: "2 hours ago" },
    { id: "CASE-002", type: "Multiple Account Suspicion", status: "Pending", priority: "medium", assignee: "Carlos R.", created: "5 hours ago" },
    { id: "CASE-003", type: "Document Verification", status: "Awaiting Docs", priority: "low", assignee: "Unassigned", created: "1 day ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Open Cases</div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
        </div>
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">In Review</div>
          <div className="text-3xl font-bold text-amber-400">5</div>
        </div>
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Resolved Today</div>
          <div className="text-3xl font-bold text-emerald-400">8</div>
        </div>
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg. Resolution</div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>4.2h</div>
        </div>
      </div>

      {/* Cases Table */}
      <div className={`rounded-2xl overflow-hidden transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Active Cases</h3>
            <button className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${darkMode ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}>
              + New Case
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-left text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500 bg-white/[0.02]' : 'text-gray-400 bg-gray-50'}`}>
                <th className="px-6 py-4 font-medium">Case ID</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Assignee</th>
                <th className="px-6 py-4 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
              {cases.map((c) => (
                <tr key={c.id} className={`group transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-indigo-400">{c.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{c.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      c.status === 'In Review' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : c.status === 'Pending'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      c.priority === 'high' ? 'text-red-400' : c.priority === 'medium' ? 'text-amber-400' : 'text-gray-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        c.priority === 'high' ? 'bg-red-400' : c.priority === 'medium' ? 'bg-amber-400' : 'bg-gray-400'
                      }`} />
                      {c.priority.charAt(0).toUpperCase() + c.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${c.assignee === 'Unassigned' ? 'text-gray-500 italic' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {c.assignee}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{c.created}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
