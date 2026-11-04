'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { MOCK_VEHICLES } from '@/data/mockData';
import { autoverseApi } from '@/services/api/autoverseApi';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { FilterSidebar } from '@/components/vehicle/FilterSidebar';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FilterState, Vehicle } from '@/types';

export default function CarsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'price_desc',
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchInventory() {
      try {
        setIsLoading(true);
        const res = await autoverseApi.getListings();
        if (mounted && res && res.data && res.data.length > 0) {
          // Normalize populated listings to Vehicle models
          const liveVehicles: Vehicle[] = res.data.map((item: any) => {
            const v = item.vehicleId || {};
            return {
              id: item.slug || item._id,
              make: v.make || 'Supercar',
              model: v.model || item.title,
              variant: v.variant || '',
              year: v.year || 2024,
              price: item.price || v.price || 250000,
              mileage: v.mileage || 1500,
              fuelType: v.fuelType || 'Petrol',
              transmission: v.transmission || 'Automatic',
              bodyType: v.bodyType || 'Coupe',
              condition: v.condition || 'Certified Pre-Owned',
              horsepower: v.horsepower || 600,
              engine: v.specifications?.engine || 'V8 Twin-Turbo',
              acceleration: v.acceleration || '3.2s',
              topSpeed: v.topSpeed || '205 mph',
              exteriorColor: v.exteriorColor || 'Metallic Black',
              interiorColor: v.interiorColor || 'Black Leather',
              vin: v.vin || `VIN-${item._id}`,
              createdAt: item.createdAt || new Date().toISOString(),
              images: (item.images && item.images.length) ? item.images : ((v.images && v.images.length) ? v.images : ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e']),
              featured: item.featured || false,
              title: item.title || `${v.year} ${v.make} ${v.model}`,
              description: item.description || v.description || 'Curated exotic vehicle',
              location: item.location || 'Los Angeles, CA',
              dealer: {
                id: item.dealerId?._id || item.dealerId?.slug || 'dlr_apex',
                name: item.dealerId?.businessName || 'Apex Prestige Motors',
                logo: item.dealerId?.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
                address: item.dealerId?.location?.address || 'Beverly Hills, CA',
                phone: item.dealerId?.contactDetails?.phone || '+1 (310) 555-0199',
                established: 2012,
                verified: true,
                rating: 4.9,
                reviewCount: 142,
                reviewsCount: 142,
              },
              features: v.features || ['Premium Audio', 'Carbon Package'],
            };
          });
          setVehicles(liveVehicles);
        }
      } catch (err) {
        console.warn('[CarsPage] Live backend inventory fetch fallback to static dataset:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    fetchInventory();
    return () => { mounted = false; };
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v: Vehicle) => {
      if (filters.make && v.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.bodyType && v.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()) return false;
      if (filters.fuelType && v.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) return false;
      if (filters.transmission && v.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
      if (filters.condition && v.condition.toLowerCase() !== filters.condition.toLowerCase()) return false;
      if (filters.maxPrice && v.price > filters.maxPrice) return false;
      if (filters.minPrice && v.price < filters.minPrice) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'year_desc') return b.year - a.year;
      if (filters.sortBy === 'mileage_asc') return a.mileage - b.mileage;
      return 0;
    });
  }, [filters, vehicles]);

  const resetFilters = () => {
    setFilters({ sortBy: 'price_desc' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F5F7FA]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Browse Cars' }]} />

      {/* Header Title & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DCE3EC] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-[#14243A]">Verified Vehicle Inventory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F36B32]/10 text-[#F36B32] border border-[#F36B32]/20">
              50+ Vehicles Available
            </span>
          </div>
          <p className="text-sm text-[#64748B] mt-1">
            Displaying {filteredVehicles.length} authenticated exotic supercars, luxury sedans, and performance models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DCE3EC] text-sm text-[#14243A] font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#F36B32]" />
            <span>Filters ({filteredVehicles.length})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-[#DCE3EC] rounded-xl px-3.5 py-2 text-sm text-[#14243A] shadow-sm">
            <ArrowUpDown className="w-4 h-4 text-[#F36B32]" />
            <select
              value={filters.sortBy || 'price_desc'}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent text-[#14243A] font-semibold focus:outline-none cursor-pointer text-xs sm:text-sm"
            >
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="year_desc">Newest Year First</option>
              <option value="mileage_asc">Lowest Mileage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid Layout with Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className={`w-full lg:w-72 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
            totalResults={filteredVehicles.length}
          />
        </div>

        {/* Vehicle Cards Grid */}
        <div className="flex-1 w-full space-y-6">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#DCE3EC] shadow-card space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F4F8] text-[#F36B32] mx-auto flex items-center justify-center">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#14243A]">No matching vehicles found</h3>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                No vehicles match your active filter criteria. Try resetting or loosening your price or model restrictions.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#F36B32] text-white text-sm font-bold shadow-md hover:bg-[#DE561D] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
