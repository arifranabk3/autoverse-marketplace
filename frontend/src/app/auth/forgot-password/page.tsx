'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-[#F0F4F8] border border-[#E8EDF3] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Reset Credentials</h2>
        <p className="text-xs text-[#64748B]">Enter your registered email to receive recovery instructions</p>
      </div>

      {sent ? (
        <div className="p-6 bg-[#FFFFFF] border border-[#F36B32]/40 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#F36B32] mx-auto" />
          <h3 className="text-base font-bold text-white">Recovery Link Dispatched</h3>
          <p className="text-xs text-[#64748B]">
            Please check your inbox. Follow the secure token link to reset your security password.
          </p>
          <Link
            href="/auth/reset-password"
            className="inline-block mt-2 text-xs font-bold text-[#F36B32] hover:underline"
          >
            Simulate Click Recovery Link →
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Registered Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="collector@domain.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E8EDF3] rounded-xl text-sm text-white focus:outline-none focus:border-[#F36B32]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-sm shadow-lg shadow-[#F36B32]/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Send Password Recovery Link</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="text-center pt-2 border-t border-[#E8EDF3] text-xs text-[#64748B]">
        Remembered your password?{' '}
        <Link href="/auth/login" className="text-[#F36B32] font-semibold hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

