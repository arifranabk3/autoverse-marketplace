'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  Car, 
  Users, 
  Building2, 
  Layers, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Admin Command', href: '/admin', icon: ShieldAlert },
    { label: 'Manage Vehicles', href: '/admin/vehicles', icon: Car },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Manage Dealers', href: '/admin/dealers', icon: Building2 },
    { label: 'Manage Categories', href: '/admin/categories', icon: Layers },
    { label: 'Global Analytics', href: '/admin/reports', icon: BarChart3 },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Dark Navy Admin Sidebar */}
        <aside className="w-full lg:w-64 bg-[#101D2D] border border-[#34465B] rounded-2xl p-4 space-y-2 flex-shrink-0 shadow-dark-card text-white">
          <div className="p-3 border-b border-[#34465B] mb-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F36B32] flex items-center justify-center text-white font-bold text-sm shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xs truncate">Super Admin</h3>
              <span className="text-[10px] text-[#F36B32] font-bold">Platform Governance</span>
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
              <span>Exit Admin</span>
            </Link>
          </div>
        </aside>

        {/* Admin Body: Light Workspace */}
        <div className="flex-1 w-full bg-white border border-[#DCE3EC] rounded-2xl p-6 sm:p-8 shadow-card">
          {children}
        </div>
      </div>
    </div>
  );
}

