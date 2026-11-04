'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does AUTOVERSE verify exotic vehicle listings?',
      a: 'Every vehicle listed on AUTOVERSE undergoes a strict multi-tier verification process: VIN telemetry checks against international title databases, service log analysis, and on-site physical inspection performed by independent master technicians.'
    },
    {
      q: 'How does the digital escrow transaction process protect buyers?',
      a: 'When an acquisition is initiated, buyer funds are placed into an institutional FDIC-insured escrow account. Funds are released to the seller only after the vehicle arrives via enclosed transport, clears buyer sign-off, and all DMV title documentation is legally endorsed.'
    },
    {
      q: 'What are the fees for consigning or listing a vehicle?',
      a: 'Private sellers can list their vehicles with zero upfront fees. A transparent 2.5% success fee is deducted upon closing. Dealership partners access high-volume inventory syndication with flat monthly tier memberships.'
    },
    {
      q: 'Can international buyers acquire vehicles through AUTOVERSE?',
      a: 'Yes. Our dedicated customs and logistics concierge arranges export declarations, homologation paperwork, and insured international air/ocean freight to over 40 countries.'
    },
    {
      q: 'How do I apply to become an authorized AUTOVERSE dealer?',
      a: 'Licensed franchise and high-end independent automotive dealers can apply via our Dealer Portal. Qualification requires active dealer licensing, clean BBB ratings, and a verified physical showroom.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#F36B32] font-bold">Knowledge Base</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14243A]">Frequently Asked Questions</h1>
        <p className="text-sm text-[#64748B]">
          Everything you need to know about purchasing, selling, escrow security, and global vehicle transport.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-[#F0F4F8] border border-[#DCE3EC] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 text-[#14243A] font-bold text-base hover:text-[#F36B32] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#F36B32]' : 'text-[#64748B]'}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-[#64748B] leading-relaxed border-t border-[#DCE3EC]/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

