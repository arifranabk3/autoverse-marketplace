import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface StateFeedbackProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onRetry?: () => void;
}

export const EmptyState: React.FC<StateFeedbackProps> = ({
  title,
  description,
  actionLabel = 'Browse All Cars',
  actionHref = '/cars',
}) => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-[#1B2028] border border-[#2A3039] rounded-2xl">
      <div className="w-14 h-14 rounded-full bg-[#14181E] border border-[#2A3039] flex items-center justify-center text-[#A1A8B3] mb-4">
        <AlertCircle className="w-6 h-6 text-[#FF6B00]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#A1A8B3] max-w-md mb-6">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-sm font-semibold hover:bg-[#E55F00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{actionLabel}</span>
        </Link>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#1B2028] border border-[#2A3039] rounded-2xl overflow-hidden h-[380px]">
          <div className="w-full h-48 bg-[#2A3039]/40" />
          <div className="p-5 space-y-4">
            <div className="h-4 bg-[#2A3039]/50 rounded w-1/3" />
            <div className="h-6 bg-[#2A3039]/60 rounded w-3/4" />
            <div className="h-10 bg-[#2A3039]/30 rounded w-full" />
            <div className="h-8 bg-[#2A3039]/50 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

