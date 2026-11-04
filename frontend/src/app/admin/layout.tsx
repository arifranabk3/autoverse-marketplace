'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  Car, 
  Users, 
  Building2, 
  Layers, 
  BarChart3, 
  Settings, 
  LogOut,
  CheckCircle,
  FileText,
  History,
  Tag
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const links = [
    { label: 'Admin Command', href: '/admin', icon: ShieldAlert },
    { label: 'Manage Vehicles', href: '/admin/vehicles', icon: Car },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Manage Dealers', href: '/admin/dealers', icon: Building2 },
    { label: 'Categories & Taxonomy', href: '/admin/categories', icon: Layers },
    { label: 'Platform Reports', href: '/admin/reports', icon: BarChart3, badge: 2 },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute allowedRoles={['admin']} roleTitle="Super Admin Governance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Dark Navy Admin Sidebar */}
          <aside className="w-full lg:w-64 bg-[#101D2D] border border-[#34465B] rounded-2xl p-4 space-y-2 flex-shrink-0 shadow-dark-card text-white">
            <div className="p-3 border-b border-[#34465B] mb-2 flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-red-500/40" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-xs truncate">{user?.name || 'Elena Rostova'}</h3>
                <span className="text-[10px] text-red-400 font-bold block uppercase tracking-wider">Super Administrator</span>
                <p className="text-[10px] text-[#CBD5E1] truncate">{user?.email || 'admin@autoverse.com'}</p>
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
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-bold'
                        : 'text-[#CBD5E1] hover:text-white hover:bg-[#1D2D40]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-red-400" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && link.badge > 0 ? (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold">
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

          {/* Admin Body: Light Workspace */}
          <div className="flex-1 w-full bg-white border border-[#DCE3EC] rounded-2xl p-6 sm:p-8 shadow-card">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

