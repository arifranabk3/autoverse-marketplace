'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function EditVehicleDealerPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Edit Inventory Unit</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Update pricing, mileage, or dealership assignment</p>
      </div>

      {saved ? (
        <div className="p-8 text-center bg-[#1B2028] border border-[#FF6B00]/40 rounded-2xl space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#FF6B00] mx-auto" />
          <h3 className="text-lg font-bold text-white">Vehicle Details Updated</h3>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
            setTimeout(() => router.push('/dealer/inventory'), 1200);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Vehicle Title</label>
            <input
              type="text"
              defaultValue="2024 Ferrari 296 GTB Assetto Fiorano"
              className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Current Mileage</label>
            <input
              type="number"
              defaultValue="2100"
              className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm"
          >
            Save Inventory Changes
          </button>
        </form>
      )}
    </div>
  );
}

