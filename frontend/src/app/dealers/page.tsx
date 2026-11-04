import React from 'react';
import Link from 'next/link';
import { MOCK_DEALERS } from '@/data/mockData';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Building2, MapPin, Star, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DealerDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Dealer Directory' }]} />

      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-3xl font-extrabold text-white">Certified Dealership Network</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Explore factory-authorized franchise dealerships and premier private showrooms across North America.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_DEALERS.map((dealer) => (
          <div
            key={dealer.id}
            className="bg-[#FFFFFF] border border-[#E8EDF3] rounded-2xl overflow-hidden hover:border-[#F36B32]/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[21/9] w-full bg-[#F0F4F8] overflow-hidden relative">
                <img src={dealer.bannerImage} alt={dealer.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F36B32]" /> Verified Partner
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white hover:text-[#F36B32] transition-colors">
                      <Link href={`/dealers/${dealer.id}`}>{dealer.name}</Link>
                    </h3>
                    <p className="text-xs text-[#F36B32] font-semibold mt-0.5">{dealer.tagline}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F36B32]" /> {dealer.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-white">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> {dealer.rating} ({dealer.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {dealer.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#E8EDF3]/50 flex items-center justify-between text-xs text-[#64748B] mt-2">
              <span className="font-semibold text-white">{dealer.inventoryCount} Active Vehicles</span>
              <Link
                href={`/dealers/${dealer.id}`}
                className="text-[#F36B32] font-bold flex items-center gap-1 hover:translate-x-1 transition-transform"
              >
                <span>Visit Showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

