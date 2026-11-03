'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Client Concierge</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Connect with AUTOVERSE</h1>
        <p className="text-sm text-[#A1A8B3]">
          Whether inquiring about private allocation lists, dealership onboarding, or transaction escrow, our private desk is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-[#14181E] border border-[#2A3039] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Global Headquarters</h4>
                <p className="text-xs text-[#A1A8B3] mt-0.5">9405 Wilshire Blvd, Beverly Hills, CA 90212</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Private Concierge Line</h4>
                <p className="text-xs text-[#A1A8B3] mt-0.5">+1 (800) 555-AUTO (2886)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Direct Email</h4>
                <p className="text-xs text-[#A1A8B3] mt-0.5">vip@autoverse-marketplace.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Operating Hours</h4>
                <p className="text-xs text-[#A1A8B3] mt-0.5">24/7 Digital Concierge Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-[#14181E] border border-[#FF6B00]/40 rounded-2xl p-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#FF6B00] mx-auto" />
              <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
              <p className="text-sm text-[#A1A8B3]">
                An AUTOVERSE luxury automotive specialist has been assigned to your request and will contact you promptly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-[#14181E] border border-[#2A3039] rounded-2xl p-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Subject Category</label>
                <select className="w-full px-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]">
                  <option>Vehicle Purchase & Escrow Inquiry</option>
                  <option>Consignment & Private Placement</option>
                  <option>Dealership Network Onboarding</option>
                  <option>Press & Strategic Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A8B3] mb-1.5">Message / Inquiry Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your requirements or questions..."
                  className="w-full px-4 py-2.5 bg-[#1B2028] border border-[#2A3039] rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Concierge Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

