'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Car, 
  Heart, 
  Menu, 
  X, 
  PlusCircle, 
  User as UserIcon, 
  LogOut,
  ChevronDown,
  Bell,
  MessageSquare,
  ShieldAlert,
  Building2,
  SlidersHorizontal,
  Bookmark,
  Send,
  HelpCircle,
  Settings,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';
import { useAuth, UserRole } from '@/context/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const { savedIds } = useSavedVehicles();
  const { user, isAuthenticated, isLoading, logout, switchRole } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
        setRoleSwitcherOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setAccountDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    router.push('/');
  };

  // Determine dynamic navigation links based on user role
  const getNavLinks = () => {
    if (!isAuthenticated || !user) {
      // Guest Navigation
      return [
        { label: 'Buy Cars', href: '/cars' },
        { label: 'Brands', href: '/brands' },
        { label: 'Dealers', href: '/dealers' },
        { label: 'Compare', href: '/compare', badge: '2' },
        { label: 'About', href: '/about' },
      ];
    }

    if (user.role === 'dealer') {
      // Dealer Navigation
      return [
        { label: 'Browse Cars', href: '/cars' },
        { label: 'Inventory', href: '/dealer/inventory' },
        { label: 'Leads', href: '/dealer/leads', count: 3 },
        { label: 'Messages', href: '/dealer/inquiries', count: user.unreadMessages },
        { label: 'Analytics', href: '/dealer/analytics' },
      ];
    }

    if (user.role === 'admin') {
      // Admin Navigation
      return [
        { label: 'Admin Command', href: '/admin' },
        { label: 'Vehicles', href: '/admin/vehicles' },
        { label: 'Dealers', href: '/admin/dealers' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Reports', href: '/admin/reports' },
      ];
    }

    // Default: Authenticated Buyer Navigation
    return [
      { label: 'Buy Cars', href: '/cars' },
      { label: 'Brands', href: '/brands' },
      { label: 'Dealers', href: '/dealers' },
      { label: 'Compare', href: '/compare', badge: '2' },
      { label: 'About', href: '/about' },
    ];
  };

  const navLinks = getNavLinks();

  const getDashboardUrl = () => {
    if (!user) return '/dashboard';
    if (user.role === 'dealer') return '/dealer';
    if (user.role === 'admin') return '/admin';
    return '/dashboard';
  };

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
            {navLinks.map((link: any) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
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
                  {link.count && link.count > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#14243A] text-white">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Saved Vehicles Counter (Public or Buyer) */}
            {(!isAuthenticated || user?.role === 'buyer') && (
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
            )}

            {/* Notifications Indicator if logged in */}
            {isAuthenticated && user && (
              <Link
                href={user.role === 'dealer' ? '/dealer/inquiries' : user.role === 'admin' ? '/admin/reports' : '/dashboard/messages'}
                className="relative p-2.5 rounded-xl border border-[#E8EDF3] bg-[#F5F7FA] text-[#14243A] hover:text-[#F36B32] hover:border-[#F36B32]/30 hover:bg-white transition-all shadow-sm group"
                title="Notifications"
              >
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {user.unreadNotifications && user.unreadNotifications > 0 ? (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F36B32] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                    {user.unreadNotifications}
                  </span>
                ) : null}
              </Link>
            )}

            {/* Sell Your Car / List Vehicle context */}
            {(!isAuthenticated || user?.role === 'buyer') && (
              <Link
                href="/sell"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#14243A] bg-[#F0F4F8] hover:bg-[#E8EDF3] border border-[#E8EDF3] transition-colors flex items-center gap-2"
              >
                <span>Sell Your Car</span>
              </Link>
            )}

            {/* ============================================================== */}
            {/* GUEST STATE vs AUTHENTICATED STATE */}
            {/* ============================================================== */}
            {isLoading ? (
              <div className="w-24 h-10 bg-[#F0F4F8] rounded-xl animate-pulse" />
            ) : !isAuthenticated || !user ? (
              <>
                {/* Sign In Link */}
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
              </>
            ) : (
              /* Authenticated User Account Hub */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-[#F5F7FA] border border-[#DCE3EC] hover:border-[#F36B32]/40 transition-all shadow-sm group"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-xl object-cover border border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-[#101D2D] text-white flex items-center justify-center font-bold text-xs">
                      {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}

                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-[#14243A] leading-tight group-hover:text-[#F36B32] transition-colors">
                      {user.name}
                    </p>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#F36B32]">
                      {user.role}
                    </span>
                  </div>

                  <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180 text-[#F36B32]' : ''}`} />
                </button>

                {/* Authenticated Account Dropdown Menu */}
                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#DCE3EC] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {/* Header User Identity */}
                    <div className="px-4 py-3 border-b border-[#DCE3EC] bg-[#F5F7FA]/70">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-[#DCE3EC]" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-[#101D2D] text-white flex items-center justify-center font-bold text-sm">
                            {user.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <h4 className="text-sm font-bold text-[#14243A] truncate">{user.name}</h4>
                          <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#F36B32]/10 text-[#F36B32] border border-[#F36B32]/20">
                            {user.role === 'buyer' ? 'Verified Collector' : user.role === 'dealer' ? 'Licensed Dealer' : 'Platform Admin'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Demo Role Switcher Bar */}
                    <div className="px-3 py-2 bg-slate-50 border-b border-[#DCE3EC] flex items-center justify-between text-[11px]">
                      <span className="text-[#64748B] font-semibold">Demo Role Switch:</span>
                      <div className="flex items-center gap-1">
                        {(['buyer', 'dealer', 'admin'] as UserRole[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => switchRole(r)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                              user.role === r ? 'bg-[#101D2D] text-white' : 'text-[#64748B] hover:text-[#14243A] hover:bg-slate-200'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Role-Specific Dropdown Navigation */}
                    <div className="py-2 text-xs font-semibold text-[#14243A] space-y-0.5">
                      
                      {/* BUYER LINKS */}
                      {user.role === 'buyer' && (
                        <>
                          <Link
                            href="/dashboard"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <UserIcon className="w-4 h-4 text-[#F36B32]" />
                            <span>My Dashboard</span>
                          </Link>
                          <Link
                            href="/dashboard/saved"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Heart className="w-4 h-4 text-[#F36B32]" />
                              <span>My Favorites</span>
                            </div>
                            {savedIds.length > 0 && (
                              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F36B32] text-white font-bold">
                                {savedIds.length}
                              </span>
                            )}
                          </Link>
                          <Link
                            href="/dashboard/comparisons"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <SlidersHorizontal className="w-4 h-4 text-[#F36B32]" />
                            <span>My Comparisons</span>
                          </Link>
                          <Link
                            href="/dashboard/listings"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Bookmark className="w-4 h-4 text-[#F36B32]" />
                            <span>My Listings</span>
                          </Link>
                          <Link
                            href="/dashboard/messages"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <MessageSquare className="w-4 h-4 text-[#F36B32]" />
                              <span>Messages</span>
                            </div>
                            {user.unreadMessages && user.unreadMessages > 0 && (
                              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#14243A] text-white font-bold">
                                {user.unreadMessages}
                              </span>
                            )}
                          </Link>
                          <Link
                            href="/dashboard/settings"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Settings className="w-4 h-4 text-[#64748B]" />
                            <span>Account Settings</span>
                          </Link>
                        </>
                      )}

                      {/* DEALER LINKS */}
                      {user.role === 'dealer' && (
                        <>
                          <Link
                            href="/dealer"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Building2 className="w-4 h-4 text-[#F36B32]" />
                            <span>Dealer Portal Overview</span>
                          </Link>
                          <Link
                            href="/dealer/inventory"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Car className="w-4 h-4 text-[#F36B32]" />
                            <span>Showroom Inventory</span>
                          </Link>
                          <Link
                            href="/dealer/add-vehicle"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <PlusCircle className="w-4 h-4 text-[#F36B32]" />
                            <span>Add New Vehicle</span>
                          </Link>
                          <Link
                            href="/dealer/leads"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Send className="w-4 h-4 text-[#F36B32]" />
                              <span>Acquisition Leads</span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#F36B32] text-white font-bold">
                              3 New
                            </span>
                          </Link>
                          <Link
                            href="/dealer/analytics"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <BarChart3 className="w-4 h-4 text-[#F36B32]" />
                            <span>Dealership Analytics</span>
                          </Link>
                          <Link
                            href="/dealer/settings"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Settings className="w-4 h-4 text-[#64748B]" />
                            <span>Dealership Profile</span>
                          </Link>
                        </>
                      )}

                      {/* ADMIN LINKS */}
                      {user.role === 'admin' && (
                        <>
                          <Link
                            href="/admin"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <ShieldAlert className="w-4 h-4 text-red-500" />
                            <span>Admin Command</span>
                          </Link>
                          <Link
                            href="/admin/vehicles"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Car className="w-4 h-4 text-red-500" />
                            <span>Manage Listings</span>
                          </Link>
                          <Link
                            href="/admin/dealers"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Building2 className="w-4 h-4 text-red-500" />
                            <span>Manage Dealers</span>
                          </Link>
                          <Link
                            href="/admin/users"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <UserIcon className="w-4 h-4 text-red-500" />
                            <span>Manage Users</span>
                          </Link>
                          <Link
                            href="/admin/reports"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <BarChart3 className="w-4 h-4 text-red-500" />
                            <span>Platform Reports</span>
                          </Link>
                          <Link
                            href="/admin/settings"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F5F7FA] hover:text-[#F36B32] transition-colors"
                          >
                            <Settings className="w-4 h-4 text-[#64748B]" />
                            <span>Platform Settings</span>
                          </Link>
                        </>
                      )}

                      <div className="pt-2 border-t border-[#DCE3EC] mt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {(!isAuthenticated || user?.role === 'buyer') && (
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
            )}
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
          
          {/* User Profile Bar in Mobile */}
          {isAuthenticated && user && (
            <div className="p-3 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#101D2D] text-white flex items-center justify-center font-bold text-xs">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#14243A] leading-tight">{user.name}</h4>
                  <span className="text-[10px] font-bold uppercase text-[#F36B32]">{user.role}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-xs font-bold text-rose-600 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link: any) => (
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
                {link.count && link.count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#14243A] text-white">
                    {link.count}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8EDF3] flex flex-col gap-2">
            {(!isAuthenticated || user?.role === 'buyer') && (
              <Link
                href="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#F0F4F8] text-center text-sm font-bold text-[#14243A]"
              >
                Sell Your Car
              </Link>
            )}

            <Link
              href={getDashboardUrl()}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#F36B32] text-center text-sm font-bold text-white shadow-md shadow-[#F36B32]/20"
            >
              {isAuthenticated ? `${user?.role.toUpperCase()} PORTAL` : 'Sign In / Register'}
            </Link>

            {!isAuthenticated && (
              <div className="flex items-center justify-center gap-4 pt-2 text-xs font-semibold text-[#64748B]">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <span>•</span>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>Create Account</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
