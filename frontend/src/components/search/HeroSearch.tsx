'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface HeroSearchProps {
  onSearch?: (criteria: any) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = () => {
  const router = useRouter();
  const [make, setMake] = React.useState('All');
  const [bodyType, setBodyType] = React.useState('All');
  const [maxPrice, setMaxPrice] = React.useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make !== 'All') params.set('make', make);
    if (bodyType !== 'All') params.set('bodyType', bodyType);
    if (maxPrice !== 'All') params.set('maxPrice', maxPrice);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#14181E]/95 backdrop-blur-xl border border-[#2A3039] p-4 sm:p-6 rounded-2xl shadow-2xl shadow-black/80">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Make Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A8B3] mb-2">
            Make / Manufacturer
          </label>
          <div className="relative">
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full appearance-none bg-[#1B2028] border border-[#2A3039] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B00] transition-colors cursor-pointer"
            >
              <option value="All">All Makes</option>
              <option value="Porsche">Porsche</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Lucid">Lucid Motors</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A1A8B3] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A8B3] mb-2">
            Vehicle Body Type
          </label>
          <div className="relative">
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="w-full appearance-none bg-[#1B2028] border border-[#2A3039] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B00] transition-colors cursor-pointer"
            >
              <option value="All">All Body Types</option>
              <option value="Coupe">Coupe / Supercar</option>
              <option value="Hypercar">Hypercar</option>
              <option value="SUV">High-Performance SUV</option>
              <option value="Sedan">Luxury Sport Sedan</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A1A8B3] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A8B3] mb-2">
            Max Budget
          </label>
          <div className="relative">
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full appearance-none bg-[#1B2028] border border-[#2A3039] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B00] transition-colors cursor-pointer"
            >
              <option value="All">Any Budget</option>
              <option value="300000">Up to $300,000</option>
              <option value="400000">Up to $400,000</option>
              <option value="500000">Up to $500,000</option>
              <option value="1000000">Up to $1,000,000+</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A1A8B3] absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Search Submit CTA */}
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-sm font-bold shadow-lg shadow-[#FF6B00]/25 transition-all duration-200 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Inventory</span>
          </button>
        </div>
      </form>
    </div>
  );
};

