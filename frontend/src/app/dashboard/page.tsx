import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { Car, Heart, SlidersHorizontal, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DashboardOverviewPage() {
  const activeListings = MOCK_VEHICLES.slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A3039] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Portfolio Overview</h1>
          <p className="text-xs text-[#A1A8B3] mt-1">Welcome back, Alexander. Track your inquiries and active vehicles.</p>
        </div>

        <Link
          href="/dashboard/create-listing"
          className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#E55F00] transition-colors self-start"
        >
          + Add New Vehicle
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Active Listings</span>
          <p className="text-2xl font-extrabold text-white">2</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Saved Cars</span>
          <p className="text-2xl font-extrabold text-white">5</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Unread Inquiries</span>
          <p className="text-2xl font-extrabold text-[#FF6B00]">3</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Escrow Deposits</span>
          <p className="text-2xl font-extrabold text-white">$45,000</p>
        </div>
      </div>

      {/* Active Listings Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Your Listed Vehicles</h3>
          <Link href="/dashboard/listings" className="text-xs text-[#FF6B00] hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {activeListings.map((veh) => (
            <div
              key={veh.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl gap-4"
            >
              <div className="flex items-center gap-4">
                <img src={veh.images[0]} alt={veh.title} className="w-20 h-14 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold text-white text-sm">{veh.title}</h4>
                  <p className="text-xs text-[#A1A8B3] mt-0.5">${veh.price.toLocaleString()} • {veh.mileage.toLocaleString()} mi</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live in Market
                </span>
                <Link
                  href={`/dashboard/edit-listing?id=${veh.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#14181E] border border-[#2A3039] text-xs font-semibold text-white hover:border-white transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

