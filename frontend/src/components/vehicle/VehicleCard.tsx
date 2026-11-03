'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  SlidersHorizontal, 
  Gauge, 
  Fuel, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { Vehicle } from '@/types';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { toggleSave, isSaved, toggleCompare, isCompared } = useSavedVehicles();

  const saved = isSaved(vehicle.id);
  const compared = isCompared(vehicle.id);

  return (
    <div className="group relative bg-[#1B2028] border border-[#2A3039] rounded-2xl overflow-hidden hover:border-[#FF6B00]/60 transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-[#FF6B00]/5">
      {/* Image Container with Badges & Quick Action Controls */}
      <div className="relative aspect-[16/10] w-full bg-[#14181E] overflow-hidden">
        {/* Real / External Image */}
        <img
          src={vehicle.images[0]}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for badges contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2028] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {vehicle.featured && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-[#FF6B00] text-white shadow-md">
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10">
            {vehicle.condition}
          </span>
        </div>

        {/* Action Buttons: Save & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => toggleCompare(vehicle.id)}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              compared
                ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                : 'bg-black/60 text-white/80 hover:text-white border-white/10 hover:border-white/30'
            }`}
            title={compared ? 'Remove from compare' : 'Compare vehicle'}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleSave(vehicle.id)}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              saved
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-black/60 text-white/80 hover:text-white border-white/10 hover:border-white/30'
            }`}
            title={saved ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Location Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90 font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>{vehicle.location}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Title & Make */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
                {vehicle.make}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-[#FF6B00] transition-colors line-clamp-1 mt-0.5">
                <Link href={`/cars/${vehicle.id}`}>
                  {vehicle.title}
                </Link>
              </h3>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 my-4 py-3 border-y border-[#2A3039]/80 text-xs text-[#A1A8B3]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#A1A8B3]/70">Mileage</span>
              <span className="font-semibold text-white">{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#A1A8B3]/70">Fuel / Eng</span>
              <span className="font-semibold text-white">{vehicle.fuelType}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#A1A8B3]/70">Output</span>
              <span className="font-semibold text-white">{vehicle.horsepower} HP</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-[#A1A8B3]">Selling Price</span>
              <div className="text-xl font-extrabold text-white">
                ${vehicle.price.toLocaleString()}
              </div>
            </div>
            {vehicle.monthlyPayment && (
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#A1A8B3]">Est. Finance</span>
                <div className="text-xs font-semibold text-[#FF6B00]">
                  ${vehicle.monthlyPayment.toLocaleString()}/mo
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Link
            href={`/cars/${vehicle.id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14181E] hover:bg-[#FF6B00] border border-[#2A3039] hover:border-[#FF6B00] text-sm font-semibold text-white transition-all duration-200"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

