import React from 'react';
import Link from 'next/link';
import { MOCK_BRANDS } from '@/data/mockData';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ArrowRight, Globe } from 'lucide-react';

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Car Brands' }]} />

      <div className="pb-6 border-b border-[#DCE3EC]">
        <h1 className="text-3xl font-extrabold text-[#14243A]">Prestige Automotive Marquees</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Explore historical heritage, racing pedigree, and active marketplace allocations by marquee.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl overflow-hidden hover:border-[#F36B32] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] w-full bg-[#F0F4F8] overflow-hidden relative">
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black/80 backdrop-blur-md p-1 border border-white/20">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#14243A] group-hover:text-[#F36B32] transition-colors">
                      {brand.name}
                    </h3>
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#F36B32]" /> {brand.country} • Est. {brand.founded}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">
                  {brand.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#DCE3EC]/60 flex items-center justify-between text-xs text-[#64748B] mt-2">
              <span className="font-semibold text-[#14243A]">{brand.vehicleCount} Vehicles Listed</span>
              <span className="text-[#F36B32] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Showroom <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

