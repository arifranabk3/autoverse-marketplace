'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight, UserCheck, Building2, ShieldAlert } from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS, UserRole } from '@/context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');

  const { login } = useAuth();
  const [email, setEmail] = useState('alexander.pierce@autoverse.vip');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      if (redirectTarget) {
        router.push(redirectTarget);
      } else {
        router.push(res.redirectUrl);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    setIsSubmitting(true);
    try {
      const res = await login(role);
      if (redirectTarget) {
        router.push(redirectTarget);
      } else {
        router.push(res.redirectUrl);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DCE3EC] p-8 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F36B32]">
          Secure Gateway
        </span>
        <h2 className="text-2xl font-bold text-[#14243A]">Client Portal Sign In</h2>
        <p className="text-xs text-[#64748B]">Enter credentials or select a demonstration role below</p>
      </div>

      {/* Instant Demo Role Quick Selection */}
      <div className="p-4 bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl space-y-2.5">
        <span className="text-[11px] font-bold text-[#14243A] block">Instant Demo Access:</span>
        <div className="grid grid-cols-1 gap-2">
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.role}
              type="button"
              onClick={() => handleQuickDemoLogin(acc.role)}
              className="flex items-center justify-between p-2.5 bg-white border border-[#DCE3EC] hover:border-[#F36B32] hover:bg-[#F36B32]/5 rounded-xl text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  acc.role === 'buyer' ? 'bg-[#101D2D] text-white' : acc.role === 'dealer' ? 'bg-[#F36B32] text-white' : 'bg-red-600 text-white'
                }`}>
                  {acc.role === 'buyer' ? <UserCheck className="w-4 h-4" /> : acc.role === 'dealer' ? <Building2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#14243A] group-hover:text-[#F36B32] transition-colors">{acc.label}</p>
                  <p className="text-[10px] text-[#64748B]">{acc.user.email}</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#F36B32] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="collector@domain.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32] focus:bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#64748B]">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-[#F36B32] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32] focus:bg-white font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-white font-bold text-sm shadow-md shadow-[#F36B32]/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Authenticating...' : 'Sign In to AUTOVERSE'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#DCE3EC] text-xs text-[#64748B]">
        Don't have an account yet?{' '}
        <Link href="/auth/register" className="text-[#F36B32] font-semibold hover:underline">
          Create Member Profile
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="p-8 bg-white rounded-3xl border border-[#DCE3EC] text-center">
        <div className="w-8 h-8 border-4 border-[#F36B32] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
