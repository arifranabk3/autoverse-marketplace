'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Car, 
  PlusCircle, 
  Heart, 
  SlidersHorizontal, 
  MessageSquare, 
  UserCircle, 
  LogOut,
  Bell,
  Search,
  Clock,
  HelpCircle,
  Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Favorites', href: '/dashboard/saved', icon: Heart },
    { label: 'Saved Searches', href: '/cars', icon: Search },
    { label: 'My Comparisons', href: '/dashboard/comparisons', icon: SlidersHorizontal },
    { label: 'My Inquiries', href: '/dashboard/messages', icon: Clock },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: user?.unreadMessages },
    { label: 'Notifications', href: '/dashboard/messages', icon: Bell, badge: user?.unreadNotifications },
    { label: 'My Listings', href: '/dashboard/listings', icon: Car },
    { label: 'Create Listing', href: '/dashboard/create-listing', icon: PlusCircle },
    { label: 'Account Settings', href: '/dashboard/settings', icon: Settings },
    { label: 'Help & Support', href: '/faq', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']} roleTitle="Collector / Buyer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Dark Navy Sidebar Nav */}
          <aside className="w-full lg:w-64 bg-[#101D2D] border border-[#34465B] rounded-2xl p-4 space-y-2 flex-shrink-0 shadow-dark-card text-white">
            <div className="p-3 border-b border-[#34465B] mb-2 flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-[#34465B]" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#F36B32] text-white flex items-center justify-center font-bold text-xs">
                  {user?.name.slice(0, 2).toUpperCase() || 'CU'}
                </div>
              )}
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F36B32]">Client Account</span>
                <h3 className="font-bold text-white text-sm truncate">{user?.name || 'Alexander Pierce'}</h3>
                <p className="text-[11px] text-[#CBD5E1] truncate">{user?.email || 'collector@autoverse.vip'}</p>
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
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#14243A] text-white font-bold">
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

          {/* Content Body */}
          <div className="flex-1 w-full bg-white border border-[#DCE3EC] rounded-2xl p-6 sm:p-8 shadow-card">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

