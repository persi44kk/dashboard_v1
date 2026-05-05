"use client"

import { useTheme } from "../layout"

export default function FlagsPage() {
  const { darkMode } = useTheme()

  const flags = [
    { type: "High Velocity", severity: "high", description: "Multiple transactions in short timeframe", triggered: "2 hours ago", active: true },
    { type: "New Device", severity: "medium", description: "Login from unrecognized device", triggered: "5 hours ago", active: true },
    { type: "Large Withdrawal", severity: "high", description: "Withdrawal exceeds typical amount", triggered: "2 hours ago", active: true },
    { type: "VPN Detected", severity: "low", description: "Connection via VPN service", triggered: "1 day ago", active: false },
    { type: "Document Mismatch", severity: "medium", description: "Name discrepancy in documents", triggered: "3 days ago", active: false },
  ]

  const activeFlags = flags.filter(f => f.active)
  const resolvedFlags = flags.filter(f => !f.active)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Active Flags</div>
          <div className="text-3xl font-bold text-red-400">{activeFlags.length}</div>
        </div>
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Resolved</div>
          <div className="text-3xl font-bold text-emerald-400">{resolvedFlags.length}</div>
        </div>
        <div className={`rounded-2xl p-5 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Risk Level</div>
          <div className="text-3xl font-bold text-amber-400">Medium</div>
        </div>
      </div>

      {/* Active Flags */}
      <div className={`rounded-2xl overflow-hidden transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Active Flags
          </h3>
        </div>

        <div className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
          {activeFlags.map((flag, idx) => (
            <div key={idx} className={`p-4 transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    flag.severity === 'high' ? 'bg-red-500/20' : flag.severity === 'medium' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      flag.severity === 'high' ? 'text-red-400' : flag.severity === 'medium' ? 'text-amber-400' : 'text-blue-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{flag.type}</div>
                    <div className="text-sm text-gray-500">{flag.description}</div>
                    <div className="text-xs text-gray-600 mt-1">Triggered {flag.triggered}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    flag.severity === 'high' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : flag.severity === 'medium'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {flag.severity.charAt(0).toUpperCase() + flag.severity.slice(1)}
                  </span>
                  <button className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${darkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resolved Flags */}
      <div className={`rounded-2xl overflow-hidden transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Resolved Flags
          </h3>
        </div>

        <div className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
          {resolvedFlags.map((flag, idx) => (
            <div key={idx} className={`p-4 opacity-60 transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-500/20`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{flag.type}</div>
                    <div className="text-sm text-gray-500">{flag.description}</div>
                    <div className="text-xs text-gray-600 mt-1">Resolved {flag.triggered}</div>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Resolved
                </span>
              </div>
            </div>
          ))}
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
