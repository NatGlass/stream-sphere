import ThemeProvider from '@/components/theme/ThemeProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Stream Sphere',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          storageKey="stream-sphere-theme"
        >
          <Toaster theme="dark" position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
