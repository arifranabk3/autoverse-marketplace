import React from 'react';
import { MOCK_VEHICLES } from '@/data/mockData';
import { Trash2, ShieldCheck, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminVehiclesPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-2xl font-bold text-white">Global Vehicle Inventory Management</h1>
        <p className="text-xs text-[#64748B] mt-1">Review, approve, or suspend vehicle listings platform-wide.</p>
      </div>

      <div className="space-y-3">
        {MOCK_VEHICLES.map((veh) => (
          <div
            key={veh.id}
            className="p-4 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img src={veh.images[0]} alt={veh.title} className="w-16 h-12 object-cover rounded-lg" />
              <div>
                <h4 className="font-bold text-white text-sm">{veh.title}</h4>
                <p className="text-xs text-[#64748B]">${veh.price.toLocaleString()} • Dealer: {veh.dealer.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/cars/${veh.id}`}
                className="p-2 bg-[#F0F4F8] border border-[#E8EDF3] rounded-lg text-white hover:border-white"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <button className="p-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

