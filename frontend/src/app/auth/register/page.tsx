'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'buyer' | 'dealer'>('buyer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', 'mock_registered_token');
    }
    if (accountType === 'dealer') {
      router.push('/dealer');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Create AUTOVERSE Account</h2>
        <p className="text-xs text-[#A1A8B3]">Select your account classification to begin</p>
      </div>

      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#1B2028] border border-[#2A3039] rounded-xl">
        <button
          type="button"
          onClick={() => setAccountType('buyer')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            accountType === 'buyer' ? 'bg-[#FF6B00] text-white' : 'text-[#A1A8B3] hover:text-white'
          }`}
        >
          Collector / Buyer
        </button>
        <button
          type="button"
          onClick={() => setAccountType('dealer')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            accountType === 'dealer' ? 'bg-[#FF6B00] text-white' : 'text-[#A1A8B3] hover:text-white'
          }`}
        >
          Licensed Dealer
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Full Legal Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Alexander Pierce"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
            <input
              type="email"
              placeholder="alex@domain.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Create Secure Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
            <input
              type="password"
              placeholder="Minimum 8 characters"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Complete Member Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#2A3039] text-xs text-[#A1A8B3]">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[#FF6B00] font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

