'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';
import { X, Check, SlidersHorizontal, ArrowRight, Zap, Gauge, DollarSign } from 'lucide-react';

export default function CompareVehiclesPage() {
  const { comparedIds, toggleCompare, clearCompared } = useSavedVehicles();

  const vehiclesToCompare = MOCK_VEHICLES.filter((v) => comparedIds.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Compare Vehicles' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8EDF3] gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Compare Specifications</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Side-by-side engineering, performance telemetry, and valuation analysis.
          </p>
        </div>

        {comparedIds.length > 0 && (
          <button
            onClick={clearCompared}
            className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8EDF3] text-xs font-semibold text-[#64748B] hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {vehiclesToCompare.length === 0 ? (
        <div className="py-20 text-center bg-[#FFFFFF] border border-[#E8EDF3] rounded-2xl p-8 space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-[#F36B32] mx-auto opacity-80" />
          <h3 className="text-xl font-bold text-white">No Vehicles Selected for Comparison</h3>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            Browse our inventory and click the compare icon on any vehicle card to analyze them side-by-side.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F36B32] text-[#14243A] font-bold text-sm hover:bg-[#DE561D] transition-all"
          >
            <span>Browse Available Supercars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E8EDF3]">
                <th className="p-4 bg-[#F0F4F8] text-xs font-bold uppercase text-[#64748B] w-1/4">
                  Specification
                </th>
                {vehiclesToCompare.map((veh) => (
                  <th key={veh.id} className="p-4 bg-[#FFFFFF] border-l border-[#E8EDF3] w-1/4">
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F5F7FA]">
                        <img src={veh.images[0]} alt={veh.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleCompare(veh.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-colors"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F36B32]">{veh.make}</span>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{veh.title}</h4>
                        <div className="text-lg font-extrabold text-[#F36B32] mt-1">
                          ${veh.price.toLocaleString()}
                        </div>
                      </div>
                      <Link
                        href={`/cars/${veh.id}`}
                        className="block text-center py-2 px-3 rounded-lg bg-[#F36B32] hover:bg-[#DE561D] text-white text-xs font-bold transition-colors"
                      >
                        View Vehicle
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDF3] text-sm">
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Horsepower</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-[#14243A] font-bold bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.horsepower} HP
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Acceleration (0-60)</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-[#14243A] font-bold bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.acceleration}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Top Speed</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-[#14243A] font-bold bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.topSpeed}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Powertrain / Fuel</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-white bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.fuelType}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Transmission</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-white bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.transmission}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Mileage</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-white bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.mileage.toLocaleString()} miles
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Condition</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-white bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.condition}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-[#64748B] bg-[#F0F4F8]">Dealership</td>
                {vehiclesToCompare.map((veh) => (
                  <td key={veh.id} className="p-4 text-white bg-[#FFFFFF] border-l border-[#E8EDF3]">
                    {veh.dealer.name}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

