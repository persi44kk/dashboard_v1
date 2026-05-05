"use client"

import { useTheme } from "../layout"

export default function DocumentsPage() {
  const { darkMode } = useTheme()

  const documents = [
    { name: "ID Front", type: "image/jpeg", status: "pending", uploaded: "Not uploaded", size: "-" },
    { name: "ID Back", type: "image/jpeg", status: "pending", uploaded: "Not uploaded", size: "-" },
    { name: "Selfie", type: "image/jpeg", status: "pending", uploaded: "Not uploaded", size: "-" },
    { name: "Proof of Address", type: "application/pdf", status: "pending", uploaded: "Not uploaded", size: "-" },
  ]

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className={`rounded-2xl p-8 border-2 border-dashed transition-colors duration-300 ${darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-gray-50'}`}>
        <div className="text-center">
          <svg className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG, PDF (max 10MB)
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className={`rounded-2xl overflow-hidden transition-colors duration-300 ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Required Documents</h3>
        </div>

        <div className="divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-100'}">
          {documents.map((doc, idx) => (
            <div key={idx} className={`p-4 flex items-center justify-between transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  {doc.type.includes('image') ? (
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{doc.name}</div>
                  <div className="text-xs text-gray-500">{doc.uploaded}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  Awaiting
                </span>
                <button className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${darkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                  Upload
                </button>
              </div>
            </div>
          ))}
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
