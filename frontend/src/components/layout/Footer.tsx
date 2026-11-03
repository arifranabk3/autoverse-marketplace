'use client';

import React from 'react';
import Link from 'next/link';
import { Car, Mail, Phone, MapPin, ShieldCheck, Globe, Instagram, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0D10] border-t border-[#2A3039] text-[#A1A8B3]">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-[#2A3039]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#14181E] to-[#1B2028] p-8 rounded-2xl border border-[#2A3039]">
            <div className="max-w-xl">
              <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-widest">
                Exclusive Concierge
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Stay Ahead in the Prestige Automotive Market
              </h3>
              <p className="text-sm text-[#A1A8B3] mt-2">
                Receive private allocations, rare hypercar drops, and market valuation reports delivered directly to your inbox.
              </p>
            </div>
            <form className="flex w-full lg:w-auto items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your VIP email..."
                className="w-full sm:w-80 px-4 py-3 rounded-xl bg-[#0B0D10] border border-[#2A3039] text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E55F00] transition-all whitespace-nowrap"
              >
                Join Private List
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] flex items-center justify-center text-white">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                AUTO<span className="text-[#FF6B00]">VERSE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#A1A8B3] max-w-sm">
              The premier global automotive marketplace engineered for exotic car connoisseurs, certified dealership groups, and high-performance enthusiasts.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-[#14181E] border border-[#2A3039] flex items-center justify-center text-[#A1A8B3] hover:text-[#FF6B00] hover:border-[#FF6B00] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#14181E] border border-[#2A3039] flex items-center justify-center text-[#A1A8B3] hover:text-[#FF6B00] hover:border-[#FF6B00] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#14181E] border border-[#2A3039] flex items-center justify-center text-[#A1A8B3] hover:text-[#FF6B00] hover:border-[#FF6B00] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Marketplace */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/cars" className="hover:text-white transition-colors">Browse All Vehicles</Link></li>
              <li><Link href="/search?bodyType=Coupe" className="hover:text-white transition-colors">Supercars & Coupes</Link></li>
              <li><Link href="/search?fuelType=Electric" className="hover:text-white transition-colors">Hyper-EVs</Link></li>
              <li><Link href="/brands" className="hover:text-white transition-colors">Car Brands</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Specifications</Link></li>
              <li><Link href="/dealers" className="hover:text-white transition-colors">Certified Dealerships</Link></li>
            </ul>
          </div>

          {/* Column 2: Portals & Dashboards */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Platform Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sell" className="hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Buyer Dashboard</Link></li>
              <li><Link href="/dealer" className="hover:text-white transition-colors">Dealer Portal</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Platform Admin</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Account Login</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About AUTOVERSE</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Knowledge Base & FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#2A3039] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A1A8B3] gap-4">
          <p>© 2026 AUTOVERSE Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              SSL 256-Bit Encrypted Escrow
            </span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/faq" className="hover:text-white">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

