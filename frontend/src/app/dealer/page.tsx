import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { DollarSign, Car, Users, Eye, ArrowUpRight } from 'lucide-react';

export default function DealerOverviewPage() {
  const inventory = MOCK_VEHICLES.filter((v) => v.dealer.name.includes('Apex'));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DCE3EC] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14243A]">Dealership Command Center</h1>
          <p className="text-xs text-[#64748B] mt-1">Apex Prestige Motors • Beverly Hills Facility</p>
        </div>

        <Link
          href="/dealer/add-vehicle"
          className="px-4 py-2 rounded-xl bg-[#F36B32] text-white text-xs font-bold hover:bg-[#DE561D] transition-colors self-start"
        >
          + Add Inventory
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">Active Vehicles</span>
          <p className="text-2xl font-extrabold text-[#14243A]">42</p>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">Total Showroom Value</span>
          <p className="text-2xl font-extrabold text-[#F36B32]">$14.2M</p>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">30-Day Showroom Views</span>
          <p className="text-2xl font-extrabold text-[#14243A]">184.2K</p>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#64748B]">Active Qualified Leads</span>
          <p className="text-2xl font-extrabold text-emerald-400">28</p>
        </div>
      </div>

      {/* Recent Inventory Additions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#14243A]">Showroom Inventory Spotlight</h3>
          <Link href="/dealer/inventory" className="text-xs text-[#F36B32] hover:underline">
            View All 42
          </Link>
        </div>

        <div className="space-y-3">
          {inventory.map((veh) => (
            <div
              key={veh.id}
              className="flex items-center justify-between p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img src={veh.images[0]} alt={veh.title} className="w-20 h-14 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold text-[#14243A] text-sm">{veh.title}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">${veh.price.toLocaleString()} • {veh.horsepower} HP</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#64748B] hidden sm:inline">14 Active Inquiries</span>
                <Link
                  href={`/dealer/edit-vehicle?id=${veh.id}`}
                  className="px-3 py-1.5 rounded-lg bg-[#F0F4F8] border border-[#DCE3EC] text-xs font-semibold text-[#14243A] hover:border-white"
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

