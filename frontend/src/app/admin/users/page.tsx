import React from 'react';
import { UserCheck, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 'usr-1', name: 'Alexander Pierce', email: 'alex@domain.com', role: 'Verified Collector', spent: '$1,250,000' },
    { id: 'usr-2', name: 'Elena Rostova', email: 'elena@rostov.com', role: 'Buyer', spent: '$389,000' },
    { id: 'usr-3', name: 'Marcus Bell', email: 'mbell@apexcap.com', role: 'Private Consignor', spent: '$750,000' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-2xl font-bold text-white">Registered Users & KYC Telemetry</h1>
        <p className="text-xs text-[#64748B] mt-1">Platform user accounts, KYC verification tiers, and transaction volume</p>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-4 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-sm">{u.name}</h4>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#F36B32]/20 text-[#F36B32] font-bold">
                  {u.role}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">{u.email} • Settled Volume: {u.spent}</p>
            </div>

            <button className="px-3 py-1.5 bg-[#F0F4F8] border border-[#E8EDF3] text-xs font-semibold text-white rounded-lg hover:border-white">
              Manage Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

