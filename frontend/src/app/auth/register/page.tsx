'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Mail, Lock, ArrowRight, Building2, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [accountType, setAccountType] = useState<'buyer' | 'dealer'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await login(accountType);
      router.push(res.redirectUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DCE3EC] p-8 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F36B32]">
          Membership Enrollment
        </span>
        <h2 className="text-2xl font-bold text-[#14243A]">Create AUTOVERSE Account</h2>
        <p className="text-xs text-[#64748B]">Select your account classification to begin</p>
      </div>

      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl">
        <button
          type="button"
          onClick={() => setAccountType('buyer')}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            accountType === 'buyer' 
              ? 'bg-[#101D2D] text-white shadow-md' 
              : 'text-[#64748B] hover:text-[#14243A]'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#F36B32]" />
          <span>Collector / Buyer</span>
        </button>
        <button
          type="button"
          onClick={() => setAccountType('dealer')}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
            accountType === 'dealer' 
              ? 'bg-[#F36B32] text-white shadow-md' 
              : 'text-[#64748B] hover:text-[#14243A]'
          }`}
        >
          <Building2 className="w-4 h-4 text-white" />
          <span>Licensed Dealer</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Full Legal Name</label>
          <div className="relative">
            <UserIcon className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Julian Thorne"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32] focus:bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="julian@domain.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32] focus:bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Password</label>
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
          <span>{isSubmitting ? 'Registering...' : `Register as ${accountType === 'dealer' ? 'Dealer' : 'Collector'}`}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#DCE3EC] text-xs text-[#64748B]">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[#F36B32] font-semibold hover:underline">
          Sign In Here
        </Link>
      </div>
    </div>
  );
}
