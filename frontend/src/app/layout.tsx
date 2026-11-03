import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SavedVehiclesProvider } from '@/context/SavedVehiclesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AUTOVERSE | Premium Enterprise Automotive Marketplace',
  description: 'The world’s definitive destination for buying, selling, and comparing exotic, luxury, and high-performance supercars.',
  keywords: ['supercars', 'luxury cars', 'porsche', 'ferrari', 'lamborghini', 'exotic car marketplace'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0B0D10] text-white min-h-screen flex flex-col`}>
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

