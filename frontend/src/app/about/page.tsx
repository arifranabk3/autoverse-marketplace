import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ShieldCheck, Award, Globe, Zap, CheckCircle2 } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">Redefining Exotic Automotive Commerce</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          The Definitive Digital Arena for Extraordinary Automobilia.
        </h1>
        <p className="text-base text-[#A1A8B3] leading-relaxed">
          AUTOVERSE was founded with a singular mission: to eliminate friction, opacity, and counterfeit risk in the multi-billion dollar exotic and collector automotive sector.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Cryptographic Title & Escrow</h3>
          <p className="text-sm text-[#A1A8B3] leading-relaxed">
            Every transaction is safeguarded by institutional-grade escrow reserves, ensuring buyer capital remains protected until physical inspection and title transfer are complete.
          </p>
        </div>

        <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Factory Pedigree Authentication</h3>
          <p className="text-sm text-[#A1A8B3] leading-relaxed">
            We partner with official factory archives, race engineers, and certified diagnostic master technicians to verify DME over-rev reports and original options lists.
          </p>
        </div>

        <div className="bg-[#14181E] border border-[#2A3039] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Global Enclosed Logistics</h3>
          <p className="text-sm text-[#A1A8B3] leading-relaxed">
            Our logistics network coordinates insured air-freight and climate-controlled hydraulic enclosed transport across North America, Europe, the Middle East, and Asia.
          </p>
        </div>
      </div>
    </div>
  );
}

