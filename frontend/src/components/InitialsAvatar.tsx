"use client"
import React from "react"
import { Avatar } from "@mui/material"
import { useSession } from "next-auth/react"
import { SxProps, Theme } from "@mui/system"

interface InitialsAvatarProps {
  sx?: SxProps<Theme>
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ sx }) => {
  const { data: session } = useSession()
  const last_name = session?.user.last_name === undefined ? "n" : session?.user.last_name
  const first_name = session?.user.first_name === undefined ? "A" : session?.user.first_name
  return (
    <Avatar sx={sx}>
      {Array.from(first_name)[0].toUpperCase() + Array.from(last_name)[0].toUpperCase()}
    </Avatar>
  )
}

export { InitialsAvatar }
