"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (session?.user.role === "prompt_engineer") {
    return (
      <main>
        <button onClick={() => signOut()}>Sign out</button>
        <div>You are an admin, welcome</div>
      </main>
    )
  }

  return <main>You are not authorized to view this page!</main>
}
