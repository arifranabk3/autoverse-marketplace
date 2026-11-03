'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white">Reset Credentials</h2>
        <p className="text-xs text-[#A1A8B3]">Enter your registered email to receive recovery instructions</p>
      </div>

      {sent ? (
        <div className="p-6 bg-[#1B2028] border border-[#FF6B00]/40 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#FF6B00] mx-auto" />
          <h3 className="text-base font-bold text-white">Recovery Link Dispatched</h3>
          <p className="text-xs text-[#A1A8B3]">
            Please check your inbox. Follow the secure token link to reset your security password.
          </p>
          <Link
            href="/auth/reset-password"
            className="inline-block mt-2 text-xs font-bold text-[#FF6B00] hover:underline"
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
            <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Registered Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A1A8B3] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="collector@domain.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Send Password Recovery Link</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="text-center pt-2 border-t border-[#2A3039] text-xs text-[#A1A8B3]">
        Remembered your password?{' '}
        <Link href="/auth/login" className="text-[#FF6B00] font-semibold hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

