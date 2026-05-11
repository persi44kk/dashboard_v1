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
  manualStatus: "Normal",
  exVIP: false,
  exGold: false,
  status: "Open",
  segmentation: { sport: "Mainly Sport", casino: "Tried Casino" },
  financials: { balance: 1500.00, overallIncome: 250.00, currency: "R$" },
  personal: {
    address: "Brazil, São Paulo, Rua das Flores, 123",
    phone: "+55 11 98765-4321",
    email: "romenilto.silva@gmail.com",
    cpf: "123.456.789-00",
    qiwi: "N/A"
  },
  // Добавили департаменты в глобальный стейт
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)
  const[settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [logsOpen, setLogsOpen] = useState(false)
  const pathname = usePathname()

  const [playerData, setPlayerData] = useState(initialPlayerData)
  const [logs, setLogs] = useState(initialLogs)
  const[statusDropdownOpen, setStatusDropdownOpen
