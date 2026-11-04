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
  ArrowUpRight
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
  // 1. Featured vehicles (minimum 8)
  const featuredVehicles = MOCK_VEHICLES.filter((v) => v.featured).slice(0, 8);
  
  // 2. Recently added vehicles (minimum 8)
  const recentlyAdded = MOCK_VEHICLES.filter((v) => v.isRecent || !v.featured).slice(0, 8);

  // 3. Premium & Luxury Collection
  const luxuryCollection = MOCK_VEHICLES.filter((v) => v.isLuxury || v.price > 150000).slice(0, 4);

  // 4. Electric & Hybrid Vehicles
  const electricVehicles = MOCK_VEHICLES.filter((v) => v.fuelType === 'Electric' || v.isElectric).slice(0, 4);

  // 5. Budget-Friendly Vehicles (< $60k)
  const budgetVehicles = MOCK_VEHICLES.filter((v) => v.price <= 60000 || v.isBudget).slice(0, 4);

  return (
    <div className="space-y-20 pb-20 bg-[#F5F7FA]">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
         ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-24 overflow-hidden bg-gradient-to-b from-[#E8EDF3]/40 via-white to-[#F5F7FA]">
        {/* Soft Background Accent Ambient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F36B32]/10 blur-[130px] pointer-events-none rounded-full" />
        
        {/* Subtle Backdrop Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80')`
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8EDF3] text-[#F36B32] text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The World’s Premier Automotive Marketplace</span>
          </div>

          {/* Hero Titles */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#14243A] leading-[1.1]">
              Acquire, Trade & Experience <br />
              <span className="text-[#F36B32]">
                Extraordinary Performance.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Direct access to authenticated exotic sports cars, certified collector models, and verified prestige dealership inventories worldwide.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-[#14243A]">
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

          {/* SECTION 2 & 3: HERO SEARCH INTERFACE */}
          <div className="pt-4 max-w-4xl mx-auto">
            <HeroSearch />
          </div>

          {/* Hero CTA Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/cars"
              className="px-6 py-3 rounded-xl bg-[#14243A] hover:bg-[#1E3350] text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore All Vehicles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sell"
              className="px-6 py-3 rounded-xl bg-white hover:bg-[#F0F4F8] text-[#14243A] border border-[#E8EDF3] text-sm font-bold shadow-sm transition-all"
            >
              <span>List Your Car for Sale</span>
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: FEATURED VEHICLES (Minimum 8 Cards)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#DE561D] transition-colors"
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
      </section>


      {/* =========================================================================
          SECTION 5: BROWSE BY BODY STYLE (8 Body Styles)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
            Tailored Profiles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
            Browse by Body Style
          </h2>
          <p className="text-sm text-[#64748B]">
            Find the vehicle silhouette engineered specifically for your driving aspirations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {MOCK_BODY_STYLES.map((style) => (
            <Link
              key={style.id}
              href={`/cars?bodyType=${style.slug}`}
              className="group bg-white p-4 rounded-2xl border border-[#E8EDF3] text-center shadow-card hover:shadow-card-hover hover:border-[#F36B32]/30 transition-all duration-200 flex flex-col items-center justify-between"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {style.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#14243A] group-hover:text-[#F36B32] transition-colors">
                  {style.name}
                </h3>
                <span className="text-[11px] font-semibold text-[#64748B] block mt-0.5">
                  {style.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 6: POPULAR BRANDS (Minimum 12 Brands)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
              World-Renowned Marques
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
              Explore by Brand
            </h2>
          </div>
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#DE561D] transition-colors"
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
              className="group bg-white p-5 rounded-2xl border border-[#E8EDF3] hover:border-[#F36B32]/40 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F0F4F8] border border-[#E8EDF3] flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#14243A] group-hover:text-[#F36B32] transition-colors">
                  {brand.name}
                </h4>
                <span className="text-xs font-semibold text-[#64748B]">
                  {brand.vehicleCount} Vehicles
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 7: RECENTLY ADDED VEHICLES (Minimum 8 Cards)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#DE561D] transition-colors"
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
      </section>


      {/* =========================================================================
          SECTION 8: PREMIUM & LUXURY COLLECTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white via-white to-[#F0F4F8] border border-[#E8EDF3] shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8EDF3] pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Pinnacle Tier
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
                The Luxury & Exotic Collection
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Hand-curated investment supercars, limited allocations, and V12 grand tourers.
              </p>
            </div>
            <Link
              href="/cars?minPrice=150000"
              className="px-5 py-2.5 rounded-xl bg-[#14243A] hover:bg-[#1E3350] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
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
          SECTION 9: ELECTRIC & HYBRID VEHICLES
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#DE561D] transition-colors"
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
      </section>


      {/* =========================================================================
          SECTION 10: BUDGET-FRIENDLY VEHICLES (< $60,000)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#DE561D] transition-colors"
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
      </section>


      {/* =========================================================================
          SECTION 11: FEATURED DEALERS (10 Certified Dealers)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
              Verified Partner Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
              Certified Dealerships
            </h2>
          </div>
          <Link
            href="/dealers"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F36B32] hover:text-[#DE561D] transition-colors"
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
              className="group bg-white p-5 rounded-2xl border border-[#E8EDF3] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#E8EDF3] bg-[#F5F7FA]">
                  <img
                    src={dealer.logo}
                    alt={dealer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Dealer</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#14243A] group-hover:text-[#F36B32] transition-colors line-clamp-1">
                    {dealer.name}
                  </h4>
                  <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                    {dealer.location}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8EDF3] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-bold text-[#14243A]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {dealer.rating}
                </span>
                <span className="font-semibold text-[#64748B]">
                  {dealer.inventoryCount} in stock
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 12: WHY CHOOSE AUTOVERSE
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
            The AUTOVERSE Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
            Why Discerning Buyers Choose AUTOVERSE
          </h2>
          <p className="text-sm text-[#64748B]">
            Engineered from the ground up to eradicate friction, opacity, and risk in automotive discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8EDF3] shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14243A]">150-Point Provenance</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every vehicle includes verified VIN histories, condition reports, ECU telemetry audits, and clean title verification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8EDF3] shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14243A]">Direct Dealer Connectivity</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Communicate directly with authorized franchise dealerships and vetted luxury private collectors with zero markups.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8EDF3] shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14243A]">Side-by-Side Comparison</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Compare power-to-weight, 0-60 acceleration, battery range, and estimated financing schedules across multiple vehicles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8EDF3] shadow-card space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 text-[#F36B32] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14243A]">Transparent Pricing</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Real market index valuations and transparent dealer terms provide complete pricing clarity before you contact.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 13: HOW IT WORKS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8EDF3] shadow-card">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
              Simple 4-Step Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14243A]">
              How AUTOVERSE Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="space-y-3">
              <span className="text-3xl font-black text-[#F36B32]">01</span>
              <h4 className="text-base font-bold text-[#14243A]">Discover & Filter</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Filter across 50+ attributes including engine capacity, 0-60 acceleration, and fuel types to pinpoint your match.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-3xl font-black text-[#F36B32]">02</span>
              <h4 className="text-base font-bold text-[#14243A]">Inspect Telemetry</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Review high-resolution galleries, factory window stickers, dealer ratings, and certified inspection checksheets.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-3xl font-black text-[#F36B32]">03</span>
              <h4 className="text-base font-bold text-[#14243A]">Connect Directly</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Send direct inquiries or schedule private showroom appointments with verified dealerships with one click.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-3xl font-black text-[#F36B32]">04</span>
              <h4 className="text-base font-bold text-[#14243A]">Secure Purchase</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Finalize terms directly with the seller and arrange optional climate-controlled enclosed delivery to your door.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 14: CUSTOMER TESTIMONIALS (Sample Customer Reviews)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
                Customer Experiences
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0F4F8] text-[#64748B] border border-[#E8EDF3]">
                Demo Feedback
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14243A] mt-1">
              Trusted by Automotive Enthusiasts
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-[#E8EDF3] shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#14243A] leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8EDF3] flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E8EDF3]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#14243A]">{item.name}</h4>
                  <span className="text-[11px] text-[#64748B] block">{item.location}</span>
                  <span className="text-[10px] font-semibold text-[#F36B32] block">Acquired: {item.vehiclePurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 15: AUTOMOTIVE NEWS & GUIDES (Minimum 4 Articles)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
              className="group bg-white rounded-2xl border border-[#E8EDF3] overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col"
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
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8EDF3] flex items-center justify-between text-xs font-bold text-[#F36B32]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 16: NEWSLETTER SUBSCRIPTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#14243A] to-[#0B1524] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-elevated">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F36B32]">
              Exclusive Drops & Market Reports
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Stay Ahead of the Prestige Market
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Receive private supercar allocations, rarity analyses, and certified dealer inventory drops directly in your inbox.
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed to AUTOVERSE Market Intelligence!'); }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your VIP email address..."
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#F36B32] flex-1"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-white text-sm font-bold shadow-md transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
