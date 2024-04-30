import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // redirect the user to our custom login page
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        // Redirect unauthenticated users to login page
        return false; 
      } else if (isLoggedIn) {
        // Redirect authenticated users to dashboard page
        // TODO: what if user wants to go elsewhere and credentials expired ?
        console.log("HEEEEEEEEERE");
        console.log(new URL('/dashboard', nextUrl));
        console.log(nextUrl);
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  // Add providers with an empty array for now
  providers: [], 
} satisfies NextAuthConfig;
