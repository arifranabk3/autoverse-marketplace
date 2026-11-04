import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-[#64748B] py-3 font-medium" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-[#F36B32] transition-colors flex items-center gap-1.5 text-[#64748B]">
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-[#F36B32] transition-colors text-[#64748B]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#14243A] font-bold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

