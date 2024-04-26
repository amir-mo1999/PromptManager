"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (session?.user.role === undefined) {
    return <main>Loading ...</main>
  } else if (session?.user.role === "admin") {
    return (
      <main>
        <button onClick={() => signOut()}>Sign out</button>
        <div>You are an admin, welcome</div>
      </main>
    )
  }

  return <main>You are not authorized to view this page!</main>
}
