import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

/**
 * Note, those fonts generate a node deprecation warning:
 * (node:16698) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
 * (Use `node --trace-deprecation ...` to show where the warning was created)
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
