import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SavedVehiclesProvider } from '@/context/SavedVehiclesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AUTOVERSE | Premium Automotive Marketplace',
  description: 'The world’s definitive destination for buying, selling, and comparing verified premium luxury, performance, and electric vehicles.',
  keywords: ['automotive marketplace', 'luxury cars', 'porsche', 'ferrari', 'bmw', 'mercedes', 'buy cars online'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F5F7FA] text-[#14243A] min-h-screen flex flex-col antialiased selection:bg-[#F36B32] selection:text-white`}>
        <SavedVehiclesProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SavedVehiclesProvider>
      </body>
    </html>
  );
}
