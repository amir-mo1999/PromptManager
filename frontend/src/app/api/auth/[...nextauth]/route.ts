import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { api } from "@/network"

const handler = NextAuth({
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
      async authorize(credentials, req) {
        fetch("http://backend:4000/auth/login", {
          method: "POST",
          redirect: "follow",
        })
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error))
        console.log(process.env.IS_SERVER_FLAG)
        return null
      },
    }),
  ],
})

export { handler as GET, handler as POST }
