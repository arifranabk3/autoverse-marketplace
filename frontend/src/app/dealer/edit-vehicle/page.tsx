'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function EditVehicleDealerPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#DCE3EC]">
        <h1 className="text-2xl font-bold text-[#14243A]">Edit Inventory Unit</h1>
        <p className="text-xs text-[#64748B] mt-1">Update pricing, mileage, or dealership assignment</p>
      </div>

      {saved ? (
        <div className="p-8 text-center bg-[#FFFFFF] border border-[#F36B32]/40 rounded-2xl space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#F36B32] mx-auto" />
          <h3 className="text-lg font-bold text-[#14243A]">Vehicle Details Updated</h3>
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
            <label className="block text-xs font-semibold text-[#64748B] mb-1">Vehicle Title</label>
            <input
              type="text"
              defaultValue="2024 Ferrari 296 GTB Assetto Fiorano"
              className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1">Current Mileage</label>
            <input
              type="number"
              defaultValue="2100"
              className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm"
          >
            Save Inventory Changes
          </button>
        </form>
      )}
    </div>
  );
}

