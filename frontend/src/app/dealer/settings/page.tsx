'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function DealerSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-2xl font-bold text-white">Dealership Profile & Concierge Config</h1>
        <p className="text-xs text-[#64748B] mt-1">Configure public dealership landing page, facility address, and lead alerts</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Dealership configuration updated.</span>
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
          <label className="block text-xs font-semibold text-[#64748B] mb-1">Dealership Business Name</label>
          <input
            type="text"
            defaultValue="Apex Prestige Motors"
            className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1">Physical Showroom Address</label>
          <input
            type="text"
            defaultValue="9405 Wilshire Blvd, Beverly Hills, CA 90212"
            className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1">Lead Dispatch Hotline Phone</label>
          <input
            type="tel"
            defaultValue="+1 (310) 555-0199"
            className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
          />
        </div>

        <button
          type="submit"
          className="py-2.5 px-6 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-xs"
        >
          Update Dealership Credentials
        </button>
      </form>
    </div>
  );
}

