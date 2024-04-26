"use client"
import { ReactNode } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

interface Props {
  children: ReactNode
}

// component that allows us to access the session provider
const RedirectUser = () => {
  // set session
  const { data: session } = useSession()
  console.log("redirecting")
  // show loading screen if user role is undefined
  if (session?.user.role === undefined) {
    return <main>Loading...</main>
  }

  // redirect based on user role
  if (session?.user.role === "admin") {
    redirect("admin")
  } else if (session?.user.role === "developer") {
    redirect("dev")
  } else if (session?.user.role === "prompt_engineer") {
    redirect("pe")
  }

  // Show redirect Screen
  return <main>Redirecting...</main>
}

export { RedirectUser }
