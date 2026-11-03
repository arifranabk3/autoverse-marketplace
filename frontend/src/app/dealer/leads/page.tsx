import React from 'react';
import { Mail, Phone, Clock, ShieldCheck, Check } from 'lucide-react';

export default function DealerLeadsPage() {
  const leads = [
    {
      id: 1,
      name: 'Julian Vance',
      email: 'julian@vanceholding.com',
      phone: '+1 (415) 555-0199',
      vehicle: '2024 Porsche 911 GT3 RS',
      budget: '$350,000 Cash',
      status: 'Qualified Buyer',
      date: '25m ago'
    },
    {
      id: 2,
      name: 'Victoria Sterling',
      email: 'v.sterling@equityny.com',
      phone: '+1 (212) 555-0144',
      vehicle: '2025 Aston Martin DBS 770',
      budget: 'Trade-in + $250k',
      status: 'Escrow Pending',
      date: '3h ago'
    },
    {
      id: 3,
      name: 'Marcus Bell',
      email: 'mbell@apexcap.com',
      phone: '+1 (305) 555-0812',
      vehicle: '2024 Ferrari 296 GTB',
      budget: 'Pre-Approved Finance',
      status: 'Inspection Scheduled',
      date: '1d ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-[#2A3039]">
        <h1 className="text-2xl font-bold text-white">Dealership Inquiries & Qualified Leads</h1>
        <p className="text-xs text-[#A1A8B3] mt-1">High-intent buyer leads with verified funds and trade-in proposals.</p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 bg-[#1B2028] border border-[#2A3039] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-white text-base">{lead.name}</h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FF6B00]/20 text-[#FF6B00]">
                  {lead.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-white mt-1">
                Target Vehicle: <span className="text-[#FF6B00]">{lead.vehicle}</span> ({lead.budget})
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-[#A1A8B3] mt-2">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#FF6B00]" /> {lead.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#FF6B00]" /> {lead.phone}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#A1A8B3]" /> {lead.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <a
                href={`tel:${lead.phone}`}
                className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Call Lead
              </a>
              <button className="px-4 py-2 bg-[#14181E] border border-[#2A3039] text-white text-xs font-semibold rounded-xl hover:border-white">
                Open Dossier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

