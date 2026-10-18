import React, { useState } from "react";
import { VerificationQuery } from "../types";
import {
  History,
  Trash2,
  Search,
  ChevronRight,
  Sparkles,
  Calendar,
  ExternalLink,
  ShieldCheck,
  FileText,
  Clock,
} from "lucide-react";

interface HistoryDrawerProps {
  history: VerificationQuery[];
  onSelectQuery: (query: VerificationQuery) => void;
  onClearHistory: () => void;
  onDeleteQuery: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelectQuery,
  onClearHistory,
  onDeleteQuery,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter(
    (item) =>
      item.queryText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Fraud Verification Chat History</h2>
            <p className="text-xs text-slate-500">
              Access your saved statutory reports, dealing scripts, and citation logs
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-xl border border-red-200 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past fraud checks, categories, or rules..."
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-slate-50/50"
          />
        </div>
      )}

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700 mb-1">
            {history.length === 0 ? "No Chat History Yet" : "No Matching Verification Found"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {history.length === 0
              ? "Every time you verify a fraud scenario, train ticket fine, or banking fee, your reports will be saved here."
              : "Try searching with a different keyword or clear the search input."}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-2xl shadow-xs transition-all flex items-start justify-between gap-4 group cursor-pointer"
              onClick={() => onSelectQuery(item)}
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    📍 {item.country} ({item.language})
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-emerald-900 transition-colors">
                  "{item.queryText}"
                </p>

                {item.sources && item.sources.length > 0 && (
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {item.sources.length} Verified Government Citations Grounded
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteQuery(item.id);
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="p-2 bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 rounded-xl transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
