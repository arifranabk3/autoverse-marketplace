'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ShieldCheck, CheckCircle2, DollarSign, UploadCloud, ArrowRight } from 'lucide-react';

export default function SellYourCarPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Sell Your Car' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#F36B32] font-bold">Consignment & Instant Liquidity</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14243A]">Sell or Consign Your Vehicle</h1>
        <p className="text-sm text-[#64748B]">
          Reach verified international collectors or receive guaranteed instant purchase offers from our network of authorized luxury dealers.
        </p>
      </div>

      {submitted ? (
        <div className="p-10 bg-[#FFFFFF] border border-[#F36B32]/40 rounded-3xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F36B32]/20 text-[#F36B32] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#14243A]">Consignment Request Submitted</h2>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            Our private acquisitions team is running VIN telemetry and valuation comp models. You will receive an offer packet within 4 business hours.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-[#F0F4F8] border border-[#DCE3EC] rounded-3xl p-6 sm:p-10 space-y-8"
        >
          {/* Section 1: Vehicle Identifiers */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#14243A] border-b border-[#DCE3EC] pb-3">
              1. Vehicle Identification & Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">VIN (Vehicle Identification Number)</label>
                <input
                  type="text"
                  placeholder="e.g. WP0AF2A97RS..."
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Year, Make & Model</label>
                <input
                  type="text"
                  placeholder="e.g. 2024 Porsche 911 GT3 RS"
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Current Mileage (Miles)</label>
                <input
                  type="number"
                  placeholder="e.g. 2500"
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Desired Asking Price (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 320000"
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Uploads / Condition */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#14243A] border-b border-[#DCE3EC] pb-3">
              2. Vehicle Photos & Condition
            </h3>
            <div className="border-2 border-dashed border-[#DCE3EC] rounded-2xl p-8 text-center bg-[#FFFFFF] hover:border-[#F36B32] transition-colors cursor-pointer">
              <UploadCloud className="w-10 h-10 text-[#F36B32] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#14243A]">Drag and drop high-res exterior and interior photos</p>
              <p className="text-xs text-[#64748B] mt-1">Supports PNG, JPG, HEIC up to 50MB per batch</p>
            </div>
          </div>

          {/* Section 3: Owner Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#14243A] border-b border-[#DCE3EC] pb-3">
              3. Owner Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="First & Last Name"
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#64748B] mb-1.5">Direct Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-xl text-sm text-[#14243A] focus:outline-none focus:border-[#F36B32]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-[#14243A] font-bold text-base shadow-xl shadow-[#F36B32]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit for Valuation & Immediate Listing</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  );
}

