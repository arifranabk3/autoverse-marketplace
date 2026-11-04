'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth token for preview
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', 'mock_jwt_token');
    }
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#F0F4F8] border border-[#E8EDF3] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Client Portal Sign In</h2>
        <p className="text-xs text-[#64748B]">Enter your credentials to access your private collection</p>
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
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
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
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm shadow-lg shadow-[#F36B32]/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Sign In to AUTOVERSE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#E8EDF3] text-xs text-[#64748B]">
        Don't have an account yet?{' '}
        <Link href="/auth/register" className="text-[#F36B32] font-semibold hover:underline">
          Create Member Profile
        </Link>
      </div>
    </div>
  );
}

