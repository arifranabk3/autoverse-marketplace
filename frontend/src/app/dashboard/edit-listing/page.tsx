'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function EditListingPage() {
  const router = useRouter();
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdated(true);
    setTimeout(() => {
      router.push('/dashboard/listings');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-2xl font-bold text-white">Edit Vehicle Listing</h1>
        <p className="text-xs text-[#64748B] mt-1">Modify pricing, specifications or photos</p>
      </div>

      {updated ? (
        <div className="p-8 text-center bg-[#FFFFFF] border border-[#F36B32]/40 rounded-2xl space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#F36B32] mx-auto" />
          <h3 className="text-lg font-bold text-white">Listing Changes Saved</h3>
          <p className="text-xs text-[#64748B]">Returning to listings directory...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1">Title</label>
            <input
              type="text"
              defaultValue="2024 Porsche 911 GT3 RS"
              className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1">Asking Price (USD)</label>
            <input
              type="number"
              defaultValue="345000"
              className="w-full px-4 py-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm transition-all"
          >
            Update Listing Details
          </button>
        </form>
      )}
    </div>
  );
}

