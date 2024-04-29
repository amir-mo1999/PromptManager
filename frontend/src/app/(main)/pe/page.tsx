"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (session?.user.role === "prompt_engineer") {
    return (
      <main>
        <div>You are a prompt engineer, welcome</div>
      </main>
    )
  }

  return <main>You are not authorized to view this page!</main>
}
