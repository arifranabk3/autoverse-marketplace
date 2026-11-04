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
      <div className="pb-6 border-b border-[#DCE3EC]">
        <h1 className="text-2xl font-bold text-[#14243A]">Create New Vehicle Listing</h1>
        <p className="text-xs text-[#64748B] mt-1">Publish an exotic vehicle to the live marketplace</p>
      </div>

      {created ? (
        <div className="p-8 text-center bg-[#FFFFFF] border border-[#F36B32]/40 rounded-2xl space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#F36B32] mx-auto" />
          <h3 className="text-lg font-bold text-[#14243A]">Listing Dispatched to Review</h3>
          <p className="text-xs text-[#64748B]">Redirecting to your listings directory...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Make / Manufacturer</label>
              <input
                type="text"
                required
                placeholder="e.g. Porsche"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Model & Trim</label>
              <input
                type="text"
                required
                placeholder="e.g. 911 GT3 RS Weissach"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Year</label>
              <input
                type="number"
                required
                placeholder="2024"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">Listing Price (USD)</label>
              <input
                type="number"
                required
                placeholder="345000"
                className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-[#DCE3EC] rounded-xl p-6 text-center bg-[#FFFFFF]">
            <UploadCloud className="w-8 h-8 text-[#F36B32] mx-auto mb-2" />
            <p className="text-xs text-[#14243A] font-semibold">Upload 4K Exterior & Cockpit Photos</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm transition-all"
          >
            Publish Vehicle Listing
          </button>
        </form>
      )}
    </div>
  );
}

