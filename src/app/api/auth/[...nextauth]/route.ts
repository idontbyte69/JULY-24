import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Here you would typically:
      // 1. Check if the user exists in your database
      // 2. If not, create a new user record
      // 3. Return true to allow sign in
      return true
    },
    async session({ session, token }) {
      // Here you would typically:
      // 1. Add additional user data to the session
      // 2. Format the session data as needed
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    error: '/sign-in',
  },
})

export { handler as GET, handler as POST } 