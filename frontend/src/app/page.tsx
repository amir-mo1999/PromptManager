"use client"
import { useSession } from "next-auth/react"
import { api } from "@/network"
export default function Home() {
  const { data: session } = useSession()

  console.log("This user is logged in:", session?.user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      The user {session?.user?.email} is logged in.
      <button
        onClick={() => {
          // TODO:
          console.log(session?.access_token)
          if (session?.access_token) {
            api.refreshToken(session?.access_token).then((res) => console.log(res))
          }
        }}
      >
        refresh token
      </button>
    </main>
  )
}
