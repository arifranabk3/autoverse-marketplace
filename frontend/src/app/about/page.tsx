import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ShieldCheck, Award, Globe, Zap, CheckCircle2 } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F36B32]">Redefining Exotic Automotive Commerce</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#14243A] leading-tight">
          The Definitive Digital Arena for Extraordinary Automobilia.
        </h1>
        <p className="text-base text-[#64748B] leading-relaxed">
          AUTOVERSE was founded with a singular mission: to eliminate friction, opacity, and counterfeit risk in the multi-billion dollar exotic and collector automotive sector.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#F0F4F8] border border-[#DCE3EC] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 border border-[#F36B32]/30 flex items-center justify-center text-[#F36B32]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#14243A]">Cryptographic Title & Escrow</h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Every transaction is safeguarded by institutional-grade escrow reserves, ensuring buyer capital remains protected until physical inspection and title transfer are complete.
          </p>
        </div>

        <div className="bg-[#F0F4F8] border border-[#DCE3EC] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 border border-[#F36B32]/30 flex items-center justify-center text-[#F36B32]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#14243A]">Factory Pedigree Authentication</h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            We partner with official factory archives, race engineers, and certified diagnostic master technicians to verify DME over-rev reports and original options lists.
          </p>
        </div>

        <div className="bg-[#F0F4F8] border border-[#DCE3EC] p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#F36B32]/10 border border-[#F36B32]/30 flex items-center justify-center text-[#F36B32]">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#14243A]">Global Enclosed Logistics</h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Our logistics network coordinates insured air-freight and climate-controlled hydraulic enclosed transport across North America, Europe, the Middle East, and Asia.
          </p>
        </div>
      </div>
    </div>
  );
}

