"use client"
import { RedirectUser } from "@/components"
// when accessing the base route redirect the user based on their role
export default function Home() {
  return <RedirectUser></RedirectUser>
}
