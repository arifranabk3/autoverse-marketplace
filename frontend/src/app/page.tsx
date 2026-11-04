'use client';

import React from 'react';
import Link from 'next/link';
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
  Star,
  Search,
  ChevronRight,
  Clock,
  Layers,
  ArrowUpRight,
  Shield,
  Lock,
  Flame
} from 'lucide-react';
import { 
  MOCK_VEHICLES, 
  MOCK_BRANDS, 
  MOCK_DEALERS, 
  MOCK_ARTICLES, 
  MOCK_BODY_STYLES, 
  MOCK_TESTIMONIALS 
} from '@/data/mockData';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { HeroSearch } from '@/components/search/HeroSearch';

export default function HomePage() {
  const featuredVehicles = MOCK_VEHICLES.filter((v) => v.featured).slice(0, 8);
  const recentlyAdded = MOCK_VEHICLES.filter((v) => v.isRecent || !v.featured).slice(0, 8);
  const luxuryCollection = MOCK_VEHICLES.filter((v) => v.isLuxury || v.price > 150000).slice(0, 4);
  const electricVehicles = MOCK_VEHICLES.filter((v) => v.fuelType === 'Electric' || v.isElectric).slice(0, 4);
  const budgetVehicles = MOCK_VEHICLES.filter((v) => v.price <= 60000 || v.isBudget).slice(0, 4);

  return (
    <div className="space-y-0">
      
      {/* =========================================================================
          SECTION B: HERO (CINEMATIC DEEP NAVY #101D2D WITH FLOATING SEARCH)
         ========================================================================= */}
      <section className="relative bg-[#101D2D] text-white pt-16 pb-28 overflow-hidden border-b border-[#34465B]">
        {/* Cinematic Backdrop Image with High Contrast Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 pointer-events-none transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D] via-[#101D2D]/85 to-transparent pointer-events-none" />
        
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F36B32]/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D2D40] border border-[#34465B] text-[#F36B32] text-xs font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Global Pinnacle of Automotive Luxury</span>
          </div>

          {/* Hero Titles */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Acquire, Trade & Experience <br />
              <span className="text-[#F36B32]">
                Extraordinary Performance.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
              Direct access to authenticated exotic sports cars, certified collector models, and verified prestige dealership inventories worldwide.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-white">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F36B32]" />
              $1.4B+ Transacted Inventory (Demo)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F36B32]" />
              150-Point Certified Inspection
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F36B32]" />
              Verified Dealership Network
            </span>
          </div>

          {/* Integrated Advanced Vehicle Search in a Floating White Panel */}
          <div className="pt-4 max-w-4xl mx-auto">
            <HeroSearch />
          </div>

          {/* Hero Secondary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/cars"
              className="px-6 py-3 rounded-xl bg-[#F36B32] hover:bg-[#E85B25] text-white text-sm font-bold shadow-lg shadow-[#F36B32]/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Explore All Vehicles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sell"
              className="px-6 py-3 rounded-xl bg-[#1D2D40] hover:bg-[#26384D] text-white border border-[#34465B] text-sm font-bold transition-all"
            >
              <span>List Your Car for Sale</span>
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION C: FEATURED VEHICLES (LIGHT GREY BACKGROUND #F5F7FA)
         ========================================================================= */}
      <section className="bg-[#F5F7FA] py-20 border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#F36B32] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked Showroom</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
                Featured Performance Vehicles
              </h2>
            </div>
            <Link
              href="/cars?featured=true"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
            >
              <span>View All Featured</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION D: POPULAR BRANDS (DEEP NAVY BACKGROUND #101D2D)
         ========================================================================= */}
      <section className="bg-[#101D2D] text-white py-20 border-b border-[#34465B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                World-Renowned Marques
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Explore by Brand
              </h2>
            </div>
            <Link
              href="/brands"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
            >
              <span>All 12+ Brands</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MOCK_BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group bg-[#1D2D40] p-5 rounded-2xl border border-[#34465B] hover:border-[#F36B32] hover:bg-[#26384D] transition-all duration-200 flex flex-col items-center text-center space-y-3 shadow-md"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#101D2D] border border-[#34465B] flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#F36B32] transition-colors">
                    {brand.name}
                  </h4>
                  <span className="text-xs font-semibold text-[#CBD5E1]">
                    {brand.vehicleCount || brand.count} Vehicles
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION E: RECENTLY ADDED (WHITE BACKGROUND #FFFFFF)
         ========================================================================= */}
      <section className="bg-white py-20 border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Fresh Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
                Recently Added Vehicles
              </h2>
            </div>
            <Link
              href="/cars?sortBy=year_desc"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
            >
              <span>View All New Arrivals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyAdded.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION F: PREMIUM & LUXURY COLLECTION (DARK NAVY EDITORIAL SECTION)
         ========================================================================= */}
      <section className="bg-[#101D2D] text-white py-20 border-b border-[#34465B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#34465B] pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Pinnacle Tier
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                The Luxury & Exotic Collection
              </h2>
              <p className="text-sm text-[#CBD5E1] mt-1">
                Hand-curated investment supercars, limited allocations, and V12 grand tourers.
              </p>
            </div>
            <Link
              href="/cars?minPrice=150000"
              className="px-5 py-2.5 rounded-xl bg-[#F36B32] hover:bg-[#E85B25] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Supercars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryCollection.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION G: ELECTRIC VEHICLES (LIGHT BACKGROUND #F5F7FA)
         ========================================================================= */}
      <section className="bg-[#F5F7FA] py-20 border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#F36B32] mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Next-Generation Powertrains</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
                Electric & Hybrid Flagships
              </h2>
            </div>
            <Link
              href="/cars?fuelType=Electric"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
            >
              <span>View All EVs</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {electricVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION H: BUDGET-FRIENDLY CARS (LIGHT GREY BACKGROUND #F5F7FA)
         ========================================================================= */}
      <section className="bg-white py-20 border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Accessible Value
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
                Quality Certified Under $60,000
              </h2>
            </div>
            <Link
              href="/cars?maxPrice=60000"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
            >
              <span>Browse Accessible Cars</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION I: FEATURED DEALERS (DARK NAVY BACKGROUND #101D2D WITH ELEVATED CARDS)
         ========================================================================= */}
      <section className="bg-[#101D2D] text-white py-20 border-b border-[#34465B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Verified Partner Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Certified Dealerships
              </h2>
            </div>
            <Link
              href="/dealers"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#E85B25] transition-colors"
            >
              <span>All 10 Dealerships</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {MOCK_DEALERS.slice(0, 5).map((dealer) => (
              <Link
                key={dealer.id}
                href={`/dealers/${dealer.id}`}
                className="group bg-[#1D2D40] p-5 rounded-2xl border border-[#34465B] hover:border-[#F36B32] hover:bg-[#26384D] transition-all flex flex-col justify-between shadow-dark-card"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#34465B] bg-[#101D2D]">
                    <img
                      src={dealer.logo}
                      alt={dealer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#F36B32] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Dealer</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#F36B32] transition-colors line-clamp-1">
                      {dealer.name}
                    </h4>
                    <p className="text-xs text-[#CBD5E1] line-clamp-1 mt-0.5">
                      {dealer.location}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#34465B] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-bold text-white">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {dealer.rating}
                  </span>
                  <span className="font-semibold text-[#CBD5E1]">
                    {dealer.inventoryCount} in stock
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION J: WHY AUTOVERSE (WHITE BACKGROUND #FFFFFF)
         ========================================================================= */}
      <section className="bg-white py-20 border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
              The AUTOVERSE Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
              Why Discerning Buyers Choose AUTOVERSE
            </h2>
            <p className="text-sm text-[#475569]">
              Engineered from the ground up to eradicate friction, opacity, and risk in automotive discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#DCE3EC] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#14243A]">150-Point Provenance</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Every vehicle includes verified VIN histories, condition reports, ECU telemetry audits, and clean title verification.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#DCE3EC] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#14243A]">Direct Dealer Connectivity</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Communicate directly with authorized franchise dealerships and vetted luxury private collectors with zero markups.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#DCE3EC] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#14243A]">Side-by-Side Comparison</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Compare power-to-weight, 0-60 acceleration, battery range, and estimated financing schedules across multiple vehicles.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-2xl border border-[#DCE3EC] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#14243A]">Transparent Pricing</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Real market index valuations and transparent dealer terms provide complete pricing clarity before you contact.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION K: TESTIMONIALS (DARK NAVY BACKGROUND #101D2D WITH ELEVATED CARDS)
         ========================================================================= */}
      <section className="bg-[#101D2D] text-white py-20 border-b border-[#34465B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                  Customer Experiences
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1D2D40] text-[#CBD5E1] border border-[#34465B]">
                  Demo Feedback
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Trusted by Automotive Enthusiasts
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TESTIMONIALS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-[#1D2D40] p-6 rounded-2xl border border-[#34465B] shadow-dark-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-white leading-relaxed italic">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#34465B] flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#34465B]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <span className="text-[11px] text-[#CBD5E1] block">{item.location}</span>
                    <span className="text-[10px] font-semibold text-[#F36B32] block">Acquired: {item.vehiclePurchased}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION L: AUTOMOTIVE NEWS & GUIDES (LIGHT BACKGROUND #F5F7FA)
         ========================================================================= */}
      <section className="bg-[#F5F7FA] py-20 border-b border-[#DCE3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Market Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
                Automotive News & Buyer Guides
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_ARTICLES.slice(0, 4).map((art) => (
              <div
                key={art.id}
                className="group bg-white rounded-2xl border border-[#DCE3EC] overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F4F8]">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 text-[#14243A] backdrop-blur-md shadow-sm">
                    {art.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                      <span>•</span>
                      <span>{art.publishedAt}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#14243A] group-hover:text-[#F36B32] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#DCE3EC] flex items-center justify-between text-xs font-bold text-[#F36B32]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION M: SELL YOUR CAR CTA (ORANGE-ACCENTED DARK SECTION)
         ========================================================================= */}
      <section className="bg-gradient-to-br from-[#101D2D] via-[#14243A] to-[#1D2D40] text-white py-16 border-b border-[#34465B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#1D2D40]/60 p-8 sm:p-12 rounded-3xl border border-[#34465B] shadow-floating">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                <Flame className="w-4 h-4 text-[#F36B32]" />
                Direct Consignment & Instant Offers
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Divest or Trade Your Exotic?
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Connect with verified high-net-worth collectors or receive competitive dealer buyout bids with full escrow protection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                href="/sell"
                className="px-8 py-3.5 rounded-xl bg-[#F36B32] hover:bg-[#E85B25] text-white text-sm font-bold shadow-lg shadow-[#F36B32]/30 transition-all text-center whitespace-nowrap active:scale-95"
              >
                List Your Vehicle Free
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[#1D2D40] hover:bg-[#26384D] text-white border border-[#34465B] text-sm font-bold transition-all text-center whitespace-nowrap"
              >
                Speak with Valuations Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
