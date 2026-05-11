"use client"

import { usePlayerStore } from "../layout"
import { Link2, CreditCard, ShieldAlert } from "lucide-react"

const paymentMethods =[
  { method: "Pix", totalIn: 12000, totalOut: 15000, countIn: 45, countOut: 8, first: "15 Jan 2023", last: "10 May 2026" },
  { method: "Crypto (USDT)", totalIn: 1633, totalOut: 2137, countIn: 12, countOut: 1, first: "01 Mar 2024", last: "09 May 2026" }
]

const linkedAccounts =[
  { id: "8481209", matchType: "Exact Match", value: "romego99", risk: "High", status: "Open" },
  { id: "1029384", matchType: "IP Address", value: "192.168.1.45", risk: "Medium", status: "Lock - Multi Account" },
  { id: "5581290", matchType: "Device FP", value: "fp_8x99a", risk: "High", status: "Lock - Fraud" }
]

export default function RpfPage() {
  const { darkMode } = usePlayerStore()

  return (
    <div className="space-y-4">
      <div className={`rounded-xl p-4 border shadow-sm ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          <CreditCard className="w-4 h-4 text-indigo-400" /> Payment Table (Methods & Dynamics)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className={`uppercase text-[9px] ${darkMode ? 'text-slate-500 bg-slate-700/30' : 'text-gray-500 bg-gray-50'}`}>
              <tr>
                <th className="p-2 font-semibold">Method</th>
                <th className="p-2 font-semibold text-right">Total In (Count)</th>
                <th className="p-2 font-semibold text-right">Total Out (Count)</th>
                <th className="p-2 font-semibold text-center">First Used</th>
                <th className="p-2 font-semibold text-center">Last Used</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-slate-700/50' : 'divide-gray-100'}`}>
              {paymentMethods.map((pm, i) => (
                <tr key={i} className={darkMode ? 'hover:bg-slate-700/20' : 'hover:bg-gray-50'}>
                  <td className="p-2 font-medium">{pm.method}</td>
                  <td className="p-2 text-right text-emerald-500">{pm.totalIn} BRL <span className="text-slate-500">({pm.countIn})</span></td>
                  <td className="p-2 text-right text-red-500">{pm.totalOut} BRL <span className="text-slate-500">({pm.countOut})</span></td>
                  <td className="p-2 text-center text-slate-400">{pm.first}</td>
                  <td className="p-2 text-center text-slate-400">{pm.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`rounded-xl p-4 border shadow-sm ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          <Link2 className="w-4 h-4 text-amber-400" /> Linked Accounts (Connections)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className={`uppercase text-[9px] ${darkMode ? 'text-slate-500 bg-slate-700/30' : 'text-gray-500 bg-gray-50'}`}>
              <tr>
                <th className="p-2 font-semibold">Linked Player ID</th>
                <th className="p-2 font-semibold">Match Type</th>
                <th className="p-2 font-semibold">Matched Value</th>
                <th className="p-2 font-semibold">Risk Level</th>
                <th className="p-2 font-semibold">Linked Acc Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-slate-700/50' : 'divide-gray-100'}`}>
              {linkedAccounts.map((acc, i) => (
                <tr key={i} className={darkMode ? 'hover:bg-slate-700/20' : 'hover:bg-gray-50'}>
                  <td className="p-2 font-mono text-indigo-400 cursor-pointer hover:underline">{acc.id}</td>
                  <td className="p-2">{acc.matchType}</td>
                  <td className="p-2 font-mono text-slate-300">{acc.value}</td>
                  <td className="p-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] ${acc.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{acc.risk}</span>
                  </td>
                  <td className="p-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] ${acc.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{acc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
