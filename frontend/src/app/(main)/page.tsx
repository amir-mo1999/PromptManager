"use client"

import { MainContentWrapper } from "@/components"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import { useAIFunctions } from "@/hooks"
import { AIFunctionList } from "@/components"
import Box from "@mui/material/Box"

export default function Home() {
  const router = useRouter()
  const AIFunctions = useAIFunctions()

  function onClickCreateAIFunction() {
    router.push("/create-ai-function")
  }

  return (
    <MainContentWrapper>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <AIFunctionList AIFunctions={AIFunctions}></AIFunctionList>
        <Button variant="contained" onClick={onClickCreateAIFunction}>
          Create AI Function
        </Button>
      </Box>
    </MainContentWrapper>
  )
}
