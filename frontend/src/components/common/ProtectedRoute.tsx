'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  roleTitle: string;
}

export function ProtectedRoute({ children, allowedRoles, roleTitle }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#F36B32] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Verifying Cryptographic Credentials...</p>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-[#DCE3EC] rounded-3xl text-center space-y-6 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#14243A]">Authentication Required</h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Access to this {roleTitle} workspace requires an authenticated AUTOVERSE session.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
            className="w-full py-3 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated but unauthorized role
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 bg-white border border-rose-200 rounded-3xl text-center space-y-6 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700">
            Access Forbidden (403)
          </span>
          <h2 className="text-2xl font-black text-[#14243A]">Restricted Permission Domain</h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Your current account role (<strong className="text-[#14243A] uppercase">{user.role}</strong>) does not have clearance to access this <strong>{roleTitle}</strong> workspace.
          </p>
        </div>

        <div className="p-4 bg-[#F5F7FA] rounded-2xl border border-[#DCE3EC] text-left text-xs space-y-1">
          <p className="font-bold text-[#14243A]">Required Authorization:</p>
          <p className="text-[#64748B]">
            This zone is restricted exclusively to: {allowedRoles.map((r) => r.toUpperCase()).join(' or ')}.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            href={user.role === 'dealer' ? '/dealer' : user.role === 'admin' ? '/admin' : '/dashboard'}
            className="py-2.5 px-5 rounded-xl bg-[#101D2D] hover:bg-[#14243A] text-white text-xs font-bold transition-all"
          >
            Go to Your {user.role.toUpperCase()} Workspace
          </Link>
          <Link
            href="/"
            className="py-2.5 px-5 rounded-xl bg-[#F5F7FA] hover:bg-[#E8EDF3] text-[#14243A] text-xs font-bold border border-[#DCE3EC] transition-all"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
