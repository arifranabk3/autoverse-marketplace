'use client';

import React, { useState } from 'react';
import { CheckCircle2, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Global Platform Governance Settings</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Configure transaction escrow requirements, API rate limits, and KYC enforcement</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Platform configuration updated globally.</span>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Marketplace Commission Rate (%)</label>
          <input
            type="number"
            step="0.1"
            defaultValue="2.5"
            className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Mandatory Escrow Threshold (USD)</label>
          <input
            type="number"
            defaultValue="50000"
            className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">DME ECU Diagnostic Audit Requirement</label>
          <select className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]">
            <option>Strict (Mandatory for all listings over $150k)</option>
            <option>Advisory</option>
          </select>
        </div>

        <button
          type="submit"
          className="py-2.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
        >
          Save Global Platform Rules
        </button>
      </form>
    </div>
  );
}

