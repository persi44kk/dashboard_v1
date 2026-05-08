"use client"

import { useTheme } from "./layout"
import { 
  Pencil, Calendar, CheckCircle2, XCircle, AlertTriangle, 
  ShieldCheck, FileText, User, MapPin, Phone, Mail, Wallet, Zap, MonitorSmartphone
} from "lucide-react"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'

// --- Имитация данных из MongoDB ---
const playerInfo = {
  personal: {
    firstName: "Romenilto", middleName: "Gomes", lastName: "Silva",
    nickname: "romego99",
    address: "Brazil, São Paulo, Rua das Flores, 123",
    phone: "+55 11 98765-4321",
    email: "romenilto.silva@gmail.com",
    cpf: "123.456.789-00",
    qiwi: "N/A"
  },
  dates: {
    registration: "2023-01-15",
    dob: "2008-05-20", // Специально сделал 2008 год, чтобы показать красную подсветку (< 18 лет)
    firstDeposit: "2023-01-15 14:30",
    lastDeposit: "2024-05-01 10:15",
    lastActivity: "2024-05-08 09:00"
  },
  departments: {
    casino: { status: "approved", text: "Verified, normal slots activity" },
    rpf: { status: "warning", text: "Multiple IP changes detected" },
    sportbook: { status: "rejected", text: "Suspected arbitrage betting" }
  },
  verification: {
    sumsub: "Approved",
    internal: "Pending Proof of Address",
    docs:[
      { name: "ID Card", status: "Accepted", operator: "Auto", date: "2023-01-15" },
      { name: "Utility Bill", status: "Requested", operator: "John D.", date: "2024-05-05" }
    ]
  },
  aiScoring: {
    score: "B", // A, B, C, D
    tags: ["High LTV", "Crypto User", "Night Owl"],
    device: { ip: "192.168.1.45", mask: "255.255.255.0", fingerprint: "fp_8x99a", shieldId: "SH-7712", seno: "sn_001" },
    quintsQTag: "Medium Risk"
  }
}

// Данные для графика (Balance vs Overall Income)
const chartData =[
  { date: 'May 1', balance: 1200, income: 150 },
  { date: 'May 2', balance: 1350, income: 100 },
  { date: 'May 3', balance: 900, income: -100 },
  { date: 'May 4', balance: 1800, income: 200 },
  { date: 'May 5', balance: 1500, income: 250 },
]

// --- Вспомогательные функции ---
const calculateAge = (dob: string) => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

