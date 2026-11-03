import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, DollarSign } from 'lucide-react';

export default function DealerAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Dealership Traffic & Sales Telemetry</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Real-time engagement, impression volume, and buyer lead conversions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#A1A8B3] text-xs">
            <span className="uppercase font-bold">Total Showroom Impressions</span>
            <Eye className="w-4 h-4 text-[#FF6B00]" />
          </div>
          <p className="text-3xl font-extrabold text-white">342,890</p>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
          </span>
        </div>

        <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#A1A8B3] text-xs">
            <span className="uppercase font-bold">Average Days on Market</span>
            <BarChart3 className="w-4 h-4 text-[#FF6B00]" />
          </div>
          <p className="text-3xl font-extrabold text-white">14.2 Days</p>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 3.2x faster than national exotic avg
          </span>
        </div>

        <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#A1A8B3] text-xs">
            <span className="uppercase font-bold">Escrow Settled Volume</span>
            <DollarSign className="w-4 h-4 text-[#FF6B00]" />
          </div>
          <p className="text-3xl font-extrabold text-[#FF6B00]">$6.85M</p>
          <span className="text-xs text-white/80">18 completed vehicle closings</span>
        </div>
      </div>

      <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white">Top Performing Vehicle Models</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#14181E] rounded-xl text-xs">
            <span className="font-bold text-white">2024 Porsche 911 GT3 RS</span>
            <span className="text-[#FF6B00] font-bold">14,290 Views • 48 Inquiries</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#14181E] rounded-xl text-xs">
            <span className="font-bold text-white">2024 Ferrari 296 GTB</span>
            <span className="text-[#FF6B00] font-bold">9,410 Views • 32 Inquiries</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#14181E] rounded-xl text-xs">
            <span className="font-bold text-white">2025 Aston Martin DBS 770</span>
            <span className="text-[#FF6B00] font-bold">8,150 Views • 26 Inquiries</span>
          </div>
        </div>
      </div>
    </div>
  );
}

