"use client"

import { useState } from "react"
import { usePlayerStore } from "../layout"
import { Monitor, Smartphone, ChevronDown, ChevronUp, AlertCircle, Search } from "lucide-react"

// --- МОКОВЫЕ ДАННЫЕ (Расширенные под новые требования) ---
// Мы создаем массив транзакций, объединяющий спорт, казино и платежи из HTML-референсов
const transactions = [
  {
    id: "tx_1",
    dateGroup: "26 March 2026",
    time: "13:28:22",
    device: "Web",
    type: "withdrawal",
    category: "payment",
    title: "Withdrawal",
    subtitle: "ID 440819378",
    statusTitle: "Declined",
    statusSubtitle: "Bova • P2P • Available • Credit Cards 2204... • Алена Кабак",
    statusColor: "text-red-500",
    balance: 256850.00,
    amountLabel: "+75 000.00 RUB",
    amountColor: "text-emerald-500",
    labels: [
      { text: "M", type: "danger" }
    ],
    // Данные для выпадающей таблицы Payments Table
    paymentDetails: [
      { method: "BANK_WIRE", purse: "2204...6116 (1)", owner: "Алена Кабак", firstDep: "10.05.26", lastDep: "10.05.26", lastWith: "10.05.26", depSum: "0.00", withSum: "75 000.00", isCurrent: true }
    ]
  },
  {
    id: "tx_2",
    dateGroup: "25 March 2026",
    time: "18:56:09",
    device: "Web",
    type: "bonus",
    category: "bonus",
    title: "Sport Bonus Write-Off",
    subtitle: "ID 28265704",
    statusTitle: "Esports 200% Reload 2026",
    statusSubtitle: "✓ Successful • Withdrawal bonus to main account",
    statusColor: "text-emerald-500",
    balance: 100000.00,
    amountLabel: "+100 000.00 RUB",
    amountColor: "text-emerald-500",
    wager: "S"
  },
  {
    id: "tx_3",
    dateGroup: "25 March 2026",
    time: "14:24:10",
    device: "App",
    type: "sport",
    category: "sport",
    title: "Bet Single • Prematch",
    subtitle: "ID 133410352534",
    statusTitle: "Odd 1.62",
    statusSubtitle: "Lost",
    statusColor: "text-red-500",
    balance: 196850.00,
    amountLabel: "−40 000.00 RUB",
    amountColor: "text-red-500",
    sportDetails: { event: "Киберспорт - Dota 2 - ESL One", market: "BB Team - GamerLegion - Фора", runner: "2 (+1.5)" }
  },
  {
    id: "tx_4",
    dateGroup: "25 March 2026",
    time: "07:06:00",
    device: "Web",
    type: "withdrawal",
    category: "payment",
    title: "Withdrawal",
    subtitle: "ID 444699767",
    statusTitle: "Executed",
    statusSubtitle: "MonetixPix • Available • Viana Fernanda",
    statusColor: "text-emerald-500",
    balance: 171.10,
    amountLabel: "-100.00 BRL",
    amountColor: "text-red-500",
    labels: [
      { text: "New wallet", type: "info" },
      { text: "M", type: "danger" },
      { text: "Check Purse", type: "warning", isClickable: true } // Кликабельный лейбл для интерактива
    ],
    paymentDetails: [
      { method: "BANK_WIRE", purse: "119...8626 (2)", owner: "Viana Fernanda", firstDep: "10.05.26", lastDep: "12.05.26", lastWith: "12.05.26", depSum: "0.00", withSum: "131.10", isCurrent: true, flag: "Check" }
    ]
  },
  {
    id: "tx_5",
    dateGroup: "24 March 2026",
    time: "04:08:08",
    device: "Web",
    type: "casino",
    category: "casino",
    title: "Casino • Evolution",
    subtitle: "7 sessions • 04:08:08–06:15:57",
    statusTitle: "Stake 460.00 BRL • Win sum 417.35 BRL",
    statusSubtitle: "Avg. Stake 23.00 BRL • RTP 90.73%",
    statusColor: "text-gray-500",
    balance: 1160.00,
    amountLabel: "-42.65 BRL",
    amountColor: "text-red-500",
    casinoDetails: [
      { time: "06:15:33", game: "Dragon Dragon", rounds: "1 round", stake: 15.00, win: 9.75, rtp: "65.00%", bal: 139.10, diff: -5.25 },
      { time: "06:13:21", game: "Brazilian Bac Bo", rounds: "3 rounds", stake: 60.00, win: 97.00, rtp: "161.67%", bal: 125.60, diff: 37.00 },
    ]
  },
  {
    id: "tx_6",
    dateGroup: "24 March 2026",
    time: "02:48:45",
    device: "Web",
    type: "deposit",
    category: "deposit",
    title: "Deposit",
    subtitle: "ID 444691532",
    statusTitle: "Executed",
    statusSubtitle: "ID Order: 67689692908844",
    statusColor: "text-emerald-500",
    balance: 0.00,
    amountLabel: "+200.00 BRL",
    amountColor: "text-emerald-500",
    labels: [
      { text: "Change Password", type: "danger" },
      { text: "New Device", type: "warning" }
    ]
  }
]

