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
      <div className="pb-6 border-b border-[#DCE3EC]">
        <h1 className="text-2xl font-bold text-[#14243A]">Dealership Inquiries & Qualified Leads</h1>
        <p className="text-xs text-[#64748B] mt-1">High-intent buyer leads with verified funds and trade-in proposals.</p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 bg-[#FFFFFF] border border-[#DCE3EC] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-[#14243A] text-base">{lead.name}</h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F36B32]/20 text-[#F36B32]">
                  {lead.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#14243A] mt-1">
                Target Vehicle: <span className="text-[#F36B32]">{lead.vehicle}</span> ({lead.budget})
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-[#64748B] mt-2">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#F36B32]" /> {lead.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#F36B32]" /> {lead.phone}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#64748B]" /> {lead.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <a
                href={`tel:${lead.phone}`}
                className="px-4 py-2 bg-[#F36B32] hover:bg-[#DE561D] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Call Lead
              </a>
              <button className="px-4 py-2 bg-[#F0F4F8] border border-[#DCE3EC] text-[#14243A] text-xs font-semibold rounded-xl hover:border-white">
                Open Dossier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

