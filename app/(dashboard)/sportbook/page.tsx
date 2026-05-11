"use client"

import { usePlayerStore } from "../layout"
import { Trophy, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

export default function SportbookPage() {
  const { darkMode, playerData, updatePlayerField } = usePlayerStore()

  const setVerdict = (status: string, text: string) => {
    updatePlayerField('departments', 'sportbook', { status, text })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Sport Stats */}
      <div className={`rounded-xl p-4 border shadow-sm ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          <Trophy className="w-4 h-4 text-blue-400" /> Sportbook Profile
        </h3>
        <div className="space-y-3 text-[11px]">
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Favorite Sport</span><span className="font-semibold text-blue-400">Football (Serie A)</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Total Bets</span><span className="font-mono">312</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Average Odds</span><span className="font-mono">1.85</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Arbitrage Risk</span><span className="font-mono text-amber-400">Medium</span>
          </div>
        </div>
      </div>

      {/* VERDICT PANEL */}
      <div className={`rounded-xl p-4 border shadow-sm flex flex-col ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>Set Department Verdict</h3>
        
        <div className="flex-1 flex flex-col justify-center gap-3">
          <button onClick={() => setVerdict('approved', 'Normal betting behavior')} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${playerData.departments.sportbook.status === 'approved' ? 'bg-emerald-500/20 border-emerald-500' : 'border-slate-700 hover:bg-slate-700/50'}`}>
            <span className="text-[11px] font-bold text-emerald-400">Approve Account</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </button>
          
          <button onClick={() => setVerdict('warning', 'Suspected arbitrage betting')} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${playerData.departments.sportbook.status === 'warning' ? 'bg-amber-500/20 border-amber-500' : 'border-slate-700 hover:bg-slate-700/50'}`}>
            <span className="text-[11px] font-bold text-amber-400">Mark as Suspicious</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </button>

          <button onClick={() => setVerdict('rejected', 'Confirmed arbitrage / Value betting')} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${playerData.departments.sportbook.status === 'rejected' ? 'bg-red-500/20 border-red-500' : 'border-slate-700 hover:bg-slate-700/50'}`}>
            <span className="text-[11px] font-bold text-red-400">Reject Account</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
