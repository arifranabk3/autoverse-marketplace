import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#A1A8B3]">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <div className="border-b border-[#2A3039] pb-6">
        <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-[#A1A8B3] mt-2">Last Updated: November 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or interacting with the AUTOVERSE platform, you agree to be legally bound by these terms. AUTOVERSE functions as a specialized digital marketplace connecting private collectors, buyers, and certified dealer entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Listing Accuracy & Title Warranty</h2>
          <p>
            Sellers guarantee that all submitted vehicles possess valid titles, accurate mileage records, and transparent disclosure of historical accidents or modifications. Misrepresenting vehicle provenance results in immediate platform expulsion and legal indemnification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Escrow & Closing Protocol</h2>
          <p>
            All vehicle transactions exceeding \$50,000 USD must settle through the official AUTOVERSE escrow protocol. Direct peer-to-peer cash transfers outside of the verified platform are not insured under our buyer protection guarantee.
          </p>
        </section>
      </div>
    </div>
  );
}

