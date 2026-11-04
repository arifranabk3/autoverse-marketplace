import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  Globe,
  Lock,
  ChevronRight
} from 'lucide-react';
import { MOCK_BRANDS } from '@/data/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101D2D] text-white border-t border-[#34465B] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#34465B]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F36B32] to-[#E85B25] flex items-center justify-center text-white shadow-md shadow-[#F36B32]/30">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">AUTOVERSE</span>
            </Link>
            <p className="text-sm text-[#CBD5E1] max-w-sm leading-relaxed">
              The premier destination for buying, selling, and comparing authenticated luxury, sports, electric, and performance vehicles across certified global dealerships.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D2D40] border border-[#34465B] font-medium text-white">
                <ShieldCheck className="w-4 h-4 text-[#F36B32]" />
                150-Point Certified Inspection
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D2D40] border border-[#34465B] font-medium text-white">
                <Globe className="w-4 h-4 text-[#F36B32]" />
                White-Glove Transport
              </span>
            </div>
          </div>

          {/* Col 1: Explore & Buy */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F36B32]">Explore Marketplace</h4>
            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              <li><Link href="/cars" className="hover:text-white transition-colors">Browse All Vehicles</Link></li>
              <li><Link href="/cars?bodyType=SUV" className="hover:text-white transition-colors">Performance SUVs</Link></li>
              <li><Link href="/cars?fuelType=Electric" className="hover:text-white transition-colors">Electric & Hybrids</Link></li>
              <li><Link href="/cars?bodyType=Coupe" className="hover:text-white transition-colors">Sports Coupes</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Vehicle Specs</Link></li>
            </ul>
          </div>

          {/* Col 2: Top Brands */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F36B32]">Popular Brands</h4>
            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              {MOCK_BRANDS.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link href={`/brands/${b.slug}`} className="hover:text-white transition-colors flex items-center justify-between">
                    <span>{b.name}</span>
                    <span className="text-xs text-[#64748B]">{b.vehicleCount || b.count}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brands" className="text-[#F36B32] font-semibold hover:underline inline-flex items-center gap-1 text-xs pt-1">
                  View All Brands <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portals & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F36B32]">Portals & Legal</h4>
            <ul className="space-y-2.5 text-sm text-[#CBD5E1]">
              <li><Link href="/sell" className="hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link href="/dealers" className="hover:text-white transition-colors">Dealership Directory</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Buyer Portal</Link></li>
              <li><Link href="/dealer" className="hover:text-white transition-colors">Dealer Console</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Governance</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBD5E1]">
          <p>© {currentYear} AUTOVERSE Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Lock className="w-3.5 h-3.5 text-[#F36B32]" />
              Sample data & demo metrics clearly identified.
            </span>
            <Link href="/contact" className="hover:text-white transition-colors">Help & Support</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Marketplace FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
