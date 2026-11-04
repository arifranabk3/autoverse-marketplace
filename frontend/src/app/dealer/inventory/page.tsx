'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { autoverseApi } from '@/services/api/autoverseApi';
import { PlusCircle, Edit, Eye, Trash2, CheckCircle2 } from 'lucide-react';

export default function DealerInventoryPage() {
  const [inventory, setInventory] = useState<any[]>(MOCK_VEHICLES);
  const [loading, setLoading] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadDealerInventory() {
      try {
        setLoading(true);
        const res = await autoverseApi.getListings();
        if (mounted && res && res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any) => {
            const v = item.vehicleId || {};
            return {
              id: item.slug || item._id,
              dbId: item._id,
              make: v.make || 'Supercar',
              title: item.title || `${v.year} ${v.make} ${v.model}`,
              price: item.price || v.price || 250000,
              images: (item.images && item.images.length) ? item.images : ((v.images && v.images.length) ? v.images : ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e']),
              status: item.status || 'active',
            };
          });
          setInventory(mapped);
        }
      } catch (err) {
        console.warn('[DealerInventory] Fallback to showroom dataset:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadDealerInventory();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (vehicleId: string, dbId?: string) => {
    if (!confirm('Are you sure you want to remove this vehicle from your active showroom?')) return;
    try {
      if (dbId) {
        await autoverseApi.deleteListing(dbId);
      }
    } catch (err) {
      console.warn('[DealerInventory] Deletion offline or simulated:', err);
    }
    setInventory((prev) => prev.filter((item) => item.id !== vehicleId));
    setDeleteStatus('Vehicle removed successfully from inventory.');
    setTimeout(() => setDeleteStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DCE3EC] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14243A]">Dealer Showroom Inventory</h1>
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
          <div key={veh.id} className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl flex gap-4 items-center">
            <img src={veh.images[0]} alt={veh.title} className="w-28 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[#F36B32]">{veh.make}</span>
              <h4 className="font-bold text-[#14243A] text-sm line-clamp-1">{veh.title}</h4>
              <p className="text-xs font-extrabold text-[#14243A] mt-1">${veh.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href={`/dealer/edit-vehicle?id=${veh.id}`}
                  className="px-2.5 py-1 bg-[#F0F4F8] border border-[#DCE3EC] rounded-md text-[11px] font-semibold text-[#14243A] hover:border-white"
                >
                  Edit
                </Link>
                <Link
                  href={`/cars/${veh.id}`}
                  className="px-2.5 py-1 bg-[#F0F4F8] border border-[#DCE3EC] rounded-md text-[11px] font-semibold text-[#64748B] hover:text-[#14243A]"
                >
                  Public View
                </Link>
                <button
                  onClick={() => handleDelete(veh.id, veh.dbId)}
                  className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-md text-[11px] font-semibold hover:bg-red-600 hover:text-white transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

