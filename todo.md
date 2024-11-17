~ import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Twist',
      credentials: {
        twistKey: { label: 'Twist Key', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Verify credentials
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
}); `