export default function HistoryPage() {
  // Получаем функции и состояние из глобального контекста
  const { darkMode, addLog } = usePlayerStore()
  // Локальный стейт для управления раскрытием аккордеонов (детализацией транзакций)
  const [expandedRows, setExpandedRows] = useState<string[]>([])

  // Функция переключения состояния строки (открыто/закрыто)
  const toggleRow = (id: string) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  // Функция-обработчик клика по подозрительным лейблам (Связь с Audit Log)
  const handleLabelClick = (e: React.MouseEvent, label: string, txId: string) => {
    e.stopPropagation() // Останавливаем всплытие, чтобы не открыть дропдаун
    // Записываем действие в глобальный лог
    addLog(`Investigated Flag`, `None`, label, "Operator #5")
    alert(`Флаг "${label}" отправлен в Audit Log для транзакции ${txId}!`)
  }

  // Хелпер для форматирования валюты
  const formatCur = (val: number) => val.toLocaleString('en-US', { minimumFractionDigits: 2 })

  // Функция для определения цветовой схемы строки в зависимости от типа транзакции
  const getRowColors = (category: string) => {
    switch (category) {
      case 'casino':
        return darkMode ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-[#f0f9eb] border-[#67c23a]'
      case 'bonus':
        return darkMode ? 'bg-blue-950/20 border-blue-500/50' : 'bg-[#d9ecff] border-[#409eff]'
      case 'deposit':
        return darkMode ? 'bg-amber-950/20 border-amber-500/50' : 'bg-[#faecd8] border-[#e6a23c]'
      case 'payment': // Withdrawal
        return darkMode ? 'bg-slate-800/50 border-teal-500/50' : 'bg-white border-[#1fb3aa]'
      case 'sport':
      default:
        return darkMode ? 'bg-slate-800/50 border-slate-600' : 'bg-white border-[#c0c4cc]'
    }
  }

  // Группировка транзакций по дате
  const groupedTransactions = transactions.reduce((acc, tx) => {
    if (!acc[tx.dateGroup]) acc[tx.dateGroup] = []
    acc[tx.dateGroup].push(tx)
    return acc
  }, {} as Record<string, typeof transactions>)

  return (
    <div className="space-y-4">
      {/* 
        ===== HEADER КОЛОНОК ===== 
        Реализуем жесткую сетку, как в HTML-референсе. 
        Ширины зафиксированы: 77px, 165px, 102px, 130px, 40px. 
      */}
      <div className={`flex items-center px-4 py-2 border-b text-[9px] font-bold uppercase tracking-wider ${darkMode ? 'border-white/10 text-slate-500 bg-slate-800/50' : 'border-[#ebeef5] text-[#94a3b8] bg-[#f7fbff]'}`}>
        <div className="w-[77px] shrink-0 mr-3"></div>
        <div className="flex flex-1 min-w-0 pr-3">
          <div className="w-[165px] shrink-0 pr-4">Type</div>
          <div className={`w-px mx-2 shrink-0 ${darkMode ? 'bg-white/10' : 'bg-[#ebeef5]'}`} />
          <div className="flex-1 min-w-0">Status</div>
        </div>
        <div className="flex items-baseline">
          <div className="w-[102px] shrink-0 text-right mr-4">Av.Bal.</div>
          <div className="w-[130px] shrink-0 text-right">Amount</div>
        </div>
        <div className="w-[40px] shrink-0 text-right ml-2">Wager</div>
      </div>

      {/* ===== СПИСОК ТРАНЗАКЦИЙ ===== */}
      <div className="flex flex-col gap-4">
        {Object.entries(groupedTransactions).map(([date, txs]) => (
          <div key={date} className="flex flex-col gap-1.5">
            {/* Разделитель даты */}
            <div className={`text-sm font-semibold ml-3 mt-1 mb-1 ${darkMode ? 'text-slate-300' : 'text-[#303133]'}`}>
              {date}
            </div>

            {/* Маппинг транзакций внутри даты */}
            {txs.map(tx => {
              const isExpanded = expandedRows.includes(tx.id)
              const rowColors = getRowColors(tx.category)

              return (
                <div key={tx.id} className="flex flex-col">
                  {/* ОСНОВНАЯ СТРОКА ТРАНЗАКЦИИ */}
                  <div 
                    onClick={() => toggleRow(tx.id)}
                    className={`flex items-center min-h-[69px] p-2 rounded-xl border border-l-4 cursor-pointer transition-all ${rowColors}`}
                  >
                    {/* 1. Время и Девайс (w-[77px]) */}
                    <div className="w-[77px] shrink-0 mr-3 flex flex-col justify-center">
                      <div className={`text-[13.5px] font-medium tracking-tight ${darkMode ? 'text-slate-300' : 'text-[#606266]'}`}>{tx.time}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-500' : 'text-[#909399]'}`}>{tx.device}</span>
                        {tx.device === 'Web' ? <Monitor className={`w-3 h-3 ${darkMode ? 'text-slate-500' : 'text-[#909399]'}`} /> : <Smartphone className={`w-3 h-3 ${darkMode ? 'text-slate-500' : 'text-[#909399]'}`} />}
                      </div>
                    </div>

                    {/* 2. Основной блок: Тип и Статус */}
                    <div className="flex flex-1 min-w-0 pr-3 h-full items-center">
                      {/* Тип (w-[165px]) */}
                      <div className="w-[165px] shrink-0 pr-4 flex flex-col justify-center">
                        <div className={`text-[13px] font-medium truncate ${darkMode ? 'text-slate-200' : 'text-[#303133]'}`}>
                          {tx.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 truncate ${darkMode ? 'text-slate-400' : 'text-[#606266]'}`}>
                          {tx.subtitle}
                        </div>
                      </div>

                      {/* Вертикальный разделитель */}
                      <div className={`w-px h-8 mx-2 shrink-0 ${darkMode ? 'bg-white/10' : 'bg-[#ebeef5]'}`} />

                      {/* Статус и Детали (flex-1) */}
                      <div className="flex-1 min-w-0 overflow-hidden flex flex-col justify-center pl-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[13px] font-medium ${darkMode ? 'text-slate-200' : 'text-[#303133]'}`}>
                            {tx.statusTitle}
                          </span>
                          
                          {/* Рендер бейджей/лейблов (New Wallet, M, Check Purse) */}
                          {tx.labels?.map((l, idx) => (
                            <span 
                              key={idx} 
                              onClick={l.isClickable ? (e) => handleLabelClick(e, l.text, tx.id) : undefined}
                              className={`px-1.5 py-0.5 text-[10px] font-medium rounded border ${
                                l.type === 'danger' ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30 dark:border-red-500/30' :
                                l.type === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-500/30' :
                                'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-950/30 dark:border-teal-500/30'
                              } ${l.isClickable ? 'cursor-pointer hover:opacity-80 flex items-center gap-1 shadow-sm' : ''}`}
                            >
                              {l.isClickable && <Search className="w-2.5 h-2.5" />}
                              {l.text}
                            </span>
                          ))}
                        </div>
                        <div className={`text-[11px] mt-0.5 truncate ${darkMode ? 'text-slate-400' : 'text-[#606266]'}`}>
                          {tx.statusSubtitle}
                        </div>
                      </div>
                    </div>

                    {/* 3. Финансовый блок: Баланс и Изменение */}
                    <div className="flex items-center h-full">
                      {/* Баланс (w-[102px]) */}
                      <div className={`w-[102px] shrink-0 text-right mr-4 text-[12px] font-medium tabular-nums ${darkMode ? 'text-slate-300' : 'text-[#606266]'}`}>
                        {formatCur(tx.balance)}
                      </div>
                      
                      {/* Вертикальный разделитель */}
                      <div className={`w-px h-8 shrink-0 ${darkMode ? 'bg-white/10' : 'bg-[#ebeef5]'}`} />
                      
                      {/* Сумма транзакции (w-[130px]) */}
                      <div className={`w-[130px] shrink-0 text-right pl-4 text-[12px] font-medium tabular-nums ${tx.amountColor}`}>
                        {tx.amountLabel}
                      </div>
                    </div>

                    {/* 4. Вейджер / Индикатор (w-[40px]) */}
                    <div className="w-[40px] shrink-0 flex justify-end ml-2">
                      {tx.wager && <span className={`text-[12px] font-medium ${darkMode ? 'text-slate-400' : 'text-[#606266]'}`}>{tx.wager}</span>}
                      {/* Иконка стрелочки для раскрытия */}
                      {(tx.paymentDetails || tx.sportDetails || tx.casinoDetails) && (
                        <div className="ml-2">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* РАСКРЫВАЮЩИЙСЯ БЛОК (DROPDOWN) */}
                  {isExpanded && (
                    <div className={`mt-[1px] mx-1 mb-3 p-3 rounded-b-xl border-t-0 border ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#fafbfc] border-[#ebeef5]'}`}>
                      
                      {/* Дропдаун для ПЛАТЕЖЕЙ (Payments Table) */}
                      {tx.paymentDetails && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-[11px] min-w-[700px]">
                            <thead className={`border-b ${darkMode ? 'border-slate-700 text-slate-500' : 'border-[#ebeef5] text-[#94a3b8]'}`}>
                              <tr>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider">Method</th>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider">Purse</th>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider">Owner</th>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider">First Dep.</th>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider">Last With.</th>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider text-right">Deposits</th>
                                <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider text-right">Withdrawals</th>
                              </tr>
                            </thead>
                            <tbody className={darkMode ? 'text-slate-300' : 'text-[#606266]'}>
                              {tx.paymentDetails.map((pd, i) => (
                                <tr key={i} className="border-b border-dashed border-slate-200 dark:border-slate-700 last:border-0">
                                  <td className="py-2 font-mono">{pd.method}</td>
                                  <td className="py-2 font-mono flex items-center gap-2">
                                    {pd.purse}
                                    {pd.flag && <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 text-amber-600 rounded dark:bg-amber-900/30 dark:text-amber-400">{pd.flag}</span>}
                                  </td>
                                  <td className="py-2">{pd.owner || "—"}</td>
                                  <td className="py-2">{pd.firstDep}</td>
                                  <td className="py-2">{pd.lastWith}</td>
                                  <td className="py-2 text-right">{pd.depSum}</td>
                                  <td className="py-2 text-right font-medium text-teal-500">{pd.withSum}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Дропдаун для СПОРТА */}
                      {tx.sportDetails && (
                        <div className="flex">
                          <div className="w-[77px] mr-3 shrink-0" />
                          <div className="flex-1">
                            <table className="w-full text-left text-[11px]">
                              <thead className={`border-b ${darkMode ? 'border-slate-700 text-slate-500' : 'border-[#ebeef5] text-[#94a3b8]'}`}>
                                <tr>
                                  <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider w-[40%]">Event</th>
                                  <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider w-[40%]">Market</th>
                                  <th className="pb-2 font-semibold uppercase text-[9px] tracking-wider w-[20%]">Runner</th>
                                </tr>
                              </thead>
                              <tbody className={`pt-2 ${darkMode ? 'text-slate-300' : 'text-[#303133]'}`}>
                                <tr>
                                  <td className="pt-2">{tx.sportDetails.event}</td>
                                  <td className="pt-2 text-slate-500">{tx.sportDetails.market}</td>
                                  <td className="pt-2 font-medium text-blue-500">{tx.sportDetails.runner}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Дропдаун для КАЗИНО (Список раундов) */}
                      {tx.casinoDetails && (
                        <div className="flex flex-col gap-2">
                          {tx.casinoDetails.map((round, i) => (
                            <div key={i} className={`flex items-center py-2 border-b last:border-0 ${darkMode ? 'border-slate-700' : 'border-[#d4edda]'}`}>
                              <div className={`w-[77px] mr-3 shrink-0 text-[11px] font-mono ${darkMode ? 'text-slate-400' : 'text-[#64748b]'}`}>{round.time}</div>
                              <div className="flex-1 pr-4">
                                <div className={`text-[12px] font-medium ${darkMode ? 'text-slate-200' : 'text-[#333943]'}`}>{round.game}</div>
                                <div className={`text-[10px] mt-0.5 ${darkMode ? 'text-slate-500' : 'text-[#666d78]'}`}>{round.rounds} • RTP: <span className={parseFloat(round.rtp) > 100 ? 'text-red-500' : ''}>{round.rtp}</span></div>
                              </div>
                              <div className={`w-[102px] shrink-0 text-right mr-4 text-[11px] tabular-nums ${darkMode ? 'text-slate-300' : 'text-[#303741]'}`}>{formatCur(round.bal)}</div>
                              <div className={`w-[130px] shrink-0 text-right text-[11px] font-medium tabular-nums ${round.diff > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{round.diff > 0 ? '+' : ''}{formatCur(round.diff)}</div>
                              <div className="w-[40px] shrink-0 ml-2" />
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
