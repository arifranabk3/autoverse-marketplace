import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { DollarSign, Car, Users, Eye, ArrowUpRight } from 'lucide-react';

export default function DealerOverviewPage() {
  const inventory = MOCK_VEHICLES.filter((v) => v.dealer.name.includes('Apex'));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A3039] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dealership Command Center</h1>
          <p className="text-xs text-[#A1A8B3] mt-1">Apex Prestige Motors • Beverly Hills Facility</p>
        </div>

        <Link
          href="/dealer/add-vehicle"
          className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#E55F00] transition-colors self-start"
        >
          + Add Inventory
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Active Vehicles</span>
          <p className="text-2xl font-extrabold text-white">42</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Total Showroom Value</span>
          <p className="text-2xl font-extrabold text-[#FF6B00]">$14.2M</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">30-Day Showroom Views</span>
          <p className="text-2xl font-extrabold text-white">184.2K</p>
        </div>

        <div className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#A1A8B3]">Active Qualified Leads</span>
          <p className="text-2xl font-extrabold text-emerald-400">28</p>
        </div>
      </div>

      {/* Recent Inventory Additions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Showroom Inventory Spotlight</h3>
          <Link href="/dealer/inventory" className="text-xs text-[#FF6B00] hover:underline">
            View All 42
          </Link>
        </div>

        <div className="space-y-3">
          {inventory.map((veh) => (
            <div
              key={veh.id}
              className="flex items-center justify-between p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img src={veh.images[0]} alt={veh.title} className="w-20 h-14 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold text-white text-sm">{veh.title}</h4>
                  <p className="text-xs text-[#A1A8B3] mt-0.5">${veh.price.toLocaleString()} • {veh.horsepower} HP</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#A1A8B3] hidden sm:inline">14 Active Inquiries</span>
                <Link
                  href={`/dealer/edit-vehicle?id=${veh.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#14181E] border border-[#2A3039] text-xs font-semibold text-white hover:border-white"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

