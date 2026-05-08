"use client"

import { useState } from "react"
import { useTheme } from "./layout"

export default function PlayerInfoPage() {
  const { darkMode } = useTheme()
  const [piiVisible, setPiiVisible] = useState(false)

  const piiData = {
    phone: "+55 11 98765-4321",
    email: "romenilto.silva@gmail.com",
    cpf: "123.456.789-00",
  }

  const maskedData = {
    phone: "**************",
    email: "****************",
    cpf: "***.***.**-**",
  }

  return (
    <div className="max-w-2xl">
      <div className={`rounded-2xl p-6 transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Player Info
          </h2>
          <button
            onClick={() => setPiiVisible(!piiVisible)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm ${darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            <span>{piiVisible ? "Hide PII" : "Reveal PII"}</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Phone */}
          <div className="group">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Phone</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{piiVisible ? piiData.phone : maskedData.phone}</span>
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Email</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className={`font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{piiVisible ? piiData.email : maskedData.email}</span>
            </div>
          </div>

          {/* CPF */}
          <div className="group">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">CPF</label>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <span className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{piiVisible ? piiData.cpf : maskedData.cpf}</span>
            </div>
          </div>

          {/* Verification Status */}
          <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-3">
              Verification Status
            </label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Verified</span>
                </div>
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Verified</span>
                </div>
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>KYC Documents</span>
                </div>
                <span className="text-xs text-amber-400 font-medium">PENDING</span>
              </div>
            </div>
          </div>

          {/* Risk Score */}
          <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-3">Risk Assessment</label>
            <div className={`relative p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Fraud Score</span>
                <span className="text-2xl font-bold text-amber-400">67</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div className="h-full w-[67%] bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-600">Low</span>
                <span className="text-xs text-gray-600">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}
