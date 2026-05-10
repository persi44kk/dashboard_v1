"use client"

import { usePlayerStore } from "./layout"
import { useState } from "react"
import { 
  Pencil, Calendar, CheckCircle2, XCircle, AlertTriangle, 
  ShieldCheck, FileText, User, MapPin, Phone, Mail, Wallet, Zap, MessageSquare
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Моковые данные для разных периодов графика
const mockChartData = {
  "1W":[
    { date: 'May 4', balance: 1000, income: 800 },
    { date: 'May 6', balance: 950, income: 1000 },
    { date: 'May 8', balance: 1050, income: 1200 },
    { date: 'May 10', balance: 1000, income: 1500 },
  ],
  "2W":[
    { date: 'Apr 26', balance: 900, income: -500 },
    { date: 'May 1', balance: 1200, income: 0 },
    { date: 'May 5', balance: 800, income: 800 },
    { date: 'May 10', balance: 1050, income: 1500 }, // Резкий рост инкама
  ],
  "1M":[
    { date: 'Apr 10', balance: 1000, income: 0 },
    { date: 'Apr 20', balance: 1100, income: -200 },
    { date: 'Apr 30', balance: 900, income: -500 },
    { date: 'May 10', balance: 1050, income: -700 }, // Инкам медленно падает
  ]
}

const shortCommentsList =["Super", "DNV", "DNVVD", "MA-S", "MA-M", "FLS"]

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
  return age
}

