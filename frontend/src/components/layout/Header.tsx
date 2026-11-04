'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Car, 
  Search, 
  SlidersHorizontal, 
  Heart, 
  Menu, 
  X, 
  PlusCircle, 
  User, 
  Layers, 
  Building2, 
  Scale, 
  ShieldCheck,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { savedIds } = useSavedVehicles();

  const navLinks = [
    { label: 'Buy Cars', href: '/cars' },
    { label: 'Brands', href: '/brands' },
    { label: 'Dealers', href: '/dealers' },
    { label: 'Compare', href: '/compare', badge: '2' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E8EDF3] transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F36B32] to-[#DE561D] flex items-center justify-center shadow-md shadow-[#F36B32]/25 group-hover:scale-105 transition-transform duration-200">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#14243A] leading-none group-hover:text-[#F36B32] transition-colors">
                AUTOVERSE
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] mt-1">
                PREMIUM AUTOMOTIVE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#F36B32] bg-[#F36B32]/10' 
                      : 'text-[#14243A] hover:text-[#F36B32] hover:bg-[#F0F4F8]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F36B32] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="hidden md:flex items-center gap-3">
            {/* Saved Vehicles Counter */}
            <Link
              href="/dashboard/saved"
              className="relative p-2.5 rounded-xl border border-[#E8EDF3] bg-[#F5F7FA] text-[#14243A] hover:text-[#F36B32] hover:border-[#F36B32]/30 hover:bg-white transition-all shadow-sm group"
              title="Saved Vehicles"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F36B32] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Sell Car CTA */}
            <Link
              href="/sell"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#14243A] bg-[#F0F4F8] hover:bg-[#E8EDF3] border border-[#E8EDF3] transition-colors flex items-center gap-2"
            >
              <span>Sell Your Car</span>
            </Link>

            {/* Login Link */}
            <Link
              href="/auth/login"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#14243A] transition-colors"
            >
              Sign In
            </Link>

            {/* List Vehicle Button */}
            <Link
              href="/dealer/add-vehicle"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-white text-sm font-bold shadow-md shadow-[#F36B32]/25 hover:shadow-lg hover:shadow-[#F36B32]/35 transition-all duration-200 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Vehicle</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/dashboard/saved"
              className="relative p-2 rounded-lg text-[#14243A]"
            >
              <Heart className="w-6 h-6" />
              {savedIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F36B32] text-white text-[9px] font-bold flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#14243A] hover:bg-[#F0F4F8] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8EDF3] bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-[#F5F7FA] text-sm font-semibold text-[#14243A] hover:bg-[#F36B32]/10 hover:text-[#F36B32] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F36B32] text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8EDF3] flex flex-col gap-2">
            <Link
              href="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#F0F4F8] text-center text-sm font-bold text-[#14243A]"
            >
              Sell Your Car
            </Link>
            <Link
              href="/dealer/add-vehicle"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#F36B32] text-center text-sm font-bold text-white shadow-md shadow-[#F36B32]/20"
            >
              List Vehicle
            </Link>
            <div className="flex items-center justify-center gap-4 pt-2 text-xs font-semibold text-[#64748B]">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <span>•</span>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>Create Account</Link>
              <span>•</span>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
