'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Sparkles } from 'lucide-react';
import { MOCK_BRANDS, MOCK_BODY_STYLES } from '@/data/mockData';

export function HeroSearch() {
  const router = useRouter();
  const [make, setMake] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (bodyType) params.set('bodyType', bodyType);
    if (maxPrice) params.set('maxPrice', maxPrice);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-[#E8EDF3] shadow-elevated"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
        
        {/* Make Select */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block pl-1">
            Make / Manufacturer
          </label>
          <div className="relative">
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E8EDF3] text-sm font-semibold text-[#14243A] focus:outline-none focus:border-[#F36B32] transition-colors cursor-pointer"
            >
              <option value="">All Makes</option>
              {MOCK_BRANDS.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
          </div>
        </div>

        {/* Body Type Select */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block pl-1">
            Body Style
          </label>
          <div className="relative">
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E8EDF3] text-sm font-semibold text-[#14243A] focus:outline-none focus:border-[#F36B32] transition-colors cursor-pointer"
            >
              <option value="">All Body Styles</option>
              {MOCK_BODY_STYLES.map((bs) => (
                <option key={bs.id} value={bs.slug}>{bs.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
          </div>
        </div>

        {/* Max Budget Select */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block pl-1">
            Max Budget
          </label>
          <div className="relative">
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E8EDF3] text-sm font-semibold text-[#14243A] focus:outline-none focus:border-[#F36B32] transition-colors cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="50000">Up to $50,000</option>
              <option value="100000">Up to $100,000</option>
              <option value="200000">Up to $200,000</option>
              <option value="350000">Up to $350,000</option>
              <option value="500000">$500,000+</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
          </div>
        </div>

        {/* Search Submit */}
        <div className="pt-2 sm:pt-6">
          <button
            type="submit"
            className="w-full py-2.5 px-5 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-white text-sm font-bold shadow-md shadow-[#F36B32]/30 hover:shadow-lg hover:shadow-[#F36B32]/40 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Search Inventory</span>
          </button>
        </div>

      </div>
    </form>
  );
}
