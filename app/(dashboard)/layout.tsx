"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, createContext, useContext, type ReactNode } from "react"
import { AccountSettingsModal } from "@/components/account-settings-modal"
import { 
  ScrollText, Settings, Sun, Moon, X, 
  LayoutDashboard, Wallet, ShieldAlert, Dices, Trophy // Новые иконки для боковой панели
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// --- ГЛОБАЛЬНОЕ ХРАНИЛИЩЕ ДАННЫХ И ЛОГОВ ---
export const PlayerContext = createContext<any>(null)
export const usePlayerStore = () => useContext(PlayerContext)
export const useTheme = () => useContext(PlayerContext)

const initialPlayerData = {
  id: "8481209",
  firstName: "Romenilto",
  lastName: "Silva",
  countryCode: "BR",
  manualStatus: "Normal",
  exVIP: false,
  exGold: false,
  segmentation: { sport: "Mainly Sport", casino: "Tried Casino" },
  financials: { balance: 1500.00, overallIncome: 250.00, currency: "R$" },
  personal: {
    address: "Brazil, São Paulo, Rua das Flores, 123",
    phone: "+55 11 98765-4321",
    email: "romenilto.silva@gmail.com",
    cpf: "123.456.789-00",
    qiwi: "N/A"
  },
  departments: {
    casino: { status: "approved", text: "Verified, normal slots activity" },
    rpf: { status: "warning", text: "Multiple IP changes detected" },
    sportbook: { status: "pending", text: "Awaiting review" }
  }
}

const initialLogs =[
  { id: 1, date: "10 May 2026, 18:30", action: "Password Changed", old: "******", new: "******", by: "Customer" },
  { id: 2, date: "09 May 2026, 12:15", action: "IP Changed", old: "192.168.1.1", new: "172.20.10.5", by: "System" },
]

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "🌍"
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const statusOptions =[
  { id: "open", label: "Open", isLock: false },
  { id: "lock-deleted", label: "Lock - Deleted", isLock: true },
  { id: "lock-multi", label: "Lock - Multi Account", isLock: true },
  { id: "lock-underage", label: "Lock - Underage", isLock: true },
]

// Конфиг для боковой панели навигации
const navItems =[
  { name: "Info Summary", href: "/", icon: LayoutDashboard },
  { name: "Finance & Gameplay", href: "/history", icon: Wallet },
  { name: "Risk / Payment / Fraud", href: "/rpf", icon: ShieldAlert },
  { name: "Casino Fraud Team", href: "/casino-fraud", icon: Dices },
  { name: "Sportbook", href: "/sportbook", icon: Trophy },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const[logsOpen, setLogsOpen] = useState(false)
  const pathname = usePathname()

  const[playerData, setPlayerData] = useState(initialPlayerData)
  const [logs, setLogs] = useState(initialLogs)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["open"])

  const addLog = (action: string, oldVal: string, newVal: string, by: string) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      action, old: oldVal, new: newVal, by
    }
    setLogs(prev => [newLog, ...prev])
  }

  const updatePlayerField = (category: string | null, field: string, value: any, by = "Operator #5") => {
    setPlayerData(prev => {
      const oldVal = category ? prev[category][field] : prev[field]
      if (typeof value === 'object' && value !== null) {
        addLog(`Updated ${field}`, "Old Status", value.status, by)
        return { ...prev, [category as string]: { ...prev[category as string], [field]: value } }
      }
      if (oldVal === value) return prev
      addLog(`Updated ${field}`, String(oldVal), String(value), by)
      if (category) return { ...prev, [category]: { ...prev[category], [field]: value } }
      return { ...prev, [field]: value }
    })
  }

  const toggleAccountStatus = (statusId: string) => {
    const clickedStatus = statusOptions.find(s => s.id === statusId)
    if (clickedStatus?.id === "open") {
      addLog("Account Status", selectedStatuses.join(", "), "open", "Operator #5")
      setSelectedStatuses(["open"])
    } else {
      setSelectedStatuses(prev => {
        const withoutOpen = prev.filter(id => id !== "open")
        let newStatuses = prev.includes(statusId) ? withoutOpen.filter(id => id !== statusId) : [...withoutOpen, statusId]
        if (newStatuses.length === 0) newStatuses = [statusId]
        addLog("Account Status", prev.join(", "), newStatuses.join(", "), "Operator #5")
        return newStatuses
      })
    }
  }

  const hasLockStatus = selectedStatuses.some(id => statusOptions.find(s => s.id === id)?.isLock)
  const statusDisplayText = selectedStatuses.map(id => statusOptions.find(s => s.id === id)?.label).filter(Boolean).join(", ")

  const displayName = playerData.firstName || playerData.lastName ? `${playerData.firstName || 'N/A'} ${playerData.lastName || 'N/A'}` : "N/A N/A"
  const isIncomePositive = playerData.financials.overallIncome > 0
  const incomeColorClass = isIncomePositive ? "text-red-500 bg-red-500/10 border-red-500/20" : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"

  const generateAlerts = () => {
    const alerts =["Password Changed", "IP Changed"]
    if (playerData.financials.overallIncome > 200) alerts.push("Missing Docs: Sport")
    return alerts
  }

  return (
    <PlayerContext.Provider value={{ playerData, updatePlayerField, logs, addLog, darkMode, setDarkMode }}>
      <div className={`min-h-screen antialiased transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-100 text-gray-900'}`}>
        
        <div className="relative z-10 pb-20">
          
          {/* HEADER */}
          <header className={`sticky top-0 z-40 transition-colors duration-300 ${darkMode ? 'bg-slate-800 border-b border-white/5 shadow-md' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
            <div className="max-w-[98%] mx-auto px-2 py-2">
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 font-mono text-[11px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                    <span className="text-sm">{getFlagEmoji(playerData.countryCode)}</span>
                    <span>{playerData.id}</span>
                  </div>
                  <span className="font-semibold text-xs">{displayName}</span>
                  
                  {/* Дропдаун Аккаунт Статуса переехал сюда! */}
                  <div className="relative ml-1">
                    <button onClick={() => setStatusDropdownOpen(!statusDropdownOpen)} className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${hasLockStatus ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${hasLockStatus ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      {statusDisplayText}
                    </button>
                    {statusDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setStatusDropdownOpen(false)} />
                        <div className={`absolute left-0 mt-1 w-48 rounded-lg overflow-hidden shadow-xl z-50 ${darkMode ? 'bg-slate-800 border border-white/5' : 'bg-white border border-gray-200'}`}>
                          {statusOptions.map((status) => {
                            const isSelected = selectedStatuses.includes(status.id)
                            return (
                              <button key={status.id} onClick={() => toggleAccountStatus(status.id)} className={`w-full flex items-center gap-2 px-3 py-2 text-[11px] text-left transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                                <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${isSelected ? (status.isLock ? 'bg-red-500 border-red-500' : 'bg-emerald-500 border-emerald-500') : (darkMode ? 'border-slate-600' : 'border-gray-300')}`}>
                                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className={isSelected ? (status.isLock ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold') : (darkMode ? 'text-slate-300' : 'text-gray-700')}>{status.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {playerData.manualStatus !== "Normal" && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${playerData.manualStatus === 'VIP' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>{playerData.manualStatus}</span>
                  )}
                  {playerData.exVIP && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-500/20 text-slate-400 border border-slate-500/30">EX-VIP</span>}
                  
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'}`}>{playerData.segmentation.sport}</span>

                  {generateAlerts().map((alert, idx) => (
                    <span key={idx} className="animate-pulse px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500" />{alert}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right leading-tight">
                    <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>Balance</div>
                    <div className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{playerData.financials.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div className="text-right leading-tight">
                    <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>Overall Income</div>
                    <div className={`text-xs font-semibold px-1.5 rounded border ${incomeColorClass}`}>
                      {isIncomePositive ? "+" : ""}{playerData.financials.overallIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="w-px h-6 bg-border opacity-50 mx-0.5" />

                  <div className="flex items-center gap-0.5">
                    <button onClick={() => setLogsOpen(true)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Audit Log">
                      <ScrollText className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-700 text-amber-400' : 'hover:bg-gray-100 text-indigo-500'}`}>
                      {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setSettingsModalOpen(true)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Settings">
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ОСНОВНАЯ СТРУКТУРА: ЛЕВОЕ МЕНЮ И КОНТЕНТ */}
          <div className="max-w-[98%] mx-auto pt-4 flex items-start gap-4">
            
            {/* БОКОВАЯ ПАНЕЛЬ ИКОНОК (Sidebar) */}
            <aside className={`sticky top-20 flex flex-col items-center gap-2 p-2 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-200'}`}>
              <TooltipProvider delayDuration={0}>
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link 
                          href={item.href} 
                          className={`p-2.5 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? (darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600') 
                              : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100')
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                        </Link>
                      </TooltipTrigger>
                      {/* Тултип (Всплывающее название) */}
                      <TooltipContent side="right" className={`text-xs ml-2 border-none shadow-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-800 text-white'}`}>
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </TooltipProvider>
            </aside>

            {/* ДИНАМИЧЕСКИЙ КОНТЕНТ */}
            <main className="flex-1 min-w-0 pb-10">
              {children}
            </main>
          </div>

        </div>

        {/* FLOATING ACTION BUTTONS */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className={`rounded-full px-2 py-1.5 flex items-center gap-2 shadow-2xl ${darkMode ? 'bg-slate-800/90 backdrop-blur-xl border border-white/10 shadow-black/50' : 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-gray-300/50'}`}>
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
            <div className={`fixed inset-y-0 right-0 w-96 shadow-2xl z-[101] flex flex-col transform transition-transform ${darkMode ? 'bg-slate-800 border-l border-white/5' : 'bg-white border-l border-gray-200'}`}>
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h2 className="text-sm font-semibold flex items-center gap-2"><ScrollText className="w-4 h-4 text-indigo-400" /> Changes Log</h2>
                <button onClick={() => setLogsOpen(false)} className="p-1 rounded hover:bg-white/10 text-slate-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {logs.map((log: any) => (
                  <div key={log.id} className={`p-3 rounded-lg text-xs space-y-1.5 ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50 border'}`}>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{log.date}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-500/20 text-slate-300">{log.by}</span>
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
