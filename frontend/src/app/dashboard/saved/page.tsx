'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { EmptyState } from '@/components/common/FeedbackStates';

export default function SavedVehiclesPage() {
  const { savedIds } = useSavedVehicles();
  const savedVehicles = MOCK_VEHICLES.filter((v) => savedIds.includes(v.id));

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Saved Vehicles & Watchlist</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Review saved models and monitor market price revisions.</p>
      </div>

      {savedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your Watchlist is Currently Empty"
          description="Browse our supercar showroom and click the heart icon on any vehicle to save it for later."
          actionLabel="Browse Supercars"
          actionHref="/cars"
        />
      )}
    </div>
  );
}

