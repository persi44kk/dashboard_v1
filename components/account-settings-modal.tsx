"use client"

import { useState } from "react"
import { useTheme } from "@/app/(dashboard)/layout"

interface AccountSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  const { darkMode } = useTheme()
  
  // Form state
  const [manualStatus, setManualStatus] = useState("Normal")
  const [exVIP, setExVIP] = useState(false)
  const [exGold, setExGold] = useState(false)
  const [nickname, setNickname] = useState("")
  const [advancedStatus, setAdvancedStatus] = useState("")
  const [skinType, setSkinType] = useState("")
  const [collaboratorType, setCollaboratorType] = useState("")
  
  // Security state
  const [google2FA, setGoogle2FA] = useState(true)
  const [pinCode, setPinCode] = useState(true)
  
  // Payouts state
  const [minPayout, setMinPayout] = useState("0")
  const [maxPayout, setMaxPayout] = useState("1000")
  const [maxPayoutDaily, setMaxPayoutDaily] = useState("5000")
  const [maxPayoutWeekly, setMaxPayoutWeekly] = useState("10000")
  const [maxPayoutMonthly, setMaxPayoutMonthly] = useState("50000")
  const [maxPayoutsCount, setMaxPayoutsCount] = useState("30")
  
  // Restrictions state
  const [mailMessagingIgnore, setMailMessagingIgnore] = useState(false)
  const [depositBlocked, setDepositBlocked] = useState(false)
  const [payoutBlocked, setPayoutBlocked] = useState(false)
  const [withdrawalOTPDisabled, setWithdrawalOTPDisabled] = useState(false)
  const [doNotWithdraw, setDoNotWithdraw] = useState(false)
  const [accountHistoryBlocked, setAccountHistoryBlocked] = useState(false)
  const [bonusPointsEnabled, setBonusPointsEnabled] = useState(true)
  const [mayEncashPoints, setMayEncashPoints] = useState(true)
  const [hideAlertsOnPayment, setHideAlertsOnPayment] = useState(false)
  
  // Notifications state
  const [notifyDeposits, setNotifyDeposits] = useState(true)
  const [notifyWithdrawals, setNotifyWithdrawals] = useState(true)

  if (!isOpen) return null

  const payoutOptions = [
    "0", "1", "2", "5", "10", "20", "50", "100", "200", "500", 
    "1000", "1500", "2000", "2500", "3000", "4000", "5000", "6000",
    "7000", "8000", "9000", "10000"
  ]

  const daysOptions = Array.from({ length: 10 }, (_, i) => String(i + 1)).concat([
    "20", "30", "40", "50", "60", "70", "80", "90"
  ])

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto`}>
        <div className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl mt-8 mb-8 ${darkMode ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Settings</h2>
            <button
              onClick={onClose}
              className={`p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={`overflow-y-auto max-h-[calc(100vh-200px)] px-6 py-6 space-y-6`}>
            {/* A. Account Information & Status */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Account Information & Status</h3>
              <div className={`space-y-4 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div>
                  <label className={`text-sm font-medium block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Manual Status Override</label>
                  <select 
                    value={manualStatus}
                    onChange={(e) => setManualStatus(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    <option>VIP</option>
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Normal</option>
                    <option>Suspicious</option>
                  </select>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exVIP}
                      onChange={(e) => setExVIP(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ex-VIP</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exGold}
                      onChange={(e) => setExGold(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ex-Gold</span>
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'} focus:outline-none`}
                />

                <input
                  type="text"
                  placeholder="Advanced Status"
                  value={advancedStatus}
                  onChange={(e) => setAdvancedStatus(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'} focus:outline-none`}
                />

                <input
                  type="text"
                  placeholder="Skin Type"
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'} focus:outline-none`}
                />

                <input
                  type="text"
                  placeholder="Collaborator Type"
                  value={collaboratorType}
                  onChange={(e) => setCollaboratorType(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'} focus:outline-none`}
                />
              </div>
            </section>

            {/* B. Security & Authentication */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Security & Authentication</h3>
              <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <button className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'}`}>
                  Change Password
                </button>

                <div className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Google 2-Step Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {google2FA ? (
                      <>
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-emerald-500 font-medium">Enabled</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-red-500 font-medium">Disabled</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pin Code State</span>
                  <span className={`px-2.5 py-1 rounded text-xs font-medium ${pinCode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {pinCode ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </section>

            {/* C. Financial Limits (Payouts) */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Financial Limits (Payouts)</h3>
              <div className={`grid grid-cols-2 gap-3 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div>
                  <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Min Payout</label>
                  <select 
                    value={minPayout}
                    onChange={(e) => setMinPayout(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    {payoutOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Max Payout</label>
                  <select 
                    value={maxPayout}
                    onChange={(e) => setMaxPayout(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    {payoutOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Max Daily</label>
                  <select 
                    value={maxPayoutDaily}
                    onChange={(e) => setMaxPayoutDaily(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    {payoutOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Max Weekly</label>
                  <select 
                    value={maxPayoutWeekly}
                    onChange={(e) => setMaxPayoutWeekly(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    {payoutOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Max Monthly</label>
                  <select 
                    value={maxPayoutMonthly}
                    onChange={(e) => setMaxPayoutMonthly(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    {payoutOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-medium block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Max Count (Days)</label>
                  <select 
                    value={maxPayoutsCount}
                    onChange={(e) => setMaxPayoutsCount(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${darkMode ? 'bg-gray-800 border-white/10 text-white focus:border-indigo-500/50' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'} focus:outline-none`}
                  >
                    {daysOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* D. Restrictions & Logic */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Restrictions & Logic</h3>
              <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                {[
                  { label: "Mail Messaging Ignore", value: mailMessagingIgnore, setter: setMailMessagingIgnore },
                  { label: "Deposit Blocked", value: depositBlocked, setter: setDepositBlocked },
                  { label: "Payout Blocked", value: payoutBlocked, setter: setPayoutBlocked },
                  { label: "Withdrawal OTP Disabled", value: withdrawalOTPDisabled, setter: setWithdrawalOTPDisabled },
                  { label: "Do Not Withdraw", value: doNotWithdraw, setter: setDoNotWithdraw },
                  { label: "Account History Blocked", value: accountHistoryBlocked, setter: setAccountHistoryBlocked },
                  { label: "Bonus Points Enabled", value: bonusPointsEnabled, setter: setBonusPointsEnabled },
                  { label: "May Encash Points by Himself", value: mayEncashPoints, setter: setMayEncashPoints },
                  { label: "Hide Alerts on Payment Details", value: hideAlertsOnPayment, setter: setHideAlertsOnPayment },
                ].map((item) => (
                  <label key={item.label} className="flex items-center justify-between p-3 rounded-lg cursor-pointer border border-dashed transition-colors hover:bg-white/5">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${item.value ? (darkMode ? 'bg-indigo-500 border-indigo-500' : 'bg-indigo-600 border-indigo-600') : (darkMode ? 'border-gray-600' : 'border-gray-300')}`}>
                      {item.value && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={item.value}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </section>

            {/* E. Notifications */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notifications</h3>
              <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer border border-dashed transition-colors hover:bg-white/5">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notify on Deposits</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${notifyDeposits ? (darkMode ? 'bg-indigo-500 border-indigo-500' : 'bg-indigo-600 border-indigo-600') : (darkMode ? 'border-gray-600' : 'border-gray-300')}`}>
                    {notifyDeposits && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyDeposits}
                    onChange={(e) => setNotifyDeposits(e.target.checked)}
                    className="hidden"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer border border-dashed transition-colors hover:bg-white/5">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notify on Withdrawals</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${notifyWithdrawals ? (darkMode ? 'bg-indigo-500 border-indigo-500' : 'bg-indigo-600 border-indigo-600') : (darkMode ? 'border-gray-600' : 'border-gray-300')}`}>
                    {notifyWithdrawals && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyWithdrawals}
                    onChange={(e) => setNotifyWithdrawals(e.target.checked)}
                    className="hidden"
                  />
                </label>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-indigo-600 hover:bg-indigo-700`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
