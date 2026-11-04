import React from 'react';
import { MOCK_DEALERS } from '@/data/mockData';
import { ShieldCheck, Building2 } from 'lucide-react';

export default function AdminDealersPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#DCE3EC]">
        <h1 className="text-2xl font-bold text-[#14243A]">Dealership Network Verification</h1>
        <p className="text-xs text-[#64748B] mt-1">Audit dealer licenses, active escrow bonding, and showroom compliance</p>
      </div>

      <div className="space-y-3">
        {MOCK_DEALERS.map((dealer) => (
          <div key={dealer.id} className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={dealer.logo} alt={dealer.name} className="w-12 h-12 object-cover rounded-xl" />
              <div>
                <h4 className="font-bold text-[#14243A] text-sm">{dealer.name}</h4>
                <p className="text-xs text-[#64748B]">{dealer.location} • {dealer.inventoryCount} Units Live</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Licensed & Bonded
              </span>
              <button className="px-3 py-1.5 bg-[#F0F4F8] border border-[#DCE3EC] text-xs font-semibold text-[#14243A] rounded-lg hover:border-white">
                Audit Dealer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