// Компонент для полей с карандашиком
const EditableField = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => {
  const { darkMode } = useTheme()
  return (
    <div className={`flex items-center justify-between p-2 rounded-lg transition-colors group ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center gap-2 overflow-hidden">
        <Icon className={`w-3.5 h-3.5 shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <span className={`text-[11px] uppercase tracking-wider shrink-0 w-20 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
        <span className={`text-xs font-medium truncate ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{value}</span>
      </div>
      <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-indigo-500/20 text-indigo-400 transition-all">
        <Pencil className="w-3 h-3" />
      </button>
    </div>
  )
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'approved') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
  if (status === 'rejected') return <XCircle className="w-4 h-4 text-red-500" />
  return <AlertTriangle className="w-4 h-4 text-amber-500" />
}

export default function InfoPage() {
  const { darkMode } = useTheme()
  const age = calculateAge(playerInfo.dates.dob)
  const isUnderage = age < 18

  return (
    <div className="space-y-4">
      {/* ВЕРХНИЙ РЯД: Данные, Даты, AI Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Личные данные */}
        <div className={`rounded-xl p-4 border shadow-sm flex flex-col gap-1 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <User className="w-4 h-4" /> Personal Data
          </h3>
          <EditableField icon={User} label="First Name" value={playerInfo.personal.firstName} />
          <EditableField icon={User} label="Middle Name" value={playerInfo.personal.middleName} />
          <EditableField icon={User} label="Last Name" value={playerInfo.personal.lastName} />
          <EditableField icon={User} label="Nickname" value={playerInfo.personal.nickname} />
          <EditableField icon={MapPin} label="Address" value={playerInfo.personal.address} />
          <EditableField icon={Phone} label="Phone" value={playerInfo.personal.phone} />
          <EditableField icon={Mail} label="Email" value={playerInfo.personal.email} />
          <EditableField icon={FileText} label="CPF" value={playerInfo.personal.cpf} />
          <EditableField icon={Wallet} label="QIWI" value={playerInfo.personal.qiwi} />
        </div>

        {/* Даты и таймлайны */}
        <div className={`rounded-xl p-4 border shadow-sm flex flex-col gap-1 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Calendar className="w-4 h-4" /> Timelines & Dates
          </h3>
          
          <div className="space-y-2 mt-1">
            <div className={`flex justify-between items-center p-2 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <span className="text-[11px] uppercase tracking-wider text-gray-500">Registration</span>
              <span className="text-xs font-mono">{playerInfo.dates.registration}</span>
            </div>
            
            {/* Дата рождения с логикой на возраст */}
            <div className={`flex justify-between items-center p-2 rounded-lg border transition-colors group hover:bg-white/5 ${isUnderage ? 'border-red-500/30 bg-red-500/5' : darkMode ? 'border-transparent bg-white/5' : 'border-transparent bg-gray-50'}`}>
              <span className="text-[11px] uppercase tracking-wider text-gray-500">Date of Birth</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold ${isUnderage ? 'text-red-500' : ''}`}>
                  {playerInfo.dates.dob} ({age} y.o.)
                </span>
                <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-indigo-500/20 text-indigo-400">
                  <Pencil className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className={`flex justify-between items-center p-2 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <span className="text-[11px] uppercase tracking-wider text-gray-500">First Deposit</span>
              <span className="text-xs font-mono">{playerInfo.dates.firstDeposit}</span>
            </div>
            <div className={`flex justify-between items-center p-2 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <span className="text-[11px] uppercase tracking-wider text-gray-500">Last Deposit</span>
              <span className="text-xs font-mono">{playerInfo.dates.lastDeposit}</span>
            </div>
            <div className={`flex justify-between items-center p-2 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <span className="text-[11px] uppercase tracking-wider text-gray-500">Last Activity</span>
              <span className="text-xs font-mono font-bold text-indigo-400">{playerInfo.dates.lastActivity}</span>
            </div>
          </div>
        </div>

        {/* AI Scoring & Device */}
        <div className={`rounded-xl p-4 border shadow-sm flex flex-col gap-3 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between border-b pb-3 border-dashed border-gray-600">
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Zap className="w-4 h-4" /> AI Scoring
            </h3>
            <span className="text-2xl font-black text-emerald-400">{playerInfo.aiScoring.score}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {playerInfo.aiScoring.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{tag}</span>
            ))}
          </div>

          <div className="mt-2 space-y-1">
            <div className="text-[10px] uppercase text-gray-500 mb-1">Device Details</div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="text-[10px] p-1.5 rounded bg-white/5"><span className="text-gray-500">IP:</span> <span className="font-mono text-gray-300">{playerInfo.aiScoring.device.ip}</span></div>
              <div className="text-[10px] p-1.5 rounded bg-white/5"><span className="text-gray-500">Mask:</span> <span className="font-mono text-gray-300">{playerInfo.aiScoring.device.mask}</span></div>
              <div className="text-[10px] p-1.5 rounded bg-white/5"><span className="text-gray-500">FP:</span> <span className="font-mono text-gray-300">{playerInfo.aiScoring.device.fingerprint}</span></div>
              <div className="text-[10px] p-1.5 rounded bg-white/5"><span className="text-gray-500">Shield:</span> <span className="font-mono text-gray-300">{playerInfo.aiScoring.device.shieldId}</span></div>
              <div className="col-span-2 text-[10px] p-1.5 rounded bg-white/5"><span className="text-gray-500">Seno:</span> <span className="font-mono text-gray-300">{playerInfo.aiScoring.device.seno}</span></div>
              <div className="col-span-2 text-[10px] p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 mt-1">
                Quints QTag: {playerInfo.aiScoring.quintsQTag}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* СРЕДНИЙ РЯД: График и Департаменты */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* График Динамики (Balance / Income) */}
        <div className={`lg:col-span-3 rounded-xl p-4 border shadow-sm ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Financial Dynamics
            </h3>
            <div className="flex bg-white/5 rounded-lg p-0.5">
              <button className="px-2 py-1 text-[10px] rounded bg-white/10 shadow text-white">Week</button>
              <button className="px-2 py-1 text-[10px] rounded text-gray-400 hover:text-white">Month</button>
              <button className="px-2 py-1 text-[10px] rounded text-gray-400 hover:text-white">All</button>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 10}} tickLine={false} axisLine={false} stroke="#888" />
                
                {/* Левая ось для Баланса */}
                <YAxis yAxisId="left" tick={{fontSize: 10}} tickLine={false} axisLine={false} stroke="#888" />
                {/* Правая ось для Дохода */}
                <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10}} tickLine={false} axisLine={false} stroke="#888" />
                
                <Tooltip 
                  contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                <Line yAxisId="left" type="monotone" dataKey="balance" name="Balance (R$)" stroke="#818cf8" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                <Line yAxisId="right" type="monotone" dataKey="income" name="Overall Income (R$)" stroke="#34d399" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Отделы (Департаменты) */}
        <div className={`rounded-xl p-4 border shadow-sm flex flex-col gap-3 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <ShieldCheck className="w-4 h-4" /> Departments Review
          </h3>
          
          <div className={`p-3 rounded-lg flex flex-col gap-1 border border-dashed ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Casino Fraud</span>
              <StatusIcon status={playerInfo.departments.casino.status} />
            </div>
            <span className="text-[10px] text-gray-400">{playerInfo.departments.casino.text}</span>
          </div>

          <div className={`p-3 rounded-lg flex flex-col gap-1 border border-dashed ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Risk / Payment</span>
              <StatusIcon status={playerInfo.departments.rpf.status} />
            </div>
            <span className="text-[10px] text-gray-400">{playerInfo.departments.rpf.text}</span>
          </div>

          <div className={`p-3 rounded-lg flex flex-col gap-1 border border-dashed ${darkMode ? 'border-gray-700 bg-white/5' : 'border-gray-300 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Sportbook</span>
              <StatusIcon status={playerInfo.departments.sportbook.status} />
            </div>
            <span className="text-[10px] text-gray-400">{playerInfo.departments.sportbook.text}</span>
          </div>
        </div>

      </div>

      {/* НИЖНИЙ РЯД: Верификация и Документы */}
      <div className={`rounded-xl p-4 border shadow-sm ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <FileText className="w-4 h-4" /> Verification & Documents
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Статусы */}
          <div className="space-y-3">
            <div className={`p-3 rounded-lg flex items-center justify-between border ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
              <span className="text-xs font-medium text-emerald-500">Sumsub Status</span>
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> {playerInfo.verification.sumsub}</span>
            </div>
            <div className={`p-3 rounded-lg flex items-center justify-between border ${darkMode ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
              <span className="text-xs font-medium text-amber-500">Internal Docs Status</span>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> {playerInfo.verification.internal}</span>
            </div>
          </div>

          {/* Журнал документов */}
          <div>
            <div className="text-[10px] uppercase text-gray-500 mb-2 font-semibold">Documents Log</div>
            <div className="space-y-2">
              {playerInfo.verification.docs.map((doc, i) => (
                <div key={i} className={`flex items-center justify-between p-2 rounded-lg text-[11px] ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${doc.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {doc.status}
                    </span>
                    <span className="font-medium text-gray-300">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <span>by {doc.operator}</span>
                    <span className="font-mono">{doc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
