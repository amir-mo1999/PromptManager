import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "@auth/core/jwt"
import user from "./user"
import token from "./token"
declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    token: token
    user: user
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    token: token
  }
}
