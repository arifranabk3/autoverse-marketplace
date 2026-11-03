import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Car, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Compass, 
  Zap, 
  Users, 
  Star 
} from 'lucide-react';
import { MOCK_VEHICLES, MOCK_BRANDS, MOCK_DEALERS, MOCK_ARTICLES } from '@/data/mockData';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { HeroSearch } from '@/components/search/HeroSearch';

export default function HomePage() {
  const featuredVehicles = MOCK_VEHICLES.filter((v) => v.featured);
  const latestListings = MOCK_VEHICLES.slice(0, 3);

  const categories = [
    { name: 'Supercars & Coupes', count: '140+ Listings', icon: '🏎️', query: 'Coupe' },
    { name: 'Hypercars & V12', count: '28+ Allocations', icon: '⚡', query: 'Hypercar' },
    { name: 'Performance SUVs', count: '95+ Available', icon: '🚙', query: 'SUV' },
    { name: 'Electric Flagships', count: '45+ High-Volt', icon: '🔋', query: 'Sedan' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Background Dark Overlay with Ambient Lighting */}
        <div className="absolute inset-0 bg-[#0B0D10]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/80 to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF6B00]/15 blur-[140px] pointer-events-none rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2028]/80 border border-[#2A3039] text-[#FF6B00] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>The Global Pinnacle of Automotive Luxury</span>
          </div>

          {/* Hero Titles */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Acquire, Trade & Experience <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FF6B00]">
                Extraordinary Performance.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#A1A8B3] max-w-2xl mx-auto font-normal">
              Direct access to authenticated exotic sports cars, certified collector models, and verified prestige dealership inventories worldwide.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 pt-2 text-xs text-[#A1A8B3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-white">\$1.4B+</span> Inventory Transacted
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-white">100%</span> Escrow Guarantee
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-white">Verified</span> Dealership Network
            </div>
          </div>

          {/* Hero Search Component */}
          <div className="pt-6">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY BROWSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Curated Segments</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Browse by Vehicle Class</h2>
          </div>
          <Link href="/cars" className="text-sm text-[#FF6B00] hover:text-[#FF8533] font-semibold flex items-center gap-1">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/search?bodyType=${cat.query}`}
              className="group bg-[#14181E] border border-[#2A3039] p-6 rounded-2xl hover:border-[#FF6B00]/70 hover:bg-[#1B2028] transition-all flex items-center gap-4"
            >
              <div className="text-3xl p-3 bg-[#0B0D10] rounded-xl border border-[#2A3039] group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-[#FF6B00] transition-colors">{cat.name}</h3>
                <p className="text-xs text-[#A1A8B3] mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: FEATURED SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Exclusive Showroom</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Featured Performance Vehicles</h2>
          </div>
          <Link href="/cars" className="text-sm text-[#FF6B00] hover:text-[#FF8533] font-semibold flex items-center gap-1">
            Explore All Vehicles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* SECTION 4: PRESTIGE BRANDS */}
      <section className="bg-[#14181E]/60 border-y border-[#2A3039] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">World-Renowned Marquees</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Explore by Marque</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MOCK_BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group p-5 bg-[#1B2028] border border-[#2A3039] rounded-2xl hover:border-[#FF6B00] transition-all flex flex-col items-center text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0B0D10] p-1 border border-[#2A3039]">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-[#FF6B00] transition-colors">{brand.name}</h4>
                  <p className="text-[11px] text-[#A1A8B3]">{brand.vehicleCount} Available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: LATEST ADDITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Fresh Inventory</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Latest Market Additions</h2>
          </div>
          <Link href="/cars" className="text-sm text-[#FF6B00] hover:text-[#FF8533] font-semibold flex items-center gap-1">
            See All New Listings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestListings.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE AUTOVERSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14181E] border border-[#2A3039] rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">The AUTOVERSE Standard</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">Why Discerning Collectors Choose Us</h2>
            <p className="text-sm text-[#A1A8B3] mt-2">
              Every listing, dealer, and transaction undergoes rigorous technical and financial validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Full Provenance & VIN Inspection</h3>
              <p className="text-sm text-[#A1A8B3] leading-relaxed">
                Comprehensive 150-point physical inspection records, documented service history, and clean title certification for total peace of mind.
              </p>
            </div>

            <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct Dealership Connectivity</h3>
              <p className="text-sm text-[#A1A8B3] leading-relaxed">
                No middleman markup. Connect directly with factory-authorized franchise dealers and certified private collectors worldwide.
              </p>
            </div>

            <div className="p-6 bg-[#1B2028] border border-[#2A3039] rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">White-Glove Enclosed Escrow</h3>
              <p className="text-sm text-[#A1A8B3] leading-relaxed">
                Seamless digital escrow contracts combined with insured climate-controlled nationwide transport right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Streamlined Acquisition</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How AUTOVERSE Operates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="p-6 bg-[#14181E] border border-[#2A3039] rounded-2xl space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#FF6B00]">01</span>
            <h4 className="text-base font-bold text-white">Discover & Compare</h4>
            <p className="text-xs text-[#A1A8B3] leading-relaxed">Filter across rare specifications, custom options, horsepower, and provenance.</p>
          </div>

          <div className="p-6 bg-[#14181E] border border-[#2A3039] rounded-2xl space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#FF6B00]">02</span>
            <h4 className="text-base font-bold text-white">Verify Documentation</h4>
            <p className="text-xs text-[#A1A8B3] leading-relaxed">Review independent condition reports, ECU telemetry, and verified dealer credentials.</p>
          </div>

          <div className="p-6 bg-[#14181E] border border-[#2A3039] rounded-2xl space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#FF6B00]">03</span>
            <h4 className="text-base font-bold text-white">Secure Transaction</h4>
            <p className="text-xs text-[#A1A8B3] leading-relaxed">Fund the transaction through our encrypted escrow system with total buyer protection.</p>
          </div>

          <div className="p-6 bg-[#14181E] border border-[#2A3039] rounded-2xl space-y-3 relative">
            <span className="text-3xl font-extrabold text-[#FF6B00]">04</span>
            <h4 className="text-base font-bold text-white">Enclosed Delivery</h4>
            <p className="text-xs text-[#A1A8B3] leading-relaxed">Receive your high-performance vehicle delivered via insured white-glove carrier.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: SELL VEHICLE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1B2028] via-[#14181E] to-[#0B0D10] border border-[#FF6B00]/40 p-8 sm:p-14">
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="px-3 py-1 rounded-md bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold uppercase tracking-wider">
              Consignment & Instant Sale
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Ready to Divest or Trade Your Exotic Vehicle?
            </h2>
            <p className="text-sm text-[#A1A8B3] leading-relaxed">
              List your vehicle in front of over 500,000 verified high-net-worth buyers and collectors globally. Get instant competitive dealer offers or consign for maximum yield.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/sell"
                className="px-6 py-3 rounded-xl bg-[#FF6B00] text-white font-bold text-sm hover:bg-[#E55F00] shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center gap-2"
              >
                <span>List Your Vehicle Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[#14181E] text-white border border-[#2A3039] hover:border-white font-semibold text-sm transition-all"
              >
                Speak with Valuations Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: LATEST AUTOMOTIVE EDITORIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Market Intelligence</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Latest Automotive News & Guides</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_ARTICLES.map((art) => (
            <div key={art.id} className="bg-[#1B2028] border border-[#2A3039] rounded-2xl overflow-hidden group hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[16/9] w-full bg-[#14181E] overflow-hidden">
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#A1A8B3]">
                    <span className="text-[#FF6B00] font-semibold">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FF6B00] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#A1A8B3] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-[#2A3039]/50 mt-4 flex items-center justify-between text-xs text-[#A1A8B3]">
                <span>By {art.author}</span>
                <span>{art.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

