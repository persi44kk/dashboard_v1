"use client"

import { usePlayerStore } from "../layout"
import { Gamepad2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

export default function CasinoFraudPage() {
  const { darkMode, playerData, updatePlayerField } = usePlayerStore()

  const setVerdict = (status: string, text: string) => {
    updatePlayerField('departments', 'casino', { status, text })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Casino Stats */}
      <div className={`rounded-xl p-4 border shadow-sm ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          <Gamepad2 className="w-4 h-4 text-purple-400" /> Casino Activity Profile
        </h3>
        <div className="space-y-3 text-[11px]">
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Favorite Game</span><span className="font-semibold text-purple-400">Sweet Bonanza</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Total Spins</span><span className="font-mono">14,250</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Average Bet</span><span className="font-mono">25.00 BRL</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-slate-700 pb-1">
            <span className="text-slate-400">Estimated RTP</span><span className="font-mono text-emerald-400">96.5%</span>
          </div>
        </div>
      </div>

      {/* VERDICT PANEL */}
      <div className={`rounded-xl p-4 border shadow-sm flex flex-col ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>Set Department Verdict</h3>
        
        <div className="flex-1 flex flex-col justify-center gap-3">
          <button onClick={() => setVerdict('approved', 'Verified, normal slots activity')} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${playerData.departments.casino.status === 'approved' ? 'bg-emerald-500/20 border-emerald-500' : 'border-slate-700 hover:bg-slate-700/50'}`}>
            <span className="text-[11px] font-bold text-emerald-400">Approve Account</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </button>
          
          <button onClick={() => setVerdict('warning', 'Suspicious betting patterns')} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${playerData.departments.casino.status === 'warning' ? 'bg-amber-500/20 border-amber-500' : 'border-slate-700 hover:bg-slate-700/50'}`}>
            <span className="text-[11px] font-bold text-amber-400">Mark as Suspicious</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </button>

          <button onClick={() => setVerdict('rejected', 'Confirmed fraud / Bonus abuse')} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${playerData.departments.casino.status === 'rejected' ? 'bg-red-500/20 border-red-500' : 'border-slate-700 hover:bg-slate-700/50'}`}>
            <span className="text-[11px] font-bold text-red-400">Reject Account</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
