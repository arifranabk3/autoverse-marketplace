'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [complete, setComplete] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setComplete(true);
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  return (
    <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Create New Password</h2>
        <p className="text-xs text-[#A1A8B3]">Your security token has been validated</p>
      </div>

      {complete ? (
        <div className="p-6 bg-[#1B2028] border border-[#FF6B00]/40 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#FF6B00] mx-auto" />
          <h3 className="text-base font-bold text-white">Password Updated</h3>
          <p className="text-xs text-[#A1A8B3]">
            Your password has been changed successfully. Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Update Password</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}

