import React from 'react';
import Link from 'next/link';
import { Car, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#F36B32] flex items-center justify-center text-white">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-wider text-[#14243A]">
              AUTO<span className="text-[#F36B32]">VERSE</span>
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

