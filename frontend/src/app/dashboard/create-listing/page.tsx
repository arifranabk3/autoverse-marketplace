'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const [created, setCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    setTimeout(() => {
      router.push('/dashboard/listings');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Create New Vehicle Listing</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Publish an exotic vehicle to the live marketplace</p>
      </div>

      {created ? (
        <div className="p-8 text-center bg-[#1B2028] border border-[#FF6B00]/40 rounded-2xl space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#FF6B00] mx-auto" />
          <h3 className="text-lg font-bold text-white">Listing Dispatched to Review</h3>
          <p className="text-xs text-[#A1A8B3]">Redirecting to your listings directory...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Make / Manufacturer</label>
              <input
                type="text"
                required
                placeholder="e.g. Porsche"
                className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Model & Trim</label>
              <input
                type="text"
                required
                placeholder="e.g. 911 GT3 RS Weissach"
                className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Year</label>
              <input
                type="number"
                required
                placeholder="2024"
                className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A8B3] mb-1">Listing Price (USD)</label>
              <input
                type="number"
                required
                placeholder="345000"
                className="w-full px-4 py-2 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-[#2A3039] rounded-xl p-6 text-center bg-[#1B2028]">
            <UploadCloud className="w-8 h-8 text-[#FF6B00] mx-auto mb-2" />
            <p className="text-xs text-white font-semibold">Upload 4K Exterior & Cockpit Photos</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm transition-all"
          >
            Publish Vehicle Listing
          </button>
        </form>
      )}
    </div>
  );
}

