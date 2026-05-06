"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { AccountSettingsModal } from "@/components/account-settings-modal"

// Theme context
const ThemeContext = createContext<{
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}>({
  darkMode: true,
  setDarkMode: () => {},
})

export const useTheme = () => useContext(ThemeContext)

const tabs = [
  { name: "Player Info", href: "/player-info" },
  { name: "Account History", href: "/" },
  { name: "Workflow", href: "/workflow" },
  { name: "Documents", href: "/documents" },
  { name: "Flags", href: "/flags" },
]

const macroTemplates = [
  { id: 1, name: "Welcome Message", description: "Send welcome message to new player", shortcut: "W" },
  { id: 2, name: "KYC Reminder", description: "Remind player to complete verification", shortcut: "K" },
  { id: 3, name: "Suspicious Activity Alert", description: "Notify player about account review", shortcut: "S" },
  { id: 4, name: "Bonus Notification", description: "Inform about available bonus", shortcut: "B" },
  { id: 5, name: "Account Restriction Notice", description: "Explain temporary restrictions", shortcut: "R" },
  { id: 6, name: "Document Request", description: "Request specific documents", shortcut: "D" },
  { id: 7, name: "Withdrawal Approved", description: "Confirm withdrawal processing", shortcut: "A" },
  { id: 8, name: "Withdrawal Declined", description: "Explain withdrawal rejection", shortcut: "X" },
]

