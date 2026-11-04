import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

export default function MyListingsPage() {
  const listings = MOCK_VEHICLES.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DCE3EC] gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14243A]">My Active Listings</h1>
          <p className="text-xs text-[#64748B] mt-1">Manage, update pricing, or view buyer leads on your vehicles.</p>
        </div>

        <Link
          href="/dashboard/create-listing"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F36B32] text-white text-xs font-bold hover:bg-[#DE561D] transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Listing</span>
        </Link>
      </div>

      <div className="space-y-4">
        {listings.map((veh) => (
          <div
            key={veh.id}
            className="p-4 bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img src={veh.images[0]} alt={veh.title} className="w-24 h-16 object-cover rounded-xl" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#F36B32]">{veh.make}</span>
                <h3 className="font-bold text-[#14243A] text-base">{veh.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Listed Price: <strong className="text-[#14243A]">${veh.price.toLocaleString()}</strong> • Views: 1,480 • Inquiries: 6
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <Link
                href={`/cars/${veh.id}`}
                className="p-2 rounded-xl bg-[#F0F4F8] border border-[#DCE3EC] text-[#64748B] hover:text-[#14243A]"
                title="View Public Page"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/dashboard/edit-listing?id=${veh.id}`}
                className="p-2 rounded-xl bg-[#F0F4F8] border border-[#DCE3EC] text-[#64748B] hover:text-[#14243A]"
                title="Edit Details"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                className="p-2 rounded-xl bg-[#F0F4F8] border border-[#DCE3EC] text-red-400 hover:text-red-300 hover:bg-red-500/10"
                title="Remove"
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

