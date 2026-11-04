'use client';

import React from 'react';
import { Send, User } from 'lucide-react';

export default function MessagesPage() {
  const threads = [
    { id: 1, sender: 'Apex Prestige Motors Concierge', car: '2024 Porsche 911 GT3 RS', time: '10m ago', unread: true },
    { id: 2, sender: 'South Beach Supercars VIP Desk', car: '2025 Aston Martin DBS 770', time: '2h ago', unread: false },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#E8EDF3]">
        <h1 className="text-2xl font-bold text-white">Private Concierge Messages</h1>
        <p className="text-xs text-[#64748B] mt-1">Direct communication with certified dealerships and escrow managers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thread List */}
        <div className="space-y-2">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                t.unread
                  ? 'bg-[#FFFFFF] border-[#F36B32]/50'
                  : 'bg-[#F0F4F8] border-[#E8EDF3] hover:bg-[#FFFFFF]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white truncate max-w-[150px]">{t.sender}</span>
                <span className="text-[#64748B] text-[10px]">{t.time}</span>
              </div>
              <p className="text-xs text-[#F36B32] mt-1 font-semibold">{t.car}</p>
            </div>
          ))}
        </div>

        {/* Active Chat Window */}
        <div className="md:col-span-2 bg-[#FFFFFF] border border-[#E8EDF3] rounded-2xl p-6 flex flex-col justify-between h-[420px]">
          <div className="space-y-4 overflow-y-auto">
            <div className="p-3 bg-[#F0F4F8] rounded-xl border border-[#E8EDF3] max-w-sm">
              <span className="text-[10px] text-[#64748B]">Apex Prestige Motors • 10:14 AM</span>
              <p className="text-xs text-white mt-1">
                Hello Alexander, the 911 GT3 RS is physically on our showroom floor. We can coordinate an enclosed private inspection this Thursday.
              </p>
            </div>

            <div className="p-3 bg-[#F36B32]/20 rounded-xl border border-[#F36B32]/40 max-w-sm ml-auto">
              <span className="text-[10px] text-[#F36B32]">You • 10:20 AM</span>
              <p className="text-xs text-white mt-1">
                Excellent. Does it have the factory DME report and title in hand?
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-[#E8EDF3]">
            <input
              type="text"
              placeholder="Type your message to dealer concierge..."
              className="flex-1 px-4 py-2 bg-[#F0F4F8] border border-[#E8EDF3] rounded-xl text-xs text-white focus:outline-none focus:border-[#F36B32]"
            />
            <button className="px-4 py-2 bg-[#F36B32] text-white rounded-xl text-xs font-bold hover:bg-[#DE561D]">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

