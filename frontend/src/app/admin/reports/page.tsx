import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Download } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DCE3EC] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14243A]">Platform Financial Telemetry & Reports</h1>
          <p className="text-xs text-[#64748B] mt-1">Gross merchandise volume (GMV), escrow liquidity, and commission payouts</p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] text-[#14243A] text-xs font-bold rounded-xl hover:border-white">
          <Download className="w-4 h-4" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">Total Platform GMV (YTD)</span>
          <p className="text-3xl font-extrabold text-[#F36B32]">$184.5M</p>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% YoY growth
          </span>
        </div>

        <div className="p-6 bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">Marketplace Commission (2.5%)</span>
          <p className="text-3xl font-extrabold text-[#14243A]">$4.61M</p>
          <span className="text-xs text-[#64748B]">Net transaction fees collected</span>
        </div>

        <div className="p-6 bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">Escrow Reserve Safety Ratio</span>
          <p className="text-3xl font-extrabold text-emerald-400">100%</p>
          <span className="text-xs text-[#64748B]">Fully backed FDIC insurance</span>
        </div>
      </div>
    </div>
  );
}

