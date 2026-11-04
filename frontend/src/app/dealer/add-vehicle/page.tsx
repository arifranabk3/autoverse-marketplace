'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function AddVehiclePage() {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => {
      router.push('/dealer/inventory');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-2xl font-bold text-white">Add Showroom Unit</h1>
        <p className="text-xs text-[#64748B] mt-1">Ingest new vehicle inventory with automatic VIN decoding and syndicate</p>
      </div>

      {added ? (
        <div className="p-8 text-center bg-[#FFFFFF] border border-[#F36B32]/40 rounded-2xl space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#F36B32] mx-auto" />
          <h3 className="text-lg font-bold text-white">Vehicle Synced to Showroom</h3>
          <p className="text-xs text-[#64748B]">Redirecting to inventory dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">VIN (Automatic Decode)</label>
              <input
                type="text"
                required
                placeholder="ZFF94NHA9R0..."
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Make & Model</label>
              <input
                type="text"
                required
                placeholder="Ferrari 296 GTB"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">MSRP / Asking Price ($)</label>
              <input
                type="number"
                required
                placeholder="389000"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Powertrain / HP</label>
              <input
                type="text"
                required
                placeholder="819 HP Twin-Turbo Hybrid"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-[#E8EDF3] rounded-2xl p-6 text-center bg-[#FFFFFF]">
            <UploadCloud className="w-8 h-8 text-[#F36B32] mx-auto mb-2" />
            <p className="text-xs text-white font-semibold">Syndicate High-Resolution Dealer Photos</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm transition-all"
          >
            Add to Active Dealership Inventory
          </button>
        </form>
      )}
    </div>
  );
}

