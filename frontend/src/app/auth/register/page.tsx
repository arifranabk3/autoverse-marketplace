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
    <div className="bg-[#F0F4F8] border border-[#DCE3EC] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-[#14243A]">Create AUTOVERSE Account</h2>
        <p className="text-xs text-[#64748B]">Select your account classification to begin</p>
      </div>

      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl">
        <button
          type="button"
          onClick={() => setAccountType('buyer')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            accountType === 'buyer' ? 'bg-[#F36B32] text-white' : 'text-[#64748B] hover:text-white'
          }`}
        >
          Collector / Buyer
        </button>
        <button
          type="button"
          onClick={() => setAccountType('dealer')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            accountType === 'dealer' ? 'bg-[#F36B32] text-white' : 'text-[#64748B] hover:text-white'
          }`}
        >
          Licensed Dealer
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Full Legal Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Alexander Pierce"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="email"
              placeholder="alex@domain.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Create Secure Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="password"
              placeholder="Minimum 8 characters"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm shadow-lg shadow-[#F36B32]/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Complete Member Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#DCE3EC] text-xs text-[#64748B]">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[#F36B32] font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

