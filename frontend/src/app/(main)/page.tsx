"use client"

import { MainContentWrapper } from "@/components"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import { useAIFunctions } from "@/hooks"

export default function Home() {
  const router = useRouter()
  const AIFunctions = useAIFunctions()

  function onClickCreateAIFunction() {
    router.push("/create-ai-function")
  }

  return (
    <MainContentWrapper>
      <Button variant="contained" onClick={onClickCreateAIFunction}>
        Create AI Function
      </Button>
      <Button onClick={() => console.log(AIFunctions)}>Console log AI Functions</Button>
    </MainContentWrapper>
  )
}
