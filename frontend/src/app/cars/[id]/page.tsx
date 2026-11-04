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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E8EDF3] gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#F36B32] text-white">
              {vehicle.condition}
            </span>
            <span className="text-xs text-[#64748B] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F36B32]" /> {vehicle.location}
            </span>
            <span className="text-xs text-[#64748B]">VIN: {vehicle.vin}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{vehicle.title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs text-[#64748B] uppercase tracking-wider">Acquisition Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F36B32]">
              ${vehicle.price.toLocaleString()}
            </div>
            {vehicle.monthlyPayment && (
              <span className="text-xs text-[#64748B]">
                Est. ${vehicle.monthlyPayment.toLocaleString()}/mo finance
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(vehicle.id)}
              className={`p-3 rounded-xl border transition-all ${
                compared ? 'bg-[#F36B32] text-white border-[#F36B32]' : 'bg-[#FFFFFF] text-white border-[#E8EDF3] hover:border-white'
              }`}
              title="Compare"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleSave(vehicle.id)}
              className={`p-3 rounded-xl border transition-all ${
                saved ? 'bg-red-600 text-white border-red-600' : 'bg-[#FFFFFF] text-white border-[#E8EDF3] hover:border-white'
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
          <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F0F4F8] border border-[#E8EDF3] relative">
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
                  activeImageIndex === idx ? 'border-[#F36B32]' : 'border-[#E8EDF3] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Detailed Performance Metrics */}
          <div className="bg-[#F0F4F8] border border-[#E8EDF3] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Engine & Telemetry Specs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8EDF3]">
                <Zap className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Horsepower</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.horsepower} HP</p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8EDF3]">
                <Gauge className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Acceleration</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.acceleration}</p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8EDF3]">
                <Car className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Top Speed</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.topSpeed}</p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8EDF3]">
                <Calendar className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                <span className="text-[10px] text-[#64748B] uppercase font-bold">Odometer</span>
                <p className="text-xl font-bold text-white mt-1">{vehicle.mileage.toLocaleString()} mi</p>
              </div>
            </div>
          </div>

          {/* Vehicle Factory Options */}
          <div className="bg-[#F0F4F8] border border-[#E8EDF3] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Factory Options & Equipment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#F36B32] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dealer & Purchase Escrow */}
        <div className="space-y-6">
          {/* Dealer Card */}
          <div className="bg-[#FFFFFF] border border-[#E8EDF3] rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#F5F7FA] overflow-hidden border border-[#E8EDF3] p-1">
                <img src={vehicle.dealer.logo} alt={vehicle.dealer.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F36B32] font-bold">Certified Marque Dealer</span>
                <h4 className="text-base font-bold text-white mt-0.5">{vehicle.dealer.name}</h4>
                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <span>★ {vehicle.dealer.rating}</span>
                  <span>({vehicle.dealer.reviewCount} Reviews)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8EDF3] space-y-3">
              <a
                href={`tel:${vehicle.dealer.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F0F4F8] hover:bg-[#F36B32] text-white text-sm font-semibold border border-[#E8EDF3] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge: {vehicle.dealer.phone}</span>
              </a>

              <Link
                href={`/dealers/${vehicle.dealer.id}`}
                className="w-full block text-center py-2.5 text-xs text-[#64748B] hover:text-white"
              >
                View Full Dealership Inventory →
              </Link>
            </div>
          </div>

          {/* Instant Inquiry & Escrow Reservation */}
          <div className="bg-[#FFFFFF] border border-[#E8EDF3] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Inquire / Reserve Vehicle</h3>
            <p className="text-xs text-[#64748B]">
              Submit your private allocation request. An AUTOVERSE VIP liaison will contact you within 2 hours.
            </p>

            {inquirySent ? (
              <div className="p-4 bg-[#F36B32]/10 border border-[#F36B32]/40 rounded-xl text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#F36B32] mx-auto" />
                <h4 className="text-sm font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-[#64748B]">
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
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
                />
                <input
                  type="email"
                  placeholder="Private Email Address"
                  required
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
                />
                <input
                  type="tel"
                  placeholder="Direct Mobile / WhatsApp"
                  required
                  className="w-full px-4 py-2.5 bg-[#F0F4F8] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
                />
                <textarea
                  rows={3}
                  placeholder="Optional message (trade-in request, transport destination, etc.)"
                  className="w-full px-4 py-2 bg-[#F0F4F8] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm shadow-lg shadow-[#F36B32]/25 transition-all"
                >
                  Send Acquisition Request
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
              <Lock className="w-3.5 h-3.5 text-[#F36B32]" />
              <span>Protected by AUTOVERSE Escrow Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

