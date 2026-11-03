'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_VEHICLES } from '@/data/mockData';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState, LoadingSkeleton } from '@/components/common/FeedbackStates';
import { Search } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const makeParam = searchParams.get('make') || 'All';
  const bodyTypeParam = searchParams.get('bodyType') || 'All';
  const maxPriceParam = searchParams.get('maxPrice') || 'All';
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);

  const results = useMemo(() => {
    return MOCK_VEHICLES.filter((v) => {
      if (makeParam !== 'All' && v.make.toLowerCase() !== makeParam.toLowerCase()) return false;
      if (bodyTypeParam !== 'All' && v.bodyType.toLowerCase() !== bodyTypeParam.toLowerCase()) return false;
      if (maxPriceParam !== 'All' && v.price > Number(maxPriceParam)) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(query);
        const matchesMake = v.make.toLowerCase().includes(query);
        const matchesModel = v.model.toLowerCase().includes(query);
        const matchesLocation = v.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesMake && !matchesModel && !matchesLocation) return false;
      }
      return true;
    });
  }, [makeParam, bodyTypeParam, maxPriceParam, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Top Search Bar */}
      <div className="bg-[#14181E] border border-[#2A3039] p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:max-w-lg relative">
          <Search className="w-5 h-5 text-[#A1A8B3] absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search make, model, year, VIN or dealership..."
            className="w-full pl-12 pr-4 py-3 bg-[#1B2028] border border-[#2A3039] rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-[#A1A8B3]">
          {makeParam !== 'All' && (
            <span className="px-3 py-1 bg-[#1B2028] border border-[#2A3039] rounded-lg">
              Make: <strong className="text-white">{makeParam}</strong>
            </span>
          )}
          {bodyTypeParam !== 'All' && (
            <span className="px-3 py-1 bg-[#1B2028] border border-[#2A3039] rounded-lg">
              Body: <strong className="text-white">{bodyTypeParam}</strong>
            </span>
          )}
          {maxPriceParam !== 'All' && (
            <span className="px-3 py-1 bg-[#1B2028] border border-[#2A3039] rounded-lg">
              Budget: <strong className="text-white">${Number(maxPriceParam).toLocaleString()}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Found {results.length} Search {results.length === 1 ? 'Result' : 'Results'}
        </h1>
        <p className="text-sm text-[#A1A8B3] mt-1">Verified and available for immediate acquisition.</p>
      </div>

      {/* Vehicles Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Vehicles Found"
          description="We couldn't find any listings matching your search terms. Check your spelling or browse all vehicles."
          actionLabel="View All Vehicles"
          actionHref="/cars"
        />
      )}
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Search Results' }]} />
      <Suspense fallback={<LoadingSkeleton count={6} />}>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
