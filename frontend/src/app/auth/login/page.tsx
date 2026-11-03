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
    <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Client Portal Sign In</h2>
        <p className="text-xs text-[#A1A8B3]">Enter your credentials to access your private collection</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="collector@domain.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#A1A8B3]">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-[#FF6B00] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Sign In to AUTOVERSE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#2A3039] text-xs text-[#A1A8B3]">
        Don't have an account yet?{' '}
        <Link href="/auth/register" className="text-[#FF6B00] font-semibold hover:underline">
          Create Member Profile
        </Link>
      </div>
    </div>
  );
}

