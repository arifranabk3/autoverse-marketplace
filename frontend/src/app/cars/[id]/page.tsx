'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MOCK_VEHICLES 
} from '@/data/mockData';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
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
  Car,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = MOCK_VEHICLES.find((v) => v.id === params.id) || MOCK_VEHICLES[0];
  const { toggleSave, isSaved, toggleCompare, isCompared } = useSavedVehicles();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);
    try {
      const { autoverseApi } = await import('@/services/api/autoverseApi');
      await autoverseApi.createInquiry({
        vehicleName: vehicle.title,
        name: inquiryName || 'Verified Collector',
        email: inquiryEmail || 'buyer@autoverse.com',
        phone: inquiryPhone || '+1 (555) 019-2834',
        message: inquiryMessage || 'Requesting acquisition prospectus and verified service records.',
        listingId: vehicle.id,
        dealerId: vehicle.dealer?.id,
      });
    } catch (err) {
      console.warn('[VehicleDetail] Inquiry API submission offline fallback:', err);
    } finally {
      setIsSubmittingInquiry(false);
      setInquirySent(true);
    }
  };

  const saved = isSaved(vehicle.id);
  const compared = isCompared(vehicle.id);

  // Related vehicles
  const relatedVehicles = MOCK_VEHICLES.filter(
    (v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.make === vehicle.make)
  ).slice(0, 3);

  return (
    <div className="space-y-12 bg-[#F5F7FA] pb-20">
      
      {/* 1. Light Breadcrumb and Title Area */}
      <div className="bg-white border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Browse Cars', href: '/cars' },
              { label: vehicle.make, href: `/cars?make=${vehicle.make}` },
              { label: vehicle.title },
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F36B32] text-white shadow-sm">
                  {vehicle.condition}
                </span>
                <span className="text-xs font-medium text-[#64748B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F36B32]" /> {vehicle.location}
                </span>
                <span className="text-xs font-medium text-[#64748B]">VIN: {vehicle.vin}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#14243A] tracking-tight">{vehicle.title}</h1>
              {vehicle.variant && (
                <p className="text-sm font-semibold text-[#64748B] mt-1">{vehicle.variant}</p>
              )}
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCompare(vehicle.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all shadow-sm ${
                  compared 
                    ? 'bg-[#F36B32] text-white border-[#F36B32]' 
                    : 'bg-white text-[#14243A] border-[#DCE3EC] hover:border-[#F36B32] hover:text-[#F36B32]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{compared ? 'Compared' : 'Compare'}</span>
              </button>
              <button
                onClick={() => toggleSave(vehicle.id)}
                className={`p-2.5 rounded-xl border transition-all shadow-sm ${
                  saved 
                    ? 'bg-red-500 text-white border-red-500' 
                    : 'bg-white text-[#14243A] border-[#DCE3EC] hover:border-red-400 hover:text-red-500'
                }`}
                title="Save Vehicle"
              >
                <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Gallery & Specifications */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Clean Gallery Presentation */}
            <div className="bg-white p-3 rounded-2xl border border-[#DCE3EC] shadow-card space-y-3">
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F0F4F8] relative">
                <img
                  src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#F36B32] shadow-md scale-[1.02]' : 'border-[#DCE3EC] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Light Specifications Cards */}
            <div className="bg-white border border-[#DCE3EC] rounded-2xl p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-[#DCE3EC] pb-4">
                <h3 className="text-xl font-bold text-[#14243A] tracking-tight">Engine & Performance Telemetry</h3>
                <span className="text-xs font-semibold text-[#64748B]">Verified Diagnostic Benchmark</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#DCE3EC]">
                  <Zap className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                  <span className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">Horsepower</span>
                  <p className="text-xl font-black text-[#14243A] mt-1">{vehicle.horsepower} HP</p>
                </div>

                <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#DCE3EC]">
                  <Gauge className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                  <span className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">0-60 Velocity</span>
                  <p className="text-xl font-black text-[#14243A] mt-1">{vehicle.acceleration}</p>
                </div>

                <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#DCE3EC]">
                  <Car className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                  <span className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">Top Speed</span>
                  <p className="text-xl font-black text-[#14243A] mt-1">{vehicle.topSpeed}</p>
                </div>

                <div className="p-4 bg-[#F5F7FA] rounded-xl border border-[#DCE3EC]">
                  <Calendar className="w-5 h-5 text-[#F36B32] mx-auto mb-2" />
                  <span className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">Odometer</span>
                  <p className="text-xl font-black text-[#14243A] mt-1">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
              </div>
            </div>

            {/* Dark Premium Equipment Section (#101D2D with Elevated Surface) */}
            <div className="bg-[#101D2D] text-white border border-[#34465B] rounded-2xl p-6 sm:p-8 shadow-dark-card space-y-6">
              <div className="flex items-center justify-between border-b border-[#34465B] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F36B32]">Bespoke Options</span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">Factory Options & Equipment</h3>
                </div>
                <span className="text-xs text-[#CBD5E1] bg-[#1D2D40] px-3 py-1 rounded-full border border-[#34465B]">
                  Authenticated Window Sticker
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicle.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 p-3 bg-[#1D2D40] rounded-xl border border-[#34465B]">
                    <div className="w-6 h-6 rounded-full bg-[#F36B32]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#F36B32]" />
                    </div>
                    <span className="text-sm font-semibold text-white">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Price Panel, Dealer, and Acquisition Form */}
          <div className="space-y-6">
            
            {/* Dark Navy Acquisition Price Panel (#101D2D) */}
            <div className="bg-[#101D2D] text-white border border-[#34465B] rounded-2xl p-6 shadow-dark-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#CBD5E1] font-bold">Acquisition Price</span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#F36B32] text-white">
                  Market Price Index
                </span>
              </div>
              <div className="text-4xl font-black text-white">
                ${vehicle.price.toLocaleString()}
              </div>
              {vehicle.monthlyPayment && (
                <div className="text-xs text-[#CBD5E1] pt-2 border-t border-[#34465B] flex items-center justify-between">
                  <span>Estimated Monthly Finance:</span>
                  <span className="font-bold text-[#F36B32]">${vehicle.monthlyPayment.toLocaleString()}/mo</span>
                </div>
              )}
            </div>

            {/* White Dealer Information Card */}
            <div className="bg-white border border-[#DCE3EC] rounded-2xl p-6 space-y-5 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#F5F7FA] overflow-hidden border border-[#DCE3EC] p-1 flex-shrink-0">
                  <img src={vehicle.dealer.logo} alt={vehicle.dealer.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#F36B32] font-bold block">Certified Marque Dealer</span>
                  <h4 className="text-base font-bold text-[#14243A] mt-0.5">{vehicle.dealer.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-0.5 font-medium">
                    <span className="text-amber-500 font-bold">★ {vehicle.dealer.rating}</span>
                    <span>({vehicle.dealer.reviewCount} Verified Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE3EC] space-y-3">
                <a
                  href={`tel:${vehicle.dealer.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#101D2D] hover:bg-[#14243A] text-white text-sm font-bold shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F36B32]" />
                  <span>Call Concierge: {vehicle.dealer.phone}</span>
                </a>

                <Link
                  href={`/dealers/${vehicle.dealer.id}`}
                  className="w-full block text-center py-2.5 text-xs font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
                >
                  View Full Dealership Inventory →
                </Link>
              </div>
            </div>

            {/* White Acquisition Request Form */}
            <div className="bg-white border border-[#DCE3EC] rounded-2xl p-6 space-y-4 shadow-card">
              <h3 className="text-xl font-bold text-[#14243A] tracking-tight">Inquire / Reserve Vehicle</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Submit your private allocation request. An AUTOVERSE VIP liaison will contact you within 2 hours.
              </p>

              {inquirySent ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Inquiry Received</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Your allocation request has been routed to {vehicle.dealer.name}. Reference ID: #AUT-{Math.floor(Math.random() * 89999 + 10000)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alexander Vance"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] placeholder:text-[#94A3B8] font-medium focus:outline-none focus:border-[#F36B32] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="alexander@example.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] placeholder:text-[#94A3B8] font-medium focus:outline-none focus:border-[#F36B32] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] placeholder:text-[#94A3B8] font-medium focus:outline-none focus:border-[#F36B32] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">Message (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Mention trade-in requests, enclosed transport destinations, or lease inquiries..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] placeholder:text-[#94A3B8] font-medium focus:outline-none focus:border-[#F36B32] focus:bg-white transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#F36B32] hover:bg-[#E85B25] text-white font-bold text-sm shadow-md shadow-[#F36B32]/30 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmittingInquiry ? 'Transmitting Request...' : 'Send Acquisition Request'}
                  </button>
                </form>
              )}

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#64748B] font-medium">
                <Lock className="w-3.5 h-3.5 text-[#F36B32]" />
                <span>Protected by AUTOVERSE Escrow Guarantee</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Vehicles on a Light Background */}
        <div className="pt-8 border-t border-[#DCE3EC] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B32]">Similar Alternatives</span>
              <h3 className="text-2xl font-black text-[#14243A] mt-0.5">Related Vehicles in Inventory</h3>
            </div>
            <Link
              href="/cars"
              className="text-sm font-bold text-[#F36B32] hover:text-[#E85B25] flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVehicles.map((rel) => (
              <VehicleCard key={rel.id} vehicle={rel} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
