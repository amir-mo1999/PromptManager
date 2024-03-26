"use client"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hellogewgewge
      <button
        onClick={() => {
          fetch("http://localhost:4000/auth/", {
            method: "GET",
            redirect: "follow",
          })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error))
        }}
      >
        Test API call
      </button>
    </main>
  )
}
