import React from 'react';
import { MOCK_DEALERS, MOCK_VEHICLES } from '@/data/mockData';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { MapPin, Phone, Mail, Globe, Star, ShieldCheck, Award } from 'lucide-react';

export default function DealerProfilePage({ params }: { params: { id: string } }) {
  const dealer = MOCK_DEALERS.find((d) => d.id === params.id) || MOCK_DEALERS[0];
  const dealerInventory = MOCK_VEHICLES.filter((v) => v.dealer.id === dealer.id || v.dealer.name.includes(dealer.name));

  return (
    <div className="space-y-10 pb-20">
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-8 overflow-hidden bg-[#101D2D]">
        <div className="absolute inset-0">
          <img src={dealer.bannerImage} alt={dealer.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D] via-[#101D2D]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#FFFFFF] border border-[#34465B] p-2 shadow-xl">
              <img src={dealer.logo} alt={dealer.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F36B32]">Verified Dealership</span>
                <ShieldCheck className="w-4 h-4 text-[#F36B32]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{dealer.name}</h1>
              <p className="text-xs sm:text-sm text-[#CBD5E1] flex items-center gap-3 mt-1 font-medium">
                <span>{dealer.address}</span>
                <span>•</span>
                <span>Est. {dealer.established}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${dealer.phone}`}
              className="px-5 py-2.5 rounded-xl bg-[#F36B32] text-white font-bold text-sm hover:bg-[#DE561D] transition-colors flex items-center gap-2 shadow-lg shadow-[#F36B32]/25"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>{dealer.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Dealers', href: '/dealers' },
            { label: dealer.name },
          ]}
        />

        {/* Overview Box */}
        <div className="bg-[#FFFFFF] border border-[#DCE3EC] shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#14243A]">Dealership Profile & Advisory</h2>
          <p className="text-sm text-[#334155] leading-relaxed max-w-4xl">
            {dealer.description}
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-[#64748B] border-t border-[#E8EDF3] pt-4 font-medium">
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#F36B32]" /> {dealer.email}</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-[#F36B32]" /> {dealer.website}</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-current" /> <strong className="text-[#14243A]">{dealer.rating}</strong> Stars Rating ({dealer.reviewsCount} Buyer Reviews)</span>
          </div>
        </div>

        {/* Inventory Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#14243A]">Active Showroom Inventory</h2>
            <span className="text-xs font-semibold px-3 py-1 bg-[#F0F4F8] border border-[#DCE3EC] rounded-full text-[#64748B]">{dealerInventory.length} Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealerInventory.map((veh) => (
              <VehicleCard key={veh.id} vehicle={veh} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

