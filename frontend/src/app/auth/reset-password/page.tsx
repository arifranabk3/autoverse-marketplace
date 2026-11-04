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
    <div className="bg-[#F0F4F8] border border-[#DCE3EC] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-[#14243A]">Create New Password</h2>
        <p className="text-xs text-[#64748B]">Your security token has been validated</p>
      </div>

      {complete ? (
        <div className="p-6 bg-[#FFFFFF] border border-[#F36B32]/40 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#F36B32] mx-auto" />
          <h3 className="text-base font-bold text-[#14243A]">Password Updated</h3>
          <p className="text-xs text-[#64748B]">
            Your password has been changed successfully. Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm shadow-lg shadow-[#F36B32]/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Update Password</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}

