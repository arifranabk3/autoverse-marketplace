'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Gauge, 
  Fuel, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Vehicle } from '@/types';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { isSaved, toggleSave } = useSavedVehicles();
  const saved = isSaved(vehicle.id);

  // Format currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: vehicle.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E8EDF3] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col hover:-translate-y-1">
      
      {/* Vehicle Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0F4F8]">
        {/* Main Photo */}
        <img
          src={vehicle.images[0] || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {vehicle.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F36B32] text-white shadow-sm">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#14243A] backdrop-blur-md shadow-sm border border-[#E8EDF3]">
              {vehicle.condition}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(vehicle.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto shadow-sm ${
              saved
                ? 'bg-[#F36B32] text-white'
                : 'bg-white/90 text-[#14243A] hover:bg-white hover:text-[#F36B32]'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
          <MapPin className="w-3 h-3 text-[#F36B32]" />
          <span>{vehicle.location}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Make / Model / Year */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F36B32]">
              {vehicle.make}
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              {vehicle.year}
            </span>
          </div>

          <Link href={`/cars/${vehicle.id}`} className="block group-hover:text-[#F36B32] transition-colors">
            <h3 className="text-base font-bold text-[#14243A] line-clamp-1">
              {vehicle.title}
            </h3>
          </Link>
          {vehicle.variant && (
            <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
              {vehicle.variant}
            </p>
          )}

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-[#E8EDF3] text-center">
            <div className="bg-[#F5F7FA] p-2 rounded-xl">
              <span className="block text-[10px] font-semibold text-[#64748B] uppercase">Mileage</span>
              <span className="text-xs font-bold text-[#14243A]">{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <div className="bg-[#F5F7FA] p-2 rounded-xl">
              <span className="block text-[10px] font-semibold text-[#64748B] uppercase">Power</span>
              <span className="text-xs font-bold text-[#14243A]">{vehicle.horsepower} HP</span>
            </div>
            <div className="bg-[#F5F7FA] p-2 rounded-xl">
              <span className="block text-[10px] font-semibold text-[#64748B] uppercase">Fuel</span>
              <span className="text-xs font-bold text-[#14243A]">{vehicle.fuelType}</span>
            </div>
          </div>

          {/* Dealer Badge */}
          {vehicle.dealer && (
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="truncate max-w-[170px] font-medium">{vehicle.dealer.name}</span>
              {vehicle.dealer.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-[#E8EDF3]/80">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Selling Price</span>
            <span className="text-xl font-extrabold text-[#14243A]">{formattedPrice}</span>
          </div>

          <Link
            href={`/cars/${vehicle.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0F4F8] hover:bg-[#F36B32] hover:text-white text-xs font-bold text-[#14243A] transition-all group-hover:bg-[#F36B32] group-hover:text-white"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
