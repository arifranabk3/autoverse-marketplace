'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_VEHICLES } from '@/data/mockData';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { FilterSidebar } from '@/components/vehicle/FilterSidebar';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState, LoadingSkeleton } from '@/components/common/FeedbackStates';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { autoverseApi } from '@/services/api/autoverseApi';
import { Vehicle } from '@/types';

export default function BrowseCarsPage() {
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedBody, setSelectedBody] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [priceRange, setPriceRange] = useState(800000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Progressive API integration: Try backend first, fallback to mock data seamlessly
  useEffect(() => {
    let isMounted = true;
    async function loadBackendVehicles() {
      setIsLoading(true);
      try {
        const params: Record<string, any> = {
          sortBy,
          maxPrice: priceRange,
        };
        if (selectedMake !== 'All') params.make = selectedMake;
        if (selectedBody !== 'All') params.bodyType = selectedBody;
        if (selectedFuel !== 'All') params.fuelType = selectedFuel;

        const res = await autoverseApi.getVehicles(params);
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setVehicles(res.data);
          setIsLiveConnected(true);
        } else if (isMounted) {
          // If backend has 0 active records, use curated fallback
          setVehicles(MOCK_VEHICLES);
        }
      } catch (err) {
        // Fallback to offline curated mock vehicles
        if (isMounted) {
          setVehicles(MOCK_VEHICLES);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadBackendVehicles();
    return () => {
      isMounted = false;
    };
  }, [selectedMake, selectedBody, selectedFuel, priceRange, sortBy]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedMake !== 'All' && v.make.toLowerCase() !== selectedMake.toLowerCase()) return false;
      if (selectedBody !== 'All' && v.bodyType.toLowerCase() !== selectedBody.toLowerCase()) return false;
      if (selectedFuel !== 'All' && v.fuelType.toLowerCase() !== selectedFuel.toLowerCase()) return false;
      if (v.price && v.price > priceRange) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'mileage_asc') return (a.mileage || 0) - (b.mileage || 0);
      return 0;
    });
  }, [vehicles, selectedMake, selectedBody, selectedFuel, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedMake('All');
    setSelectedBody('All');
    setSelectedFuel('All');
    setPriceRange(800000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Browse Cars' }]} />

      {/* Header Title & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A3039] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-white">Prestige Vehicle Inventory</h1>
            {isLiveConnected && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live Atlas Feed
              </span>
            )}
          </div>
          <p className="text-sm text-[#A1A8B3] mt-1">
            Displaying {filteredVehicles.length} verified supercars and performance models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B2028] border border-[#2A3039] text-sm text-white font-medium"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#FF6B00]" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#1B2028] border border-[#2A3039] rounded-xl px-3 py-2 text-sm text-white">
            <ArrowUpDown className="w-4 h-4 text-[#FF6B00]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer text-xs sm:text-sm"
            >
              <option value="featured" className="bg-[#1B2028]">Featured First</option>
              <option value="price_asc" className="bg-[#1B2028]">Price: Low to High</option>
              <option value="price_desc" className="bg-[#1B2028]">Price: High to Low</option>
              <option value="mileage_asc" className="bg-[#1B2028]">Lowest Mileage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid Layout with Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className={`w-full lg:w-72 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
            selectedBody={selectedBody}
            setSelectedBody={setSelectedBody}
            selectedFuel={selectedFuel}
            setSelectedFuel={setSelectedFuel}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={resetFilters}
          />
        </div>

        {/* Vehicle Cards Grid */}
        <div className="flex-1 w-full">
          {isLoading ? (
            <LoadingSkeleton count={6} />
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id || String(vehicle._id)} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Vehicles Matched Your Criteria"
              description="Try adjusting your price ceiling, fuel type, or manufacturer filter to view more listings."
              actionLabel="Reset All Filters"
              actionHref="/cars"
              onRetry={resetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
