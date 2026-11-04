import React from 'react';
import { MOCK_BRANDS, MOCK_VEHICLES } from '@/data/mockData';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Globe, Calendar, Car, ShieldCheck } from 'lucide-react';

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const brand = MOCK_BRANDS.find((b) => b.slug === params.slug) || MOCK_BRANDS[0];
  const brandVehicles = MOCK_VEHICLES.filter((v) => v.make.toLowerCase() === brand.name.toLowerCase());

  return (
    <div className="space-y-12 pb-20">
      {/* Brand Hero Banner */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F7FA]">
          <img
            src={brand.heroImage}
            alt={brand.name}
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#FFFFFF] border border-[#DCE3EC] p-2">
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F36B32]">Official Marque</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#14243A]">{brand.name}</h1>
              <p className="text-sm text-[#64748B] flex items-center gap-4 mt-1">
                <span>{brand.country}</span>
                <span>•</span>
                <span>Established {brand.founded}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#F0F4F8]/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#DCE3EC]">
            <Car className="w-5 h-5 text-[#F36B32]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#64748B]">Active Showroom</span>
              <p className="text-lg font-bold text-[#14243A]">{brandVehicles.length} Vehicles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Brands', href: '/brands' },
            { label: brand.name },
          ]}
        />

        {/* Brand Narrative */}
        <div className="bg-[#F0F4F8] border border-[#DCE3EC] rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#14243A]">Pedigree & Heritage</h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-4xl">
            {brand.description} AUTOVERSE offers authenticated provenance, certified service records, and global transport delivery for all {brand.name} models transacted on the platform.
          </p>
        </div>

        {/* Brand Inventory */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#14243A]">Available {brand.name} Showroom</h2>
            <span className="text-xs text-[#64748B]">{brandVehicles.length} Models Ready</span>
          </div>

          {brandVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl">
              <p className="text-sm text-[#64748B]">
                Currently, private allocations for {brand.name} are available upon request through our concierge.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

