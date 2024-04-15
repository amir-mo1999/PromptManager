import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from "jsonwebtoken"
import { api } from "@/network"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "E-Mail",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        if (credentials === undefined) {
          return null
        }
        if (credentials.username === undefined || credentials.password === undefined) {
          return null
        }
        // send credentials to login route and get result
        const res = await api.login({
          username: credentials.username,
          password: credentials.password,
        })

        // check if response was successful
        if (res.status !== 200) {
          return null
        }

        // get user data
        const token = await res.json()
        const user = await (await api.getCurrentUser(token.access_token)).json()

        // If no error and we have and token data return them both
        if (res.ok && user && token) {
          return { userData: user, tokenData: token }
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // only after a login the user is returned which in this case is not a user but a jwt token
      if (user !== undefined) {
        token = user.tokenData
      }
      return { ...user.userData, ...user.tokenData }
    },
    async session({ session, token }) {
      console.log(token)
      // save token data in session
      session.token = token as any

      // retrieve user data and save it in session
      session.user = await (await api.getCurrentUser(session.token.access_token)).json()
      return session
    },
  },
  jwt: {
    maxAge: 60,
  },
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
})

export { handler as GET, handler as POST }
