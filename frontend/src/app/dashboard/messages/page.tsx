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
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Private Concierge Messages</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">Direct communication with certified dealerships and escrow managers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thread List */}
        <div className="space-y-2">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                t.unread
                  ? 'bg-[#1B2028] border-[#FF6B00]/50'
                  : 'bg-[#14181E] border-[#2A3039] hover:bg-[#1B2028]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white truncate max-w-[150px]">{t.sender}</span>
                <span className="text-[#A1A8B3] text-[10px]">{t.time}</span>
              </div>
              <p className="text-xs text-[#FF6B00] mt-1 font-semibold">{t.car}</p>
            </div>
          ))}
        </div>

        {/* Active Chat Window */}
        <div className="md:col-span-2 bg-[#1B2028] border border-[#2A3039] rounded-2xl p-6 flex flex-col justify-between h-[420px]">
          <div className="space-y-4 overflow-y-auto">
            <div className="p-3 bg-[#14181E] rounded-xl border border-[#2A3039] max-w-sm">
              <span className="text-[10px] text-[#A1A8B3]">Apex Prestige Motors • 10:14 AM</span>
              <p className="text-xs text-white mt-1">
                Hello Alexander, the 911 GT3 RS is physically on our showroom floor. We can coordinate an enclosed private inspection this Thursday.
              </p>
            </div>

            <div className="p-3 bg-[#FF6B00]/20 rounded-xl border border-[#FF6B00]/40 max-w-sm ml-auto">
              <span className="text-[10px] text-[#FF6B00]">You • 10:20 AM</span>
              <p className="text-xs text-white mt-1">
                Excellent. Does it have the factory DME report and title in hand?
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-[#2A3039]">
            <input
              type="text"
              placeholder="Type your message to dealer concierge..."
              className="flex-1 px-4 py-2 bg-[#14181E] border border-[#2A3039] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
            />
            <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-xl text-xs font-bold hover:bg-[#E55F00]">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

