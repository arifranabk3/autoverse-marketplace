'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Car, 
  PlusCircle, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/dealer', icon: Building2 },
    { label: 'Showroom Inventory', href: '/dealer/inventory', icon: Car },
    { label: 'Add Vehicle', href: '/dealer/add-vehicle', icon: PlusCircle },
    { label: 'Customer Leads', href: '/dealer/leads', icon: Users },
    { label: 'Dealership Analytics', href: '/dealer/analytics', icon: BarChart3 },
    { label: 'Dealer Profile', href: '/dealer/settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Dealer Sidebar */}
        <aside className="w-full lg:w-64 bg-[#14181E] border border-[#2A3039] rounded-2xl p-4 space-y-2 flex-shrink-0">
          <div className="p-3 border-b border-[#2A3039] mb-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-bold text-sm">
              AP
            </div>
            <div>
              <h3 className="font-bold text-white text-xs truncate">Apex Prestige Motors</h3>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Certified Franchise
              </span>
            </div>
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
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#A1A8B3] hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Portal</span>
            </Link>
          </div>
        </aside>

        {/* Dealer Body */}
        <div className="flex-1 w-full bg-[#14181E] border border-[#2A3039] rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