const statusOptions = [
  { id: "open", label: "Open", isLock: false },
  { id: "lock-deleted", label: "Lock - Deleted", isLock: true },
  { id: "lock-multi", label: "Lock - Multi Account", isLock: true },
  { id: "lock-underage", label: "Lock - Underage", isLock: true },
  { id: "lock-fraud", label: "Lock - Fraud", isLock: true },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["open"])
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const pathname = usePathname()

  const hasLockStatus = selectedStatuses.some(id => statusOptions.find(s => s.id === id)?.isLock)
  const statusDisplayText = selectedStatuses
    .map(id => statusOptions.find(s => s.id === id)?.label)
    .filter(Boolean)
    .join(", ")

  const toggleStatus = (statusId: string) => {
    const clickedStatus = statusOptions.find(s => s.id === statusId)
    
    if (clickedStatus?.id === "open") {
      // Clicking Open removes all lock statuses and sets only Open
      setSelectedStatuses(["open"])
    } else {
      // Clicking any lock status
      setSelectedStatuses(prev => {
        // Remove "open" if it was selected
        const withoutOpen = prev.filter(id => id !== "open")
        
        if (prev.includes(statusId)) {
          // Uncheck this status, but ensure at least one remains
          const newStatuses = withoutOpen.filter(id => id !== statusId)
          // If nothing left, keep this one checked
          return newStatuses.length === 0 ? [statusId] : newStatuses
        } else {
          // Add this status
          return [...withoutOpen, statusId]
        }
      })
    }
  }

  const filteredMacros = macroTemplates.filter(
    (macro) =>
      macro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      macro.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setCommandOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`min-h-screen antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
        {/* Subtle gradient background */}
        <div className={`fixed inset-0 pointer-events-none transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'}`} />
        <div className={`fixed top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`} />
        <div className={`fixed bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${darkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'}`} />

        <div className="relative z-10 pb-32">
          {/* Header */}
          <header className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-b border-white/10' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Player Info */}
                  <span className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>8481209</span>
                  <span className="font-medium">Romenilto</span>
                  <span className="status-badge px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    VIP
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' : 'bg-gray-200 text-gray-600 border border-gray-300'}`}>
                    Tried Sport
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Balance</div>
                    <div className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>R$</span> 1,500.00
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Overall Income</div>
                    <div className={`text-xl font-semibold text-emerald-500`}>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>R$</span> 12,340.00
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Command Palette Button */}
                    <div className="relative group">
                      <button 
                        onClick={() => setCommandOpen(true)}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
                      >
                        <svg className={`w-5 h-5 rotate-45 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                      {/* Tooltip */}
                      <div className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-900 text-white'}`}>
                        Send Macro <span className={`ml-1 px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-700'}`}>Cmd+K</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDarkMode(!darkMode)}
                      className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
                    >
                      {darkMode ? (
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      )}
                    </button>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Tabs Navigation */}
          <div className="max-w-7xl mx-auto px-6 pt-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-2xl p-1.5 inline-flex transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
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
              <div className="flex items-center gap-3">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        hasLockStatus 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${hasLockStatus ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      {statusDisplayText}
                      <svg className={`w-4 h-4 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {statusDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setStatusDropdownOpen(false)} 
                        />
                        <div className={`absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl z-50 ${darkMode ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
                          <div className={`px-3 py-2 text-xs uppercase tracking-wider ${darkMode ? 'text-gray-500 border-b border-white/10' : 'text-gray-400 border-b border-gray-100'}`}>
                            Select Status
                          </div>
                          {statusOptions.map((status) => {
                            const isSelected = selectedStatuses.includes(status.id)
                            return (
                              <button
                                key={status.id}
                                onClick={() => toggleStatus(status.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors ${
                                  darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                                  isSelected 
                                    ? status.isLock 
                                      ? 'bg-red-500 border-red-500' 
                                      : 'bg-emerald-500 border-emerald-500'
                                    : darkMode 
                                      ? 'border-gray-600 bg-transparent' 
                                      : 'border-gray-300 bg-transparent'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className={`${
                                  isSelected 
                                    ? status.isLock 
                                      ? 'text-red-400' 
                                      : 'text-emerald-400'
                                    : darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {status.label}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </>
                    )}
                  </div>
                  {/* Settings Gear Icon */}
                  <button
                    onClick={() => setSettingsModalOpen(true)}
                    className={`p-2.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                    title="Account Settings"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-6">
            {children}
          </main>
        </div>

        {/* Command Palette Modal */}
        {commandOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setCommandOpen(false)}
            />
            {/* Modal */}
            <div className={`relative w-full max-w-xl mx-4 rounded-2xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
              {/* Search Input */}
              <div className={`flex items-center gap-3 px-4 py-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <svg className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search macro templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className={`flex-1 bg-transparent outline-none text-base ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
                <kbd className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>ESC</kbd>
              </div>
              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {filteredMacros.length > 0 ? (
                  filteredMacros.map((macro) => (
                    <button
                      key={macro.id}
                      onClick={() => {
                        alert(`Sending macro: ${macro.name}`)
                        setCommandOpen(false)
                        setSearchQuery("")
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </div>
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{macro.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{macro.description}</div>
                        </div>
                      </div>
                      <kbd className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{macro.shortcut}</kbd>
                    </button>
                  ))
                ) : (
                  <div className={`px-4 py-8 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No macros found
                  </div>
                )}
              </div>
              {/* Footer */}
              <div className={`px-4 py-3 border-t flex items-center justify-between text-xs ${darkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                <span>Select a macro to send to player</span>
                <div className="flex items-center gap-2">
                  <span>Navigate</span>
                  <kbd className={`px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>Tab</kbd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Panel */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className={`rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl transition-colors duration-300 ${darkMode ? 'glass-strong shadow-black/50' : 'bg-white/80 backdrop-blur-xl border border-gray-200 shadow-gray-300/50'}`}>
            {/* Stop User Activity */}
            <button className="btn-action glow-red flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-medium text-sm shadow-lg shadow-red-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              Stop User Activity
            </button>

            {/* Request Docs */}
            <button className="btn-action glow-yellow flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-gray-900 font-medium text-sm shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Request Docs
            </button>
          </div>
        </div>

        {/* Account Settings Modal */}
        <AccountSettingsModal 
          isOpen={settingsModalOpen} 
          onClose={() => setSettingsModalOpen(false)} 
        />

        <style jsx>{`
          .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .glass-strong {
            background: rgba(30, 30, 40, 0.8);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .glow-red {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          .glow-yellow {
            box-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
          }

          .status-badge {
            animation: pulse-soft 2s ease-in-out infinite;
          }

          @keyframes pulse-soft {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  )
}
