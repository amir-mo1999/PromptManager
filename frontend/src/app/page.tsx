"use client"
import { useSession } from "next-auth/react"
import { api } from "@/network"
export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          console.log(session?.user)
        }}
      >
        print session
      </button>
      <button
        onClick={() => {
          if (session?.token) {
            api
              .refreshToken(session?.token.access_token)
              .then((res) => {
                return res.json()
              })
              .then((data) => console.log(data))
          }
        }}
      >
        refresh token
      </button>
    </main>
  )
}
