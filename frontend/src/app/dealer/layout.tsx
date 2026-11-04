'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  Car, 
  PlusCircle, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck,
  Send,
  MessageSquare,
  Star,
  Bell
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Overview', href: '/dealer', icon: Building2 },
    { label: 'Showroom Inventory', href: '/dealer/inventory', icon: Car },
    { label: 'Add New Vehicle', href: '/dealer/add-vehicle', icon: PlusCircle },
    { label: 'Customer Leads', href: '/dealer/leads', icon: Users, badge: 3 },
    { label: 'Inquiries & Messages', href: '/dealer/inquiries', icon: MessageSquare, badge: user?.unreadMessages },
    { label: 'Dealership Analytics', href: '/dealer/analytics', icon: BarChart3 },
    { label: 'Dealer Profile', href: '/dealer/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute allowedRoles={['dealer', 'admin']} roleTitle="Licensed Dealership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Dark Navy Dealer Sidebar */}
          <aside className="w-full lg:w-64 bg-[#101D2D] border border-[#34465B] rounded-2xl p-4 space-y-2 flex-shrink-0 shadow-dark-card text-white">
            <div className="p-3 border-b border-[#34465B] mb-2 flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-[#34465B]" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#F36B32] text-white flex items-center justify-center font-black text-sm shadow-md">
                  AP
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-xs truncate">{user?.dealershipName || 'Apex Prestige Motors'}</h3>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#F36B32]" /> Certified Franchise
                </span>
                <p className="text-[10px] text-[#CBD5E1] truncate">{user?.name || 'Marcus Vance'}</p>
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
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#F36B32] text-white shadow-md shadow-[#F36B32]/30 font-bold'
                        : 'text-[#CBD5E1] hover:text-white hover:bg-[#1D2D40]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#F36B32]" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && link.badge > 0 ? (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F36B32] text-white font-bold">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#34465B] mt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Dealer Body: Light Workspace */}
          <div className="flex-1 w-full bg-white border border-[#DCE3EC] rounded-2xl p-6 sm:p-8 shadow-card">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

