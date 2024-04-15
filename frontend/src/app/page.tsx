"use client"
import { useSession } from "next-auth/react"
import { api } from "@/network"
export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          console.log(session)
        }}
      >
        Print Session
      </button>

      <button
        onClick={() => {
          if (session?.user.access_token) {
            api
              .getCurrentUser(session?.user.access_token)
              .then((res) => {
                return res.json()
              })
              .then((user) => console.log(user))
          } else {
            console.log("access token not set in session")
          }
        }}
      >
        Get current user
      </button>
    </main>
  )
}
