'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_VEHICLES } from '@/data/mockData';
import { autoverseApi } from '@/services/api/autoverseApi';
import { Trash2, ShieldCheck, Eye, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>(MOCK_VEHICLES);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadAdminVehicles() {
      try {
        const res = await autoverseApi.getListings();
        if (mounted && res && res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any) => {
            const v = item.vehicleId || {};
            return {
              id: item.slug || item._id,
              dbId: item._id,
              title: item.title || `${v.year} ${v.make} ${v.model}`,
              price: item.price || v.price || 250000,
              images: (item.images && item.images.length) ? item.images : ((v.images && v.images.length) ? v.images : ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e']),
              dealer: {
                name: item.dealerId?.businessName || 'Apex Prestige Motors',
              },
              status: item.status || 'active',
            };
          });
          setVehicles(mapped);
        }
      } catch (err) {
        console.warn('[AdminVehicles] Fallback to mock catalog:', err);
      }
    }
    loadAdminVehicles();
    return () => { mounted = false; };
  }, []);

  const handleModerate = async (id: string, dbId?: string, action: 'active' | 'suspended' | 'deleted' = 'suspended') => {
    try {
      if (dbId) {
        if (action === 'deleted') {
          await autoverseApi.deleteListing(dbId);
        } else {
          await autoverseApi.moderateListing(dbId, { status: action, reason: 'Admin governance action' });
        }
      }
    } catch (err) {
      console.warn('[AdminVehicles] API moderation offline or simulated:', err);
    }

    if (action === 'deleted') {
      setVehicles((prev) => prev.filter((item) => item.id !== id));
      setActionNotice('Listing removed from platform catalog.');
    } else {
      setVehicles((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: action } : item))
      );
      setActionNotice(`Listing status updated to ${action}.`);
    }
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#DCE3EC]">
        <h1 className="text-2xl font-bold text-[#14243A]">Global Vehicle Inventory Management</h1>
        <p className="text-xs text-[#64748B] mt-1">Review, approve, or suspend vehicle listings platform-wide.</p>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="space-y-3">
        {vehicles.map((veh) => (
          <div
            key={veh.id}
            className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img src={veh.images[0]} alt={veh.title} className="w-16 h-12 object-cover rounded-lg" />
              <div>
                <h4 className="font-bold text-[#14243A] text-sm">{veh.title}</h4>
                <p className="text-xs text-[#64748B]">${veh.price.toLocaleString()} • Dealer: {veh.dealer.name}</p>
                {veh.status && (
                  <span className={`inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${veh.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {veh.status}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/cars/${veh.id}`}
                className="p-2 bg-[#F0F4F8] border border-[#DCE3EC] rounded-lg text-[#14243A] hover:border-white"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleModerate(veh.id, veh.dbId, 'deleted')}
                className="p-2 bg-red-600/20 text-red-600 border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                title="Delete Listing"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

