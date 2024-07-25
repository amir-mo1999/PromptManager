"use client"

import { MainContentWrapper } from "@/components"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  function onClickCreateAIFunction() {
    router.push("/create-ai-function")
  }

  return (
    <MainContentWrapper>
      <Button variant="contained" onClick={onClickCreateAIFunction}>
        Create AI Function
      </Button>
    </MainContentWrapper>
  )
}
