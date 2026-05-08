"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { AccountSettingsModal } from "@/components/account-settings-modal"
import { ScrollText, Settings, Search, Sun, Moon } from "lucide-react"

// Имитация данных из MongoDB для прототипа
const playerData = {
  id: "8481209",
  firstName: "Romenilto", // Удали значение (сделай null), чтобы проверить N/A
  lastName: "Silva",
  countryCode: "BR", // Код страны для флага
  isVIP: true,
  segmentation: {
    sport: "Mainly Sport", // Возможные: 100% sport bets, Tried Casino, Mainly Sport, etc.
    casino: "Tried Casino" 
  },
  financials: {
    balance: 1500.00,
    overallIncome: 250.00, // Если > 0 будет красным, если < 0 будет зеленым
    currency: "R$"
  }
}

// Theme context
const ThemeContext = createContext<{
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}>({
  darkMode: true,
  setDarkMode: () => {},
})

export const useTheme = () => useContext(ThemeContext)

// Изменили роуты. Теперь корень "/" это Info.
const tabs =[
  { name: "Info", href: "/" },
  { name: "Finance & Gameplay", href: "/history" },
  { name: "Risk/Payment/Fraud", href: "/rpf" },
  { name: "Casino Fraud Team", href: "/casino-fraud" },
  { name: "Sportbook", href: "/sportbook" },
]

const statusOptions =[
  { id: "open", label: "Open", isLock: false },
  { id: "lock-deleted", label: "Lock - Deleted", isLock: true },
  { id: "lock-multi", label: "Lock - Multi Account", isLock: true },
]

// Хелпер для флага (превращает "BR" в 🇧🇷)
const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "🌍"
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const[statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["open"])
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const pathname = usePathname()

  const hasLockStatus = selectedStatuses.some(id => statusOptions.find(s => s.id === id)?.isLock)
  const statusDisplayText = selectedStatuses.map(id => statusOptions.find(s => s.id === id)?.label).filter(Boolean).join(", ")

  // Вычисляемые данные для UI
  const displayName = playerData.firstName || playerData.lastName 
    ? `${playerData.firstName || 'N/A'} ${playerData.lastName || 'N/A'}` 
    : "N/A N/A"

  const isIncomePositive = playerData.financials.overallIncome > 0
  const incomeColorClass = isIncomePositive 
    ? "text-red-600 bg-red-500/10 border-red-500/20" // Казино в минусе (игрок в плюсе) = красный
    : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" // Казино в плюсе = зеленый

  // Логика алертов
  const generateAlerts = () => {
    const alerts =[]
    const income = playerData.financials.overallIncome
    const { sport, casino } = playerData.segmentation

    if (income > 200 &&["100% sport bets", "Tried Casino", "Mainly Sport"].includes(sport)) {
      alerts.push("Missing Docs: Sport")
    }
    if (income > 500 && ["Mixed", "Mainly Casino", "Tried Sport", "Casino"].includes(casino)) {
      alerts.push("Missing Docs: Casino")
    }
    return alerts
  }
  const alerts = generateAlerts()

  const toggleStatus = (statusId: string) => {
    const clickedStatus = statusOptions.find(s => s.id === statusId)
    if (clickedStatus?.id === "open") {
      setSelectedStatuses(["open"])
    } else {
      setSelectedStatuses(prev => {
        const withoutOpen = prev.filter(id => id !== "open")
        if (prev.includes(statusId)) {
          const newStatuses = withoutOpen.filter(id => id !== statusId)
          return newStatuses.length === 0 ? [statusId] : newStatuses
        } else {
          return [...withoutOpen, statusId]
        }
      })
    }
  }

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  },[])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`min-h-screen antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
        
        <div className="relative z-10 pb-32">
          {/* Header - Уменьшили отступы (py-2.5) */}
          <header className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-b border-white/10' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
            <div className="max-w-[95%] mx-auto px-4 py-2.5">
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-3">
                  {/* Флаг и ID */}
                  <div className={`flex items-center gap-1.5 font-mono text-sm px-2 py-0.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <span className="text-base leading-none">{getFlagEmoji(playerData.countryCode)}</span>
                    <span>{playerData.id}</span>
                  </div>
                  
                  {/* Имя */}
                  <span className="font-semibold text-sm">{displayName}</span>
                  
                  {/* Статусы */}
                  {playerData.isVIP && (
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      VIP
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {playerData.segmentation.sport}
                  </span>

                  {/* Алерты (Доки) */}
                  {alerts.map((alert, idx) => (
                    <span key={idx} className="animate-pulse px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {alert}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5">
                  {/* Balance */}
                  <div className="text-right">
                    <div className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Balance</div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <span className="text-xs opacity-50 mr-0.5">{playerData.financials.currency}</span> 
                      {playerData.financials.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  {/* Overall Income (Динамический цвет) */}
                  <div className="text-right">
                    <div className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Overall Income</div>
                    <div className={`text-sm font-semibold px-2 py-0.5 rounded border ${incomeColorClass}`}>
                      <span className="text-xs opacity-50 mr-0.5">{playerData.financials.currency}</span> 
                      {isIncomePositive ? "+" : ""}
                      {playerData.financials.overallIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="w-px h-8 bg-border opacity-50 mx-1" />

                  {/* Кнопки управления */}
                  <div className="flex items-center gap-1.5">
                    {/* Кнопка Audit Log (Журнал) */}
                    <button className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`} title="Audit Log">
                      <ScrollText className="w-4 h-4" />
                    </button>
                    <button onClick={() => setCommandOpen(true)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`} title="Macros (Cmd+K)">
                      <Search className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-amber-400' : 'hover:bg-gray-100 text-indigo-500'}`}>
                      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setSettingsModalOpen(true)} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`} title="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Вкладки и Статус */}
          <div className="max-w-[95%] mx-auto px-4 pt-4">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-1 inline-flex transition-colors duration-300 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200 shadow-sm'}`}>
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'
                          : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab.name}
                    </Link>
                  )
                })}
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center gap-2">
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Status:</span>
                <div className="relative">
                  <button
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      hasLockStatus 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${hasLockStatus ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    {statusDisplayText}
                  </button>
                  {/* Dropdown Menu (Оставляем твою старую логику) */}
                  {statusDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-48 rounded-lg overflow-hidden shadow-xl z-50 bg-gray-900 border border-white/10">
                        {statusOptions.map((status) => (
                           <button
                             key={status.id}
                             onClick={() => { toggleStatus(status.id); setStatusDropdownOpen(false); }}
                             className="w-full px-3 py-2 text-xs text-left hover:bg-white/10 text-gray-300"
                           >
                             {status.label}
                           </button>
                        ))}
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-[95%] mx-auto px-4 py-4">
            {children}
          </main>
        </div>

        <AccountSettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      </div>
    </ThemeContext.Provider>
  )
}
