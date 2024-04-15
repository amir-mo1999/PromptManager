import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "@auth/core/jwt"
import userType from "./user"
import tokenType from "./token"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    token: tokenType
    user: userType
  }

  interface User {
    userData: userType
    tokenData: tokenType
  }
}

declare module "next-auth/jwt" {
  interface JWT extends tokenType {}
}
