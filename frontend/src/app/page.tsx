"use client"
import Image from "next/image"
import { api } from "@/network"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hellogewgewge
      <button
        onClick={() => {
          api.login({ username: "admin", password: "" })
        }}
      >
        Test API call
      </button>
    </main>
  )
}
