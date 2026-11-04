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
        {/* Dark Navy Sidebar Nav */}
        <aside className="w-full lg:w-64 bg-[#101D2D] border border-[#34465B] rounded-2xl p-4 space-y-2 flex-shrink-0 shadow-dark-card text-white">
          <div className="p-3 border-b border-[#34465B] mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#F36B32]">Client Account</span>
            <h3 className="font-bold text-white text-sm mt-0.5 truncate">Alexander Pierce</h3>
            <p className="text-xs text-[#CBD5E1]">Verified Collector</p>
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
                      ? 'bg-[#F36B32] text-white shadow-md shadow-[#F36B32]/30 font-bold'
                      : 'text-[#CBD5E1] hover:text-white hover:bg-[#1D2D40]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#F36B32]" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#34465B] mt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Content Body */}
        <div className="flex-1 w-full bg-white border border-[#DCE3EC] rounded-2xl p-6 sm:p-8 shadow-card">
          {children}
        </div>
      </div>
    </div>
  );
}

