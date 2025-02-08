import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createUser, getUserByEmail } from "@/lib/db"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        const existingUser = await getUserByEmail(user.email)

        if (!existingUser) {
          await createUser(user.email, user.name || null, user.image || null)
        }

        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        const userData = await getUserByEmail(session.user.email)
        session.user = {
          ...session.user,
          ...userData,
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
})

export { handler as GET, handler as POST }

