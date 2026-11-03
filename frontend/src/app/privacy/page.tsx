import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#A1A8B3]">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="border-b border-[#2A3039] pb-6">
        <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-[#A1A8B3] mt-2">Effective Date: November 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            When registering on AUTOVERSE, consigning vehicles, or applying for dealership partnership, we collect personal identifying records including full legal names, government identity credentials (for KYC/AML compliance during escrow), contact telemetry, and vehicle VIN documentation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Purpose of Processing</h2>
          <p>
            Collected telemetry is strictly used to authenticate transactions, execute escrow contracts, coordinate enclosed transport carriers, and prevent fraudulent title conveyances. We never trade, sell, or rent user data to third-party ad networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Cryptographic Storage & Security</h2>
          <p>
            All sensitive financial data, wire details, and identity documents are stored utilizing AES-256 bit encryption at rest and TLS 1.3 in transit. Access is governed by strict zero-trust operational protocols.
          </p>
        </section>
      </div>
    </div>
  );
}

