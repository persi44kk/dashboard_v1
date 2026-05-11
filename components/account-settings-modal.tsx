"use client"

import { usePlayerStore } from "@/app/(dashboard)/layout"
import { useState } from "react"

interface AccountSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  const { darkMode, playerData, updatePlayerField } = usePlayerStore()
  
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto`}>
        <div className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl mt-8 mb-8 ${darkMode ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Settings</h2>
            <button onClick={onClose} className={`p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className={`overflow-y-auto max-h-[calc(100vh-200px)] px-6 py-6 space-y-6`}>
            {/* Account Information & Status */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Account Information & Status</h3>
              <div className={`space-y-4 p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div>
                  <label className={`text-sm font-medium block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Manual Status Override</label>
                  <select 
                    value={playerData.manualStatus}
                    onChange={(e) => updatePlayerField(null, 'manualStatus', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors ${darkMode ? 'bg-gray-800 border-white/10 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none`}
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
                      checked={playerData.exVIP}
                      onChange={(e) => updatePlayerField(null, 'exVIP', e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ex-VIP</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={playerData.exGold}
                      onChange={(e) => updatePlayerField(null, 'exGold', e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ex-Gold</span>
                  </label>
                </div>
              </div>
            </section>
            
            <section>
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm text-center">
                * Изменения статусов мгновенно применяются в хедере и записываются в Audit Log.
              </div>
            </section>
          </div>

          <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <button onClick={onClose} className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-indigo-600 hover:bg-indigo-700`}>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
