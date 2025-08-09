// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LayoutContent from './layoutContent';
import GalaxyBackground from '@/components/GalaxyBackground';
import { SidebarProvider } from './context/sidebar-context';
import { ModalProvider } from './context/modal-context';


// Define fonts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Star Rail Community',
  description: 'Honkai Star Rail companion site',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-100`}>
        <div className='fixed inse-0'>
          <GalaxyBackground/>
          </div>
        <ModalProvider>
          <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
          </SidebarProvider>
        </ModalProvider>
      </body>
    </html>
  );
}