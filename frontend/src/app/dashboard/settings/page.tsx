'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Profile & Security Settings</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Manage collector verification, notification triggers, and authentication</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile preferences saved successfully.</span>
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
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Full Legal Name</label>
          <input
            type="text"
            defaultValue="Alexander Pierce"
            className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Email Address</label>
          <input
            type="email"
            defaultValue="alexander@piercecollection.com"
            className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">VIP Liaison Mobile</label>
          <input
            type="tel"
            defaultValue="+1 (310) 555-8822"
            className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        <button
          type="submit"
          className="py-2.5 px-6 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs transition-all"
        >
          Save Profile Updates
        </button>
      </form>
    </div>
  );
}

