'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';
import { SlidersHorizontal, ArrowRight } from 'lucide-react';

export default function MyComparisonsPage() {
  const { comparedIds } = useSavedVehicles();
  const comparedVehicles = MOCK_VEHICLES.filter((v) => comparedIds.includes(v.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-[#DCE3EC]">
        <div>
          <h1 className="text-2xl font-bold text-[#14243A]">Saved Comparisons</h1>
          <p className="text-xs text-[#64748B] mt-1">Quick access to your active comparison models</p>
        </div>

        <Link
          href="/compare"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F36B32] text-white text-xs font-bold hover:bg-[#DE561D] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Launch Comparison Matrix</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {comparedVehicles.map((veh) => (
          <div key={veh.id} className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl space-y-3">
            <img src={veh.images[0]} alt={veh.title} className="w-full h-32 object-cover rounded-lg" />
            <div>
              <h4 className="font-bold text-[#14243A] text-sm line-clamp-1">{veh.title}</h4>
              <p className="text-xs text-[#F36B32] font-bold mt-0.5">${veh.price.toLocaleString()}</p>
            </div>
            <Link
              href="/compare"
              className="block text-center py-2 bg-[#F0F4F8] border border-[#DCE3EC] text-xs font-semibold text-[#14243A] rounded-lg hover:border-white transition-colors"
            >
              Compare Side-by-Side
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

