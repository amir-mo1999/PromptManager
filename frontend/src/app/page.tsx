"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
export default function Home() {
  const { data: session } = useSession()

  console.log(session?.user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      The user {session?.user?.email} is logged in
    </main>
  )
}
