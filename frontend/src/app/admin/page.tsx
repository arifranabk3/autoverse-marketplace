import React from 'react';
import { MOCK_VEHICLES, MOCK_DEALERS } from '@/data/mockData';
import { ShieldCheck, AlertTriangle, Users, Car, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Platform Governance Command</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Super Admin oversight across all listings, transactions, and dealership fraud checks</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Total Global Listings</span>
          <p className="text-2xl font-extrabold text-white">1,482</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Verified Dealers</span>
          <p className="text-2xl font-extrabold text-white">128</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Active Escrow Vol</span>
          <p className="text-2xl font-extrabold text-[#FF6B00]">$28.4M</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-red-400">Flagged For Review</span>
          <p className="text-2xl font-extrabold text-red-400">2</p>
        </div>
      </div>

      {/* Flagged Audit Queue */}
      <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Pending VIN Audit & Physical Inspection Queue</span>
        </h3>

        <div className="space-y-3">
          <div className="p-4 bg-[#14181E] border border-[#2A3039] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">VIN Telemetry Mismatch</span>
              <h4 className="font-bold text-white text-sm">2023 Ferrari SF90 Stradale</h4>
              <p className="text-xs text-[#A1A8B3]">Seller: Private Consignor • DME over-rev check pending</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold">Approve</button>
              <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

