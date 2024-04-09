import { Inter, Lusitana } from 'next/font/google';

/**
 * 
 * Next.js automatically optimizes fonts in the application when you use the next/font module. 
 * It downloads font files at build time and hosts them with your other static assets. 
 * This means when a user visits your application, 
 * there are no additional network requests for fonts which would impact performance.
 * 
 * Metric impacted: Cumulative Layout Shift
 * 
 * https://nextjs.org/learn/dashboard-app/optimizing-fonts-images
 */
 
export const inter = Inter({ subsets: ['latin'] });
 
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});