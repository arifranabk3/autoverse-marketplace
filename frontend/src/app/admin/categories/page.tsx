import React from 'react';
import { Layers, Plus } from 'lucide-react';

export default function AdminCategoriesPage() {
  const categories = [
    { id: 1, name: 'Coupe / Supercar', count: 480, status: 'Active' },
    { id: 2, name: 'Hypercar (Limited Edition)', count: 42, status: 'Active' },
    { id: 3, name: 'High-Performance SUV', count: 320, status: 'Active' },
    { id: 4, name: 'Flagship EV', count: 180, status: 'Active' },
    { id: 5, name: 'Convertible / Spyder', count: 210, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-[#2A3039]">
        <div>
          <h1 className="text-2xl font-bold text-white">Vehicle Taxonomies & Body Styles</h1>
          <p className="text-xs text-[#A1A8B3] mt-1">Configure global search filters, categorization facets, and feature tags</p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-xl">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="p-4 bg-[#1B2028] border border-[#2A3039] rounded-xl flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-sm">{c.name}</h4>
              <p className="text-xs text-[#A1A8B3]">{c.count} Active Vehicles Classified</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

