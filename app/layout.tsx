import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini Typeform Copy',
  description: 'MVP minimal Typeform-like',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
