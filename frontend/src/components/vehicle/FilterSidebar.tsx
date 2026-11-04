'use client';

import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  ChevronDown, 
  Check, 
  MapPin, 
  Fuel, 
  Car, 
  Gauge 
} from 'lucide-react';
import { FilterState } from '@/types';
import { MOCK_BRANDS, MOCK_BODY_STYLES } from '@/data/mockData';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: FilterSidebarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual', 'Dual-Clutch'];
  const conditions = ['Brand New', 'Certified Pre-Owned', 'Used'];

  const update = (key: keyof FilterState, val: any) => {
    onFilterChange({ ...filters, [key]: val || undefined });
  };

  return (
    <aside className="w-full lg:w-72 bg-white rounded-2xl border border-[#E8EDF3] p-5 space-y-6 shadow-card h-fit">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8EDF3]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#F36B32]" />
          <h2 className="text-base font-bold text-[#14243A]">Filters</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#F0F4F8] text-[#64748B]">
            {totalResults}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#64748B] hover:text-[#F36B32] transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* FILTER 1: MAKE */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Make
        </label>
        <select
          value={filters.make || ''}
          onChange={(e) => update('make', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E8EDF3] text-sm font-semibold text-[#14243A] focus:outline-none focus:border-[#F36B32] transition-colors"
        >
          <option value="">All Makes</option>
          {MOCK_BRANDS.map((b) => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* FILTER 2: BODY STYLE */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Body Style
        </label>
        <select
          value={filters.bodyType || ''}
          onChange={(e) => update('bodyType', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E8EDF3] text-sm font-semibold text-[#14243A] focus:outline-none focus:border-[#F36B32] transition-colors"
        >
          <option value="">All Body Styles</option>
          {MOCK_BODY_STYLES.map((bs) => (
            <option key={bs.id} value={bs.slug}>{bs.name}</option>
          ))}
        </select>
      </div>

      {/* FILTER 3: PRICE RANGE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#64748B]">
          <span>Max Budget</span>
          <span className="text-[#F36B32]">
            {filters.maxPrice ? `$${Number(filters.maxPrice).toLocaleString()}` : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min="25000"
          max="650000"
          step="10000"
          value={filters.maxPrice || 650000}
          onChange={(e) => update('maxPrice', Number(e.target.value))}
          className="w-full accent-[#F36B32] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#94A3B8] font-medium">
          <span>$25K</span>
          <span>$300K</span>
          <span>$650K+</span>
        </div>
      </div>

      {/* FILTER 4: FUEL TYPE */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Fuel Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {fuelTypes.map((ft) => {
            const isSelected = filters.fuelType === ft;
            return (
              <button
                key={ft}
                type="button"
                onClick={() => update('fuelType', isSelected ? '' : ft)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                  isSelected
                    ? 'bg-[#F36B32] text-white border-[#F36B32]'
                    : 'bg-[#F5F7FA] text-[#14243A] border-[#E8EDF3] hover:border-[#F36B32]/40'
                }`}
              >
                {ft}
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER 5: TRANSMISSION */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Transmission
        </label>
        <div className="flex flex-col gap-1.5">
          {transmissions.map((tr) => {
            const isSelected = filters.transmission === tr;
            return (
              <button
                key={tr}
                type="button"
                onClick={() => update('transmission', isSelected ? '' : tr)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                  isSelected
                    ? 'bg-[#F36B32]/10 text-[#F36B32] border-[#F36B32]'
                    : 'bg-[#F5F7FA] text-[#14243A] border-[#E8EDF3] hover:border-[#F36B32]/40'
                }`}
              >
                <span>{tr}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#F36B32]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER 6: CONDITION */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Condition
        </label>
        <div className="flex flex-col gap-1.5">
          {conditions.map((c) => {
            const isSelected = filters.condition === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => update('condition', isSelected ? '' : c)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                  isSelected
                    ? 'bg-[#F36B32]/10 text-[#F36B32] border-[#F36B32]'
                    : 'bg-[#F5F7FA] text-[#14243A] border-[#E8EDF3] hover:border-[#F36B32]/40'
                }`}
              >
                <span>{c}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#F36B32]" />}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
