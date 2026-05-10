"use client"

import { useState } from "react"
import { usePlayerStore } from "../layout"
import { 
  ArrowDownRight, ArrowUpRight, Gamepad2, Trophy, 
  ChevronDown, ChevronUp, Ticket, CreditCard, Banknote
} from "lucide-react"

// --- МОКОВЫЕ ДАННЫЕ ---
const summaryData = {
  hold: { value: -4804.02, percent: "-35.24%" },
  balance: 1300.04,
  frozen: 1300.00,
  available: 0.04,
  stakes: { count: 0, value: 0.00 },
  wins: { count: 0, value: 0.00 },
  sportProfit: 0.00,
  gameProfit: -4804.02,
  withdrawals: { count: 9, value: 17137.00 },
  deposits: { count: 57, value: 13633.00 },
  correctionTo: { count: 0, value: 0.00 },
  correctionFrom: { count: 0, value: 0.00 },
  totalBonus: 0.00,
  bonusDeposit: 0.00,
  leaderboard: 0.00,
  bonusEncash: 0.00,
  paymentFees: 515.52
}

const transactions =[
  {
    id: "tx_1", type: "withdrawal", date: "10 May 2026, 14:30",
    method: "Pix", amount: -1500.00, balanceBefore: 2800.04, balanceAfter: 1300.04, status: "Completed"
  },
  {
    id: "tx_2", type: "deposit", date: "09 May 2026, 09:15",
    method: "Crypto (USDT)", amount: 3000.00, bonusCode: "WELCOME100", balanceBefore: 1200.04, balanceAfter: 4200.04, status: "Completed"
  },
  {
    id: "tx_3", type: "sport", date: "08 May 2026, 20:45",
    betId: "SB-99214", event: "Real Madrid vs Bayern Munich", market: "1X2 (Real Madrid)", odds: 1.85, 
    amount: -1000.00, profit: 850.00, outcome: "win", balanceAfter: 1200.04
  },
  {
    id: "tx_4", type: "casino_group", date: "08 May 2026, 18:00 - 19:30",
    game: "Sweet Bonanza (Pragmatic)", totalBets: 45, totalAmount: -450.00, totalProfit: -450.00, outcome: "lose",
    sessionDetails:[
      { id: "sp_1", time: "19:28", amount: -10.00, profit: 0, outcome: "lose" },
      { id: "sp_2", time: "19:25", amount: -10.00, profit: 15.50, outcome: "win" },
      { id: "sp_3", time: "19:21", amount: -10.00, profit: 0, outcome: "lose" },
      // ... еще 42 спина скрыты для примера
    ]
  },
  {
    id: "tx_5", type: "sport", date: "07 May 2026, 15:10",
    betId: "SB-98822", event: "Lakers vs Celtics", market: "Total Over 210.5", odds: 1.90, 
    amount: -500.00, profit: -500.00, outcome: "lose", balanceAfter: 200.04
  }
]

