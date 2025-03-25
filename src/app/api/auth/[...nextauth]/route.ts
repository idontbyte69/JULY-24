import NextAuth from 'next-auth'
// Temporarily commenting out Google Provider
// import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  // Temporarily removing Google authentication
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    // }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    error: '/sign-in',
  },
})

export { handler as GET, handler as POST } 