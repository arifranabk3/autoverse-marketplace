'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/data/mockData';
import { 
  Car, 
  Heart, 
  SlidersHorizontal, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Clock, 
  DollarSign, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSavedVehicles } from '@/context/SavedVehiclesContext';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const { savedIds } = useSavedVehicles();
  const activeListings = MOCK_VEHICLES.slice(0, 2);
  const recentlyViewed = MOCK_VEHICLES.slice(2, 5);

  const mockInquiries = [
    {
      id: 'inq_01',
      vehicle: '2024 Porsche 911 GT3 RS',
      dealer: 'Apex Prestige Automotives',
      date: 'Today, 10:24 AM',
      status: 'Escrow Pending',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'inq_02',
      vehicle: '2025 Aston Martin DBS 770',
      dealer: 'Bavaria Heritage Motors',
      date: 'Yesterday, 3:15 PM',
      status: 'Allocation Confirmed',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DCE3EC] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#14243A]">
              Welcome back, {user?.name.split(' ')[0] || 'Alexander'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified Collector
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Account ID: <code className="text-[#14243A] font-semibold">{user?.id || 'usr_buyer_001'}</code> • Connected to AUTOVERSE VIP Clearinghouse
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/create-listing"
            className="px-4 py-2.5 rounded-xl bg-[#F36B32] hover:bg-[#DE561D] text-white text-xs font-bold shadow-md transition-all self-start"
          >
            + Create Private Listing
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Saved Vehicles</span>
            <Heart className="w-4 h-4 text-[#F36B32]" />
          </div>
          <p className="text-2xl font-black text-[#14243A]">{savedIds.length || 5}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">2 price drops this week</span>
        </div>

        <div className="p-4 bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Inquiries</span>
            <Clock className="w-4 h-4 text-[#F36B32]" />
          </div>
          <p className="text-2xl font-black text-[#14243A]">2</p>
          <span className="text-[10px] text-amber-600 font-semibold">1 awaiting dealer review</span>
        </div>

        <div className="p-4 bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Unread Messages</span>
            <MessageSquare className="w-4 h-4 text-[#F36B32]" />
          </div>
          <p className="text-2xl font-black text-[#F36B32]">{user?.unreadMessages || 2}</p>
          <span className="text-[10px] text-[#64748B]">Concierge online</span>
        </div>

        <div className="p-4 bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Escrow Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-[#14243A]">$45,000</p>
          <span className="text-[10px] text-[#64748B]">Protected by Guarantee</span>
        </div>
      </div>

      {/* Recent Inquiries & Telemetry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#14243A]">Recent Allocation Inquiries</h3>
          <Link href="/dashboard/messages" className="text-xs font-semibold text-[#F36B32] hover:underline">
            View All Inquiries
          </Link>
        </div>

        <div className="space-y-3">
          {mockInquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-4 bg-white border border-[#DCE3EC] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-[#F36B32]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#101D2D] text-white flex items-center justify-center font-bold text-xs">
                  <Car className="w-5 h-5 text-[#F36B32]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#14243A]">{inq.vehicle}</h4>
                  <p className="text-xs text-[#64748B]">Dealer: {inq.dealer} • {inq.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${inq.statusColor}`}>
                  {inq.status}
                </span>
                <Link
                  href="/dashboard/messages"
                  className="p-2 rounded-xl bg-[#F5F7FA] hover:bg-[#E8EDF3] text-[#14243A] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed Inventory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#14243A]">Recently Viewed Supercars</h3>
          <Link href="/cars" className="text-xs font-semibold text-[#F36B32] hover:underline">
            Explore All 50+ Supercars
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentlyViewed.map((veh) => (
            <Link
              key={veh.id}
              href={`/cars/${veh.id}`}
              className="group bg-[#F5F7FA] border border-[#DCE3EC] rounded-2xl overflow-hidden hover:border-[#F36B32] transition-all p-3"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-200 mb-2">
                <img src={veh.images[0]} alt={veh.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="text-xs font-bold text-[#14243A] truncate">{veh.title}</h4>
              <p className="text-sm font-black text-[#F36B32] mt-0.5">${veh.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Active Listings Preview */}
      <div className="space-y-4 pt-4 border-t border-[#DCE3EC]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#14243A]">Your Active Consignments</h3>
          <Link href="/dashboard/listings" className="text-xs font-semibold text-[#F36B32] hover:underline">
            Manage Listings
          </Link>
        </div>

        <div className="space-y-3">
          {activeListings.map((veh) => (
            <div
              key={veh.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-[#DCE3EC] rounded-2xl gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={veh.images[0]} alt={veh.title} className="w-20 h-14 object-cover rounded-xl border border-[#DCE3EC]" />
                <div>
                  <h4 className="font-bold text-[#14243A] text-sm">{veh.title}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">${veh.price.toLocaleString()} • {veh.mileage.toLocaleString()} mi</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live in Market
                </span>
                <Link
                  href={`/dashboard/edit-listing?id=${veh.id}`}
                  className="px-3 py-1.5 rounded-xl bg-[#F5F7FA] border border-[#DCE3EC] text-xs font-bold text-[#14243A] hover:border-[#F36B32] transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
