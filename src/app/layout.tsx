import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Box of Workshops Admin',
  description: 'Admin dashboard for Box of Workshops',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f6f8fc] text-slate-800">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}