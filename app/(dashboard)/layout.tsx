"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { AccountSettingsModal } from "@/components/account-settings-modal"
import { ScrollText, Settings, Search, Sun, Moon, X } from "lucide-react"

// --- ГЛОБАЛЬНОЕ ХРАНИЛИЩЕ ДАННЫХ И ЛОГОВ ---
export const PlayerContext = createContext<any>(null)
export const usePlayerStore = () => useContext(PlayerContext)
export const useTheme = () => useContext(PlayerContext)

const initialPlayerData = {
  id: "8481209",
  firstName: "Romenilto",
  lastName: "Silva",
  countryCode: "BR",
  isVIP: false,
  status: "Open", // Глобальный статус счета
  segmentation: { sport: "Mainly Sport", casino: "Tried Casino" },
  financials: { balance: 1500.00, overallIncome: 250.00, currency: "R$" },
  personal: {
    address: "Brazil, São Paulo, Rua das Flores, 123",
    phone: "+55 11 98765-4321",
    email: "romenilto.silva@gmail.com",
    cpf: "123.456.789-00",
    qiwi: "N/A"
  }
}

const initialLogs =[
  { id: 1, date: "10 May 2026, 18:30", action: "Password Changed", old: "******", new: "******", by: "Customer" },
  { id: 2, date: "09 May 2026, 12:15", action: "IP Changed", old: "192.168.1.1", new: "172.20.10.5", by: "System" },
  { id: 3, date: "01 May 2026, 09:00", action: "Account Created", old: "-", new: "Registered", by: "Customer" }
]

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "🌍"
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [logsOpen, setLogsOpen] = useState(false) // State для панели логов
  const pathname = usePathname()

  // Инициализация глобального стейта
  const[playerData, setPlayerData] = useState(initialPlayerData)
  const [logs, setLogs] = useState(initialLogs)

  // Функция добавления лога
  const addLog = (action: string, oldVal: string, newVal: string, by: string) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action, old: oldVal, new: newVal, by
    }
    setLogs(prev => [newLog, ...prev]) // Добавляем в начало
  }

  // Функция обновления полей (вызывается из карандашиков или модалок)
  const updatePlayerField = (category: string, field: string, value: any, by = "Operator #5") => {
    setPlayerData(prev => {
      const oldVal = category ? prev[category][field] : prev[field]
      if (oldVal === value) return prev // Если не изменилось, игнорируем
      
      addLog(`Updated ${field}`, String(oldVal), String(value), by)
      
      if (category) {
        return { ...prev, [category]: { ...prev[category], [field]: value } }
      }
      return { ...prev, [field]: value }
    })
  }

  const tabs =[
    { name: "Info", href: "/" },
    { name: "Finance & Gameplay", href: "/history" },
    { name: "Risk/Payment/Fraud", href: "/rpf" },
    { name: "Casino Fraud Team", href: "/casino-fraud" },
    { name: "Sportbook", href: "/sportbook" },
  ]

  const displayName = playerData.firstName || playerData.lastName 
    ? `${playerData.firstName || 'N/A'} ${playerData.lastName || 'N/A'}` 
    : "N/A N/A"

  const isIncomePositive = playerData.financials.overallIncome > 0
  const incomeColorClass = isIncomePositive ? "text-red-500 bg-red-500/10 border-red-500/20" : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"

  const generateAlerts = () => {
    const alerts = ["Password Changed", "IP Changed"] // Хардкод для примера
    if (playerData.financials.overallIncome > 200) alerts.push("Missing Docs: Sport")
    return alerts
  }

  return (
    <PlayerContext.Provider value={{ playerData, updatePlayerField, logs, addLog, darkMode, setDarkMode }}>
      <div className={`min-h-screen antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
        
        <div className="relative z-10 pb-20">
          {/* HEADER */}
          <header className={`sticky top-0 z-40 transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-b border-white/10' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
            <div className="max-w-[98%] mx-auto px-2 py-2">
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 font-mono text-[11px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <span className="text-sm">{getFlagEmoji(playerData.countryCode)}</span>
                    <span>{playerData.id}</span>
                  </div>
                  <span className="font-semibold text-xs">{displayName}</span>
                  
                  {playerData.isVIP && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VIP</span>}
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>{playerData.status}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>{playerData.segmentation.sport}</span>

                  {generateAlerts().map((alert, idx) => (
                    <span key={idx} className="animate-pulse px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500" />{alert}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right leading-tight">
                    <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Balance</div>
                    <div className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{playerData.financials.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="text-right leading-tight">
                    <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Overall Income</div>
                    <div className={`text-xs font-semibold px-1.5 rounded border ${incomeColorClass}`}>
                      {isIncomePositive ? "+" : ""}{playerData.financials.overallIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="w-px h-6 bg-border opacity-50 mx-0.5" />

                  <div className="flex items-center gap-0.5">
                    <button onClick={() => setLogsOpen(true)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Audit Log">
                      <ScrollText className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-amber-400' : 'hover:bg-gray-100 text-indigo-500'}`}>
                      {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setSettingsModalOpen(true)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Settings">
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* TABS */}
          <div className="max-w-[98%] mx-auto px-2 pt-2">
            <div className={`rounded-lg p-1 inline-flex transition-colors ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
              {tabs.map((tab) => {
                const isActive = pathname === tab.href
                return (
                  <Link key={tab.href} href={tab.href} className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${isActive ? (darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900') : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}>
                    {tab.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <main className="max-w-[98%] mx-auto px-2 py-2">
            {children}
          </main>
        </div>

        {/* FLOATING ACTION BUTTONS */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className={`rounded-full px-2 py-1.5 flex items-center gap-2 shadow-2xl ${darkMode ? 'bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-black/50' : 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-gray-300/50'}`}>
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-medium text-[11px] shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Stop Activity
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-gray-900 font-medium text-[11px] shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0">
              Request Docs
            </button>
          </div>
        </div>

        {/* AUDIT LOG SIDEBAR */}
        {logsOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" onClick={() => setLogsOpen(false)} />
            <div className={`fixed inset-y-0 right-0 w-96 shadow-2xl z-[101] flex flex-col transform transition-transform ${darkMode ? 'bg-gray-900 border-l border-white/10' : 'bg-white border-l border-gray-200'}`}>
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-sm font-semibold flex items-center gap-2"><ScrollText className="w-4 h-4 text-indigo-400" /> Changes Log</h2>
                <button onClick={() => setLogsOpen(false)} className="p-1 rounded hover:bg-white/10 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {logs.map(log => (
                  <div key={log.id} className={`p-3 rounded-lg text-xs space-y-1.5 ${darkMode ? 'bg-white/5' : 'bg-gray-50 border'}`}>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>{log.date}</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-500/20 text-gray-400">{log.by}</span>
                    </div>
                    <div className="font-medium text-indigo-400">{log.action}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="p-1.5 rounded bg-red-500/10 text-red-400 line-through truncate">{log.old}</div>
                      <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 truncate">{log.new}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <AccountSettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      </div>
    </PlayerContext.Provider>
  )
}
