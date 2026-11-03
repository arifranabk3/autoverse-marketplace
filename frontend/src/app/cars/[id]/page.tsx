'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MOCK_VEHICLES 
} from '@/data/mockData';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { 
  ShieldCheck, 
  Heart, 
  SlidersHorizontal, 
  Gauge, 
  Zap, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Check, 
  Share2, 
  Lock,
  ArrowRight,
  Car
} from 'lucide-react';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = MOCK_VEHICLES.find((v) => v.id === params.id) || MOCK_VEHICLES[0];
  const { toggleSave, isSaved, toggleCompare, isCompared } = useSavedVehicles();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);

  const saved = isSaved(vehicle.id);
  const compared = isCompared(vehicle.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Browse Cars', href: '/cars' },
          { label: vehicle.make, href: `/search?make=${vehicle.make}` },
          { label: vehicle.title },
        ]}
      />

      {/* Top Title & Price Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#2A3039] gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#FF6B00] text-white">
              {vehicle.condition}
            </span>
            <span className="text-xs text-[#A1A8B3] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" /> {vehicle.location}
            </span>
            <span className="text-xs text-[#A1A8B3]">VIN: {vehicle.vin}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{vehicle.title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs text-[#A1A8B3] uppercase tracking-wider">Acquisition Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#FF6B00]">
              ${vehicle.price.toLocaleString()}
            </div>
            {vehicle.monthlyPayment && (
              <span className="text-xs text-[#A1A8B3]">
                Est. ${vehicle.monthlyPayment.toLocaleString()}/mo finance
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(vehicle.id)}
              className={`p-3 rounded-xl border transition-all ${
                compared ? 'bg-[#FF6B00] text-white border-[#FF6B00]' : 'bg-[#1B2028] text-white border-[#2A3039] hover:border-white'
              }`}
              title="Compare"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleSave(vehicle.id)}
              className={`p-3 rounded-xl border transition-all ${
                saved ? 'bg-red-600 text-white border-red-600' : 'bg-[#1B2028] text-white border-[#2A3039] hover:border-white'
              }`}
              title="Save"
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Media Gallery & Key Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#14181E] border border-[#2A3039] relative">
            <img
              src={vehicle.images[activeImageIndex] || vehicle.images[0]}
              alt={vehicle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {vehicle.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIndex === idx ? 'border-[#FF6B00]' : 'border-[#2A3039] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Detailed Performance Metrics */}
          <div className="bg-[#14181E] border border-[#2A3039] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Engine & Telemetry Specs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-[#1B2028] rounded-xl border border-[#2A3039]">
                <Zap className="w-5 h-5 text-[#FF6B00] mx-auto mb-2" />
                <span className="text-[10px] text-[#A1A8B3] uppercase font-bold">Horsepower</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.horsepower} HP</p>
              </div>

              <div className="p-4 bg-[#1B2028] rounded-xl border border-[#2A3039]">
                <Gauge className="w-5 h-5 text-[#FF6B00] mx-auto mb-2" />
                <span className="text-[10px] text-[#A1A8B3] uppercase font-bold">Acceleration</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.acceleration}</p>
              </div>

              <div className="p-4 bg-[#1B2028] rounded-xl border border-[#2A3039]">
                <Car className="w-5 h-5 text-[#FF6B00] mx-auto mb-2" />
                <span className="text-[10px] text-[#A1A8B3] uppercase font-bold">Top Speed</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.topSpeed}</p>
              </div>

              <div className="p-4 bg-[#1B2028] rounded-xl border border-[#2A3039]">
                <Calendar className="w-5 h-5 text-[#FF6B00] mx-auto mb-2" />
                <span className="text-[10px] text-[#A1A8B3] uppercase font-bold">Odometer</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.mileage.toLocaleString()} mi</p>
              </div>
            </div>
          </div>

          {/* Vehicle Factory Options */}
          <div className="bg-[#14181E] border border-[#2A3039] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Factory Options & Equipment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-[#A1A8B3]">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dealer & Purchase Escrow */}
        <div className="space-y-6">
          {/* Dealer Card */}
          <div className="bg-[#1B2028] border border-[#2A3039] rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#0B0D10] overflow-hidden border border-[#2A3039] p-1">
                <img src={vehicle.dealer.logo} alt={vehicle.dealer.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#FF6B00] font-bold">Certified Marque Dealer</span>
                <h4 className="text-base font-bold text-white mt-0.5">{vehicle.dealer.name}</h4>
                <div className="flex items-center gap-1 text-xs text-[#A1A8B3]">
                  <span>★ {vehicle.dealer.rating}</span>
                  <span>({vehicle.dealer.reviewCount} Reviews)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3039] space-y-3">
              <a
                href={`tel:${vehicle.dealer.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#14181E] hover:bg-[#FF6B00] text-white text-sm font-semibold border border-[#2A3039] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge: {vehicle.dealer.phone}</span>
              </a>

              <Link
                href={`/dealers/${vehicle.dealer.id}`}
                className="w-full block text-center py-2.5 text-xs text-[#A1A8B3] hover:text-white"
              >
                View Full Dealership Inventory →
              </Link>
            </div>
          </div>

          {/* Instant Inquiry & Escrow Reservation */}
          <div className="bg-[#1B2028] border border-[#2A3039] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Inquire / Reserve Vehicle</h3>
            <p className="text-xs text-[#A1A8B3]">
              Submit your private allocation request. An AUTOVERSE VIP liaison will contact you within 2 hours.
            </p>

            {inquirySent ? (
              <div className="p-4 bg-[#FF6B00]/10 border border-[#FF6B00]/40 rounded-xl text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#FF6B00] mx-auto" />
                <h4 className="text-sm font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-[#A1A8B3]">
                  Your allocation request has been routed to {vehicle.dealer.name}. Reference ID: #AUT-{Math.floor(Math.random() * 89999 + 10000)}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySent(true);
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Full Legal Name"
                  required
                  className="w-full px-4 py-2.5 bg-[#14181E] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
                <input
                  type="email"
                  placeholder="Private Email Address"
                  required
                  className="w-full px-4 py-2.5 bg-[#14181E] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
                <input
                  type="tel"
                  placeholder="Direct Mobile / WhatsApp"
                  required
                  className="w-full px-4 py-2.5 bg-[#14181E] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
                <textarea
                  rows={3}
                  placeholder="Optional message (trade-in request, transport destination, etc.)"
                  className="w-full px-4 py-2 bg-[#14181E] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all"
                >
                  Send Acquisition Request
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#A1A8B3]">
              <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Protected by AUTOVERSE Escrow Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

