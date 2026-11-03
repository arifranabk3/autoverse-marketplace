'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Car, 
  Search, 
  Heart, 
  SlidersHorizontal, 
  Menu, 
  X, 
  User, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  PlusCircle
} from 'lucide-react';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { savedIds, comparedIds } = useSavedVehicles();

  const navLinks = [
    { label: 'Browse Cars', href: '/cars' },
    { label: 'Brands', href: '/brands' },
    { label: 'Dealers', href: '/dealers' },
    { label: 'Compare', href: '/compare', badge: comparedIds.length > 0 ? comparedIds.length : null },
    { label: 'Sell Your Car', href: '/sell', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D10]/90 backdrop-blur-md border-b border-[#2A3039]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8533] flex items-center justify-center text-white shadow-lg shadow-[#FF6B00]/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white">
                AUTO<span className="text-[#FF6B00]">VERSE</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#A1A8B3] -mt-1 font-semibold">
                Prestige Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    link.highlight
                      ? 'text-[#FF6B00] hover:text-[#FF8533]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-[#A1A8B3] hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FF6B00] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons & Profiles */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/dashboard/saved"
              className="relative p-2 rounded-lg text-[#A1A8B3] hover:text-white hover:bg-[#14181E] border border-transparent hover:border-[#2A3039] transition-all"
              title="Saved Vehicles"
            >
              <Heart className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B00] text-[10px] font-bold flex items-center justify-center text-white">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-[#2A3039]" />

            {/* Portal Navigation Dropdown Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-[#FF6B00] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard/create-listing"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#FF6B00] text-white hover:bg-[#E55F00] shadow-md shadow-[#FF6B00]/25 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                List Vehicle
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/dashboard/saved"
              className="p-2 text-[#A1A8B3] hover:text-white relative"
            >
              <Heart className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#FF6B00] text-[9px] font-bold flex items-center justify-center text-white">
                  {savedIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#A1A8B3] hover:text-white hover:bg-[#14181E] border border-[#2A3039]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2A3039] bg-[#0B0D10] px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-[#A1A8B3] hover:text-white hover:bg-[#14181E]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#2A3039] flex flex-col gap-3">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#A1A8B3] hover:text-white"
            >
              <User className="w-4 h-4 text-[#FF6B00]" />
              Buyer / Collector Dashboard
            </Link>
            <Link
              href="/dealer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#A1A8B3] hover:text-white"
            >
              <Building2 className="w-4 h-4 text-[#FF6B00]" />
              Dealer Portal
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#A1A8B3] hover:text-white"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              Admin Portal
            </Link>

            <Link
              href="/dashboard/create-listing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-lg bg-[#FF6B00] text-white font-semibold text-center"
            >
              <PlusCircle className="w-4 h-4" />
              List Your Car
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

