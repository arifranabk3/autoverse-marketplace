import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { PlusCircle, Edit, Eye } from 'lucide-react';

export default function DealerInventoryPage() {
  const inventory = MOCK_VEHICLES;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8EDF3] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dealer Showroom Inventory</h1>
          <p className="text-xs text-[#64748B] mt-1">Full inventory catalog synchronized across global AUTOVERSE distribution.</p>
        </div>

        <Link
          href="/dealer/add-vehicle"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F36B32] text-white text-xs font-bold hover:bg-[#DE561D] transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Vehicle to Showroom</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inventory.map((veh) => (
          <div key={veh.id} className="p-4 bg-[#FFFFFF] border border-[#E8EDF3] rounded-2xl flex gap-4 items-center">
            <img src={veh.images[0]} alt={veh.title} className="w-28 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[#F36B32]">{veh.make}</span>
              <h4 className="font-bold text-white text-sm line-clamp-1">{veh.title}</h4>
              <p className="text-xs font-extrabold text-white mt-1">${veh.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href={`/dealer/edit-vehicle?id=${veh.id}`}
                  className="px-2.5 py-1 bg-[#F0F4F8] border border-[#E8EDF3] rounded-md text-[11px] font-semibold text-white hover:border-white"
                >
                  Edit
                </Link>
                <Link
                  href={`/cars/${veh.id}`}
                  className="px-2.5 py-1 bg-[#F0F4F8] border border-[#E8EDF3] rounded-md text-[11px] font-semibold text-[#64748B] hover:text-white"
                >
                  Public View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

