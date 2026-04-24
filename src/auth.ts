import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("Usuário não encontrado ou senha não definida");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Senha incorreta");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          subscription: user.subscription,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Credentials provider requires JWT sessions
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
        session.user.subscription = token.subscription as any;
        // Ensure image is passed from token to session
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.subscription = (user as any).subscription;
        // Store image in the standard JWT 'picture' field
        token.picture = user.image;
      }
      
      // Update session manually after checkout
      if (trigger === "update" && session?.subscription) {
        token.subscription = {
          ...(token.subscription as any),
          ...session.subscription,
        };
      }
      
      return token;
    },
  },
  trustHost: true,
});
