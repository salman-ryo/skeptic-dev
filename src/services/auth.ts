import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongoose';
import { generateAccessToken, generateRefreshToken } from '@/lib/tokens';

export const authOptions = {
  // cookies: {
  //   sessionToken: {
  //     name: '__Secure-authjs.session-token',
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production', // `true` in production, `false` in development
  //       sameSite: process.env.NODE_ENV === 'production' ? "none" as const : "lax" as const, // More permissive in dev, stricter in prod
  //       path: '/',
  //     }
  //   }
  // },  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectToDatabase();
        try {
          
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            console.error('User not found');
            return null
          }
          const passwordsMatch = await user.comparePassword(credentials?.password);
          if (passwordsMatch) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role
            };
          } else{
            return null;
          }
        } catch (error: any) {
          console.error(error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, profile }: { token: any, user?: any, profile?: any }) {
      await connectToDatabase();

      if (user || profile) {
        const email = user?.email || profile?.email || token.email;

        if (email) {
          let dbUser = await User.findOne({ email });

          if (!dbUser) {
            // Create a new user if one doesn’t exist
            dbUser = await User.create({
              email,
              name: user?.name || profile?.name, // Store name
              image: user?.image || profile?.picture, // Store profile picture
              password: "" // Dummy password (not used for Google users)
            });
          } else {
            // Update name and profile picture if it's changed
            dbUser.name = user?.name || profile?.name || dbUser.name;
            dbUser.image = user?.image || profile?.picture || dbUser.image;
            await dbUser.save();
          }

          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
          token.role = dbUser.role;
          token.accessToken = await generateAccessToken({ id: dbUser._id.toString(), role: dbUser.role });
          token.refreshToken = await generateRefreshToken({ id: dbUser._id.toString(), email: dbUser.email, role: dbUser.role });
        }
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    }
  },
  pages: {
    signIn: '/login',
    // signIn: `https://theskepticdev.vercel.app/login`,
    // signIn: `${getBaseUrl()}/login`,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