export default function InfoPage() {
  // Забираем данные и функции из Context
  const { playerData, updatePlayerField, darkMode } = usePlayerStore()
  const [chartPeriod, setChartPeriod] = useState<"1W"|"2W"|"1M">("2W")

  const age = calculateAge("2008-05-20") // Хардкод даты рождения для проверки красного цвета
  const isUnderage = age < 18

  // Универсальный инпут через window.prompt
  const handleEdit = (category: string | null, field: string, label: string) => {
    const currentVal = category ? playerData[category][field] : playerData[field]
    const newVal = window.prompt(`Edit ${label}:`, currentVal)
    if (newVal && newVal !== currentVal) {
      updatePlayerField(category, field, newVal)
    }
  }

  // Компонент поля с карандашом
  const EditableField = ({ icon: Icon, label, category, field, value }: any) => (
    <div className={`flex items-center justify-between p-1.5 rounded transition-colors group ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center gap-2 overflow-hidden">
        <Icon className={`w-3 h-3 shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <span className={`text-[10px] uppercase tracking-wider shrink-0 w-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
        <span className={`text-[11px] font-medium truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{value}</span>
      </div>
      <button onClick={() => handleEdit(category, field, label)} className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-indigo-500/20 text-indigo-400 transition-all">
        <Pencil className="w-3 h-3" />
      </button>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
      
      {/* ===== ЛЕВАЯ КОЛОНКА: Личные данные и Теги ===== */}
      <div className="flex flex-col gap-2.5">
        <div className={`rounded-lg p-3 border shadow-sm flex flex-col gap-0.5 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <User className="w-3.5 h-3.5" /> Personal Data
          </h3>
          <EditableField icon={User} label="First" category={null} field="firstName" value={playerData.firstName} />
          <EditableField icon={User} label="Last" category={null} field="lastName" value={playerData.lastName} />
          <EditableField icon={MapPin} label="Address" category="personal" field="address" value={playerData.personal.address} />
          <EditableField icon={Phone} label="Phone" category="personal" field="phone" value={playerData.personal.phone} />
          <EditableField icon={Mail} label="Email" category="personal" field="email" value={playerData.personal.email} />
          <EditableField icon={FileText} label="CPF" category="personal" field="cpf" value={playerData.personal.cpf} />
          <EditableField icon={Wallet} label="QIWI" category="personal" field="qiwi" value={playerData.personal.qiwi} />
        </div>

        {/* Short Comments */}
        <div className={`rounded-lg p-3 border shadow-sm ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MessageSquare className="w-3.5 h-3.5" /> Short Comments
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {shortCommentsList.map(tag => (
              <label key={tag} className="flex items-center gap-1 cursor-pointer group">
                <input type="checkbox" className="w-2.5 h-2.5 rounded border-gray-600 bg-transparent text-indigo-500 focus:ring-offset-0" />
                <span className={`text-[10px] ${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ЦЕНТРАЛЬНАЯ КОЛОНКА: AI Scoring и Даты ===== */}
      <div className="flex flex-col gap-2.5">
        <div className={`rounded-lg p-3 border shadow-sm ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between border-b pb-2 mb-2 border-dashed border-white/10">
            <h3 className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Scoring
            </h3>
            <span className="text-xl font-black text-emerald-400 leading-none">B</span>
          </div>
          <div className="text-[9px] uppercase text-gray-500 mb-1">Device & Links</div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="text-[9px] p-1.5 rounded bg-white/5"><span className="text-gray-500">IP:</span> <span className="font-mono text-gray-300">192.168.1.45</span></div>
            <div className="text-[9px] p-1.5 rounded bg-white/5"><span className="text-gray-500">FP:</span> <span className="font-mono text-gray-300">fp_8x99a</span></div>
            <div className="text-[9px] p-1.5 rounded bg-white/5"><span className="text-gray-500">Shield:</span> <span className="font-mono text-gray-300">SH-7712</span></div>
            <div className="text-[9px] p-1.5 rounded bg-white/5"><span className="text-gray-500">Seno:</span> <span className="font-mono text-gray-300">sn_001</span></div>
            <div className="col-span-2 text-[10px] p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-center font-medium">
              Quints QTag: Medium Risk
            </div>
          </div>
        </div>

        <div className={`rounded-lg p-3 border shadow-sm flex flex-col gap-1.5 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Calendar className="w-3.5 h-3.5" /> Timelines & Dates
          </h3>
          <div className={`flex justify-between items-center p-1.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <span className="text-[10px] uppercase text-gray-500">Reg Date</span>
            <span className="text-[10px] font-mono">2023-01-15</span>
          </div>
          <div className={`flex justify-between items-center p-1.5 rounded border group ${isUnderage ? 'border-red-500/30 bg-red-500/10' : 'border-transparent bg-white/5'}`}>
            <span className="text-[10px] uppercase text-gray-500">Birth</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-mono font-bold ${isUnderage ? 'text-red-400' : ''}`}>2008-05-20 ({age}y)</span>
              <Pencil className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div className={`flex justify-between items-center p-1.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <span className="text-[10px] uppercase text-gray-500">Last Dep</span>
            <span className="text-[10px] font-mono">2024-05-01 10:15</span>
          </div>
          <div className={`flex justify-between items-center p-1.5 rounded ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <span className="text-[10px] uppercase text-gray-500">Last Login</span>
            <span className="text-[10px] font-mono font-bold text-indigo-400">2024-05-08 09:00</span>
          </div>
        </div>
      </div>

      {/* ===== ПРАВАЯ КОЛОНКА: Департаменты и График ===== */}
      <div className="flex flex-col gap-2.5">
        <div className={`rounded-lg p-3 border shadow-sm flex flex-col gap-2 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <ShieldCheck className="w-3.5 h-3.5" /> Verifications & CFT
          </h3>
          <div className={`p-2 rounded border border-dashed flex justify-between items-center ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <span className="text-[10px] font-medium text-emerald-400">Sumsub</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className={`p-2 rounded border border-dashed flex justify-between items-center ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <span className="text-[10px] font-medium text-amber-400">Internal Docs</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className={`p-2 rounded border border-dashed flex justify-between items-center ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <span className="text-[10px] font-medium text-emerald-400">Casino Fraud</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className={`p-2 rounded border border-dashed flex justify-between items-center ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <span className="text-[10px] font-medium text-red-400">Risk/Payment</span>
            <XCircle className="w-3.5 h-3.5 text-red-500" />
          </div>
        </div>

        {/* Financial Dynamics Chart */}
        <div className={`flex-1 rounded-lg p-3 border shadow-sm min-h-[220px] flex flex-col ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fin Dynamics</h3>
            <div className="flex bg-white/5 rounded p-0.5 gap-0.5">
              {(["1W", "2W", "1M"] as const).map(period => (
                <button key={period} onClick={() => setChartPeriod(period)} className={`px-1.5 py-0.5 text-[9px] rounded font-medium ${chartPeriod === period ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative -ml-4">
            <ResponsiveContainer width="105%" height="100%">
              <LineChart data={mockChartData[chartPeriod]} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 9}} tickLine={false} axisLine={false} stroke="#888" />
                <YAxis yAxisId="left" tick={{fontSize: 9}} tickLine={false} axisLine={false} stroke="#888" width={30} />
                <YAxis yAxisId="right" orientation="right" tick={{fontSize: 9}} tickLine={false} axisLine={false} stroke="#888" width={30} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: '4px', fontSize: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="balance" stroke="#818cf8" strokeWidth={1.5} dot={{r: 2}} activeDot={{r: 4}} />
                <Line yAxisId="right" type="monotone" dataKey="income" stroke="#34d399" strokeWidth={1.5} dot={{r: 2}} activeDot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
