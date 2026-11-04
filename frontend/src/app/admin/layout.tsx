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
        {/* Admin Sidebar */}
        <aside className="w-full lg:w-64 bg-[#F0F4F8] border border-[#DCE3EC] rounded-2xl p-4 space-y-2 flex-shrink-0">
          <div className="p-3 border-b border-[#DCE3EC] mb-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-[#14243A] font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#14243A] text-xs truncate">Super Admin</h3>
              <span className="text-[10px] text-red-400 font-bold">Platform Governance</span>
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
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                      : 'text-[#64748B] hover:text-white hover:bg-[#FFFFFF]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#DCE3EC] mt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#14243A]"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </Link>
          </div>
        </aside>

        {/* Admin Body */}
        <div className="flex-1 w-full bg-[#F0F4F8] border border-[#DCE3EC] rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

