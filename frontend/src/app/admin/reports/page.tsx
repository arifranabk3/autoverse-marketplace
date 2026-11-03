import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Download } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A3039] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Financial Telemetry & Reports</h1>
          <p className="text-xs text-[#A1A8B3] mt-1">Gross merchandise volume (GMV), escrow liquidity, and commission payouts</p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1B2028] border border-[#2A3039] text-white text-xs font-bold rounded-xl hover:border-white">
          <Download className="w-4 h-4" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Total Platform GMV (YTD)</span>
          <p className="text-3xl font-extrabold text-[#FF6B00]">$184.5M</p>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% YoY growth
          </span>
        </div>

        <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Marketplace Commission (2.5%)</span>
          <p className="text-3xl font-extrabold text-white">$4.61M</p>
          <span className="text-xs text-[#A1A8B3]">Net transaction fees collected</span>
        </div>

        <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Escrow Reserve Safety Ratio</span>
          <p className="text-3xl font-extrabold text-emerald-400">100%</p>
          <span className="text-xs text-[#A1A8B3]">Fully backed FDIC insurance</span>
        </div>
      </div>
    </div>
  );
}

