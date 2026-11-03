'use client';

import React from 'react';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  selectedMake: string;
  setSelectedMake: (val: string) => void;
  selectedBody: string;
  setSelectedBody: (val: string) => void;
  selectedFuel: string;
  setSelectedFuel: (val: string) => void;
  priceRange: number;
  setPriceRange: (val: number) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedMake,
  setSelectedMake,
  selectedBody,
  setSelectedBody,
  selectedFuel,
  setSelectedFuel,
  priceRange,
  setPriceRange,
  onReset,
}) => {
  return (
    <aside className="w-full lg:w-72 bg-[#1B2028] border border-[#2A3039] rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#2A3039]">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Filter className="w-4 h-4 text-[#FF6B00]" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#A1A8B3] hover:text-[#FF6B00] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Make Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A8B3]">
          Manufacturer
        </label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full bg-[#14181E] border border-[#2A3039] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        >
          <option value="All">All Makes</option>
          <option value="Porsche">Porsche</option>
          <option value="Ferrari">Ferrari</option>
          <option value="Lamborghini">Lamborghini</option>
          <option value="Aston Martin">Aston Martin</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="Lucid">Lucid Motors</option>
        </select>
      </div>

      {/* Body Style */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A8B3]">
          Body Style
        </label>
        <select
          value={selectedBody}
          onChange={(e) => setSelectedBody(e.target.value)}
          className="w-full bg-[#14181E] border border-[#2A3039] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        >
          <option value="All">All Styles</option>
          <option value="Coupe">Coupe</option>
          <option value="Hypercar">Hypercar</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
        </select>
      </div>

      {/* Fuel / Powertrain */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A8B3]">
          Powertrain
        </label>
        <select
          value={selectedFuel}
          onChange={(e) => setSelectedFuel(e.target.value)}
          className="w-full bg-[#14181E] border border-[#2A3039] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        >
          <option value="All">All Powertrains</option>
          <option value="Petrol">Gasoline / V8 & V12</option>
          <option value="Hybrid">Hybrid Performance</option>
          <option value="Electric">Pure Electric</option>
        </select>
      </div>

      {/* Price Slider */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#A1A8B3]">Max Price</span>
          <span className="font-bold text-[#FF6B00]">${priceRange.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="200000"
          max="800000"
          step="25000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-[#FF6B00] cursor-pointer bg-[#2A3039]"
        />
        <div className="flex justify-between text-[10px] text-[#A1A8B3]">
          <span>$200k</span>
          <span>$800k+</span>
        </div>
      </div>
    </aside>
  );
};

