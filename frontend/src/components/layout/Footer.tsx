import React from 'react';
import Link from 'next/link';
import { 
  Car, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  ExternalLink,
  Heart,
  Globe
} from 'lucide-react';
import { MOCK_BRANDS } from '@/data/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E8EDF3] text-[#14243A] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8EDF3]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F36B32] to-[#DE561D] flex items-center justify-center text-white shadow-md shadow-[#F36B32]/20">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#14243A]">AUTOVERSE</span>
            </Link>
            <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
              The premier destination for buying, selling, and comparing authenticated luxury, sports, electric, and performance vehicles across certified global dealerships.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F4F8] border border-[#E8EDF3] font-medium text-[#14243A]">
                <ShieldCheck className="w-4 h-4 text-[#F36B32]" />
                150-Point Certified Inspection
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F4F8] border border-[#E8EDF3] font-medium text-[#14243A]">
                <Globe className="w-4 h-4 text-[#F36B32]" />
                Nationwide Delivery
              </span>
            </div>
          </div>

          {/* Col 1: Explore & Buy */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14243A]">Explore Inventory</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link href="/cars" className="hover:text-[#F36B32] transition-colors">Browse All Vehicles</Link></li>
              <li><Link href="/cars?bodyType=SUV" className="hover:text-[#F36B32] transition-colors">Performance SUVs</Link></li>
              <li><Link href="/cars?fuelType=Electric" className="hover:text-[#F36B32] transition-colors">Electric & Hybrids</Link></li>
              <li><Link href="/cars?bodyType=Coupe" className="hover:text-[#F36B32] transition-colors">Sports Coupes</Link></li>
              <li><Link href="/compare" className="hover:text-[#F36B32] transition-colors">Compare Vehicle Specs</Link></li>
            </ul>
          </div>

          {/* Col 2: Top Brands */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14243A]">Popular Brands</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              {MOCK_BRANDS.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link href={`/brands/${b.slug}`} className="hover:text-[#F36B32] transition-colors flex items-center justify-between">
                    <span>{b.name}</span>
                    <span className="text-xs text-[#94A3B8]">{b.vehicleCount}</span>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14243A]">Portals & Legal</h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li><Link href="/sell" className="hover:text-[#F36B32] transition-colors">Sell Your Car</Link></li>
              <li><Link href="/dealers" className="hover:text-[#F36B32] transition-colors">Dealership Directory</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#F36B32] transition-colors">Buyer Portal</Link></li>
              <li><Link href="/dealer" className="hover:text-[#F36B32] transition-colors">Dealer Console</Link></li>
              <li><Link href="/admin" className="hover:text-[#F36B32] transition-colors">Admin Governance</Link></li>
              <li><Link href="/privacy" className="hover:text-[#F36B32] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#F36B32] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {currentYear} AUTOVERSE Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Sample data & demo metrics clearly identified.
            </span>
            <Link href="/contact" className="hover:text-[#14243A]">Help & Support</Link>
            <Link href="/faq" className="hover:text-[#14243A]">Marketplace FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