export default function HistoryPage() {
  const { darkMode } = usePlayerStore()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) :[...prev, id])
  }

  // Хелпер для форматирования валюты
  const formatCur = (val: number) => `${val < 0 ? '-' : ''}${Math.abs(val).toLocaleString('en-US', {minimumFractionDigits: 2})} BRL`
  const colorCur = (val: number) => val > 0 ? "text-emerald-500" : val < 0 ? "text-red-500" : (darkMode ? "text-gray-400" : "text-gray-500")

  return (
    <div className="space-y-3">
      
      {/* ===== БЛОК SUMMARY ===== */}
      <div className={`rounded-xl p-3 border shadow-sm ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Banknote className="w-3.5 h-3.5" /> Financial Summary
        </h3>
        
        {/* Плотный Grid для данных */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          
          <div className={`p-2 rounded flex flex-col justify-center border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-[9px] uppercase text-gray-500 mb-0.5">Hold</span>
            <span className={`text-xs font-bold ${colorCur(summaryData.hold.value)}`}>{formatCur(summaryData.hold.value)}</span>
            <span className="text-[9px] text-gray-500">{summaryData.hold.percent}</span>
          </div>

          <div className={`p-2 rounded flex flex-col justify-center border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-[9px] uppercase text-gray-500 mb-0.5">Balance / Frozen</span>
            <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCur(summaryData.balance)}</span>
            <span className="text-[9px] text-amber-500">Fr: {formatCur(summaryData.frozen)}</span>
          </div>

          <div className={`p-2 rounded flex flex-col justify-center border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-[9px] uppercase text-gray-500 mb-0.5">Game Profit</span>
            <span className={`text-xs font-bold ${colorCur(summaryData.gameProfit)}`}>{formatCur(summaryData.gameProfit)}</span>
            <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sport: {formatCur(summaryData.sportProfit)}</span>
          </div>

          <div className={`p-2 rounded flex flex-col justify-center border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-[9px] uppercase text-gray-500 mb-0.5">Deposits ({summaryData.deposits.count})</span>
            <span className="text-xs font-bold text-emerald-500">{formatCur(summaryData.deposits.value)}</span>
            <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg: {formatCur(summaryData.deposits.value / summaryData.deposits.count)}</span>
          </div>

          <div className={`p-2 rounded flex flex-col justify-center border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-[9px] uppercase text-gray-500 mb-0.5">Withdrawals ({summaryData.withdrawals.count})</span>
            <span className="text-xs font-bold text-red-500">{formatCur(summaryData.withdrawals.value)}</span>
            <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fees: {formatCur(summaryData.paymentFees)}</span>
          </div>

          <div className={`p-2 rounded flex flex-col justify-center border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-[9px] uppercase text-gray-500 mb-0.5">Bonuses</span>
            <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCur(summaryData.totalBonus)}</span>
            <span className={`text-[9px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Encash: {formatCur(summaryData.bonusEncash)}</span>
          </div>

        </div>
      </div>

      {/* ===== ТРАНЗАКЦИИ И ИГРОВАЯ ИСТОРИЯ ===== */}
      <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className={`p-3 border-b flex items-center justify-between ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <CreditCard className="w-3.5 h-3.5" /> Activity Log
          </h3>
          <div className="flex gap-2">
            <button className={`px-2 py-1 text-[9px] font-medium rounded border ${darkMode ? 'border-white/10 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-100'}`}>Export CSV</button>
          </div>
        </div>

        <div className="flex flex-col">
          {transactions.map((tx) => {

            // --- ДЕПОЗИТ ---
            if (tx.type === "deposit") return (
              <div key={tx.id} className={`flex items-center p-3 border-b border-dashed ${darkMode ? 'border-gray-800 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 shrink-0">
                  <ArrowDownRight className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                  <div>
                    <div className="text-[11px] font-bold text-emerald-500">DEPOSIT</div>
                    <div className="text-[9px] text-gray-500">{tx.date}</div>
                  </div>
                  <div>
                    <div className={`text-[11px] font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tx.method}</div>
                    {tx.bonusCode && <div className="text-[9px] text-amber-500 flex items-center gap-0.5"><Ticket className="w-2.5 h-2.5"/> {tx.bonusCode}</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-gray-500">Balance Shift</div>
                    <div className="text-[10px] font-mono text-gray-400">{formatCur(tx.balanceBefore!)} → <span className={darkMode?'text-white':'text-black'}>{formatCur(tx.balanceAfter!)}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-500">+{formatCur(tx.amount)}</div>
                  </div>
                </div>
              </div>
            )

            // --- ВЫПЛАТА ---
            if (tx.type === "withdrawal") return (
              <div key={tx.id} className={`flex items-center p-3 border-b border-dashed ${darkMode ? 'border-gray-800 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3 shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                  <div>
                    <div className="text-[11px] font-bold text-red-500">WITHDRAWAL</div>
                    <div className="text-[9px] text-gray-500">{tx.date}</div>
                  </div>
                  <div>
                    <div className={`text-[11px] font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tx.method}</div>
                    <div className="text-[9px] text-amber-500">{tx.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-gray-500">Balance Shift</div>
                    <div className="text-[10px] font-mono text-gray-400">{formatCur(tx.balanceBefore!)} → <span className={darkMode?'text-white':'text-black'}>{formatCur(tx.balanceAfter!)}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-500">{formatCur(tx.amount)}</div>
                  </div>
                </div>
              </div>
            )

            // --- СПОРТ СТАВКА ---
            if (tx.type === "sport") return (
              <div key={tx.id} className={`flex items-center p-3 border-b border-dashed ${darkMode ? 'border-gray-800 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 shrink-0">
                  <Trophy className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                  <div>
                    <div className="text-[11px] font-bold text-indigo-400">SPORT BET</div>
                    <div className="text-[9px] font-mono text-gray-500">{tx.betId} | {tx.date}</div>
                  </div>
                  <div className="col-span-2">
                    <div className={`text-[11px] font-medium truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tx.event}</div>
                    <div className="text-[9px] text-gray-500 truncate">{tx.market} <span className="font-bold text-amber-500 mx-1">@{tx.odds?.toFixed(2)}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-gray-500">Amount / Profit</div>
                    <div className="text-[11px] font-bold flex items-center justify-end gap-1">
                      <span className="text-gray-400">{formatCur(tx.amount)}</span> / 
                      <span className={tx.profit! > 0 ? "text-emerald-500" : "text-red-500"}>{tx.profit! > 0 ? '+' : ''}{formatCur(tx.profit!)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )

            // --- КАЗИНО ГРУППА (СЛОТЫ) ---
            if (tx.type === "casino_group") {
              const isExpanded = expandedGroups.includes(tx.id)
              return (
                <div key={tx.id} className={`border-b border-dashed ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  {/* Заголовок группы */}
                  <div 
                    onClick={() => toggleGroup(tx.id)}
                    className={`flex items-center p-3 cursor-pointer select-none transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} ${isExpanded ? (darkMode ? 'bg-white/5' : 'bg-gray-50') : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Gamepad2 className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                      <div>
                        <div className="text-[11px] font-bold text-purple-400">CASINO SESSION</div>
                        <div className="text-[9px] text-gray-500">{tx.date}</div>
                      </div>
                      <div className="col-span-2">
                        <div className={`text-[11px] font-medium truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tx.game}</div>
                        <div className="text-[9px] text-gray-500">{tx.totalBets} spins</div>
                      </div>
                      <div className="text-right flex items-center justify-end gap-2">
                        <div>
                          <div className="text-[9px] text-gray-500">Turnover / Profit</div>
                          <div className="text-[11px] font-bold flex items-center justify-end gap-1">
                            <span className="text-gray-400">{formatCur(tx.totalAmount!)}</span> / 
                            <span className={tx.totalProfit! > 0 ? "text-emerald-500" : "text-red-500"}>{formatCur(tx.totalProfit!)}</span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 ml-2" /> : <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />}
                      </div>
                    </div>
                  </div>
                  
                  {/* Раскрывающийся список спинов */}
                  {isExpanded && (
                    <div className={`pl-14 pr-3 py-2 text-[10px] ${darkMode ? 'bg-black/20' : 'bg-gray-100/50'}`}>
                      <div className="grid grid-cols-4 gap-2 mb-1 text-gray-500 uppercase tracking-wider font-bold">
                        <div>Time</div>
                        <div className="text-right">Bet</div>
                        <div className="text-right">Win</div>
                        <div className="text-right">Net Profit</div>
                      </div>
                      {tx.sessionDetails?.map(spin => (
                        <div key={spin.id} className={`grid grid-cols-4 gap-2 py-1 border-b last:border-0 ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
                          <div className="font-mono text-gray-400">{spin.time}</div>
                          <div className="text-right text-gray-400">{formatCur(spin.amount)}</div>
                          <div className="text-right text-emerald-500">{spin.profit > 0 ? formatCur(spin.profit) : '-'}</div>
                          <div className={`text-right font-bold ${spin.profit > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {formatCur(spin.amount + spin.profit)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
