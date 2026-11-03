'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Car, 
  PlusCircle, 
  Heart, 
  SlidersHorizontal, 
  MessageSquare, 
  UserCircle, 
  LogOut 
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', href: '/dashboard/listings', icon: Car },
    { label: 'Create Listing', href: '/dashboard/create-listing', icon: PlusCircle },
    { label: 'Saved Vehicles', href: '/dashboard/saved', icon: Heart },
    { label: 'My Comparisons', href: '/dashboard/comparisons', icon: SlidersHorizontal },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { label: 'Profile Settings', href: '/dashboard/settings', icon: UserCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 bg-[#14181E] border border-[#2A3039] rounded-2xl p-4 space-y-2 flex-shrink-0">
          <div className="p-3 border-b border-[#2A3039] mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6B00]">Client Account</span>
            <h3 className="font-bold text-white text-sm mt-0.5 truncate">Alexander Pierce</h3>
            <p className="text-xs text-[#A1A8B3]">Verified Collector</p>
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20'
                      : 'text-[#A1A8B3] hover:text-white hover:bg-[#1B2028]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#2A3039] mt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 w-full bg-[#14181E] border border-[#2A3039] rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

