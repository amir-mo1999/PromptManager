"use client"
import React from "react"
import { Avatar } from "@mui/material"
import { useSession } from "next-auth/react"

const InitialsAvatar: React.FC = () => {
  const { data: session } = useSession()
  const last_name = session?.user.last_name === undefined ? "n" : session?.user.last_name
  const first_name = session?.user.first_name === undefined ? "A" : session?.user.first_name

  return <Avatar>{Array.from(first_name)[0] + Array.from(last_name)[0]}</Avatar>
}

export { InitialsAvatar }
