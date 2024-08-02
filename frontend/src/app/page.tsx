"use client"

import { MainContentWrapper } from "@/components"
import { AIFunctionList } from "@/components"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import promptfoo from "promptfoo"

async function evaluate() {
  console.log("clicked")
  const results = await promptfoo.evaluate(
    {
      prompts: ["Rephrase this in French: {{body}}", "Rephrase this like a pirate: {{body}}"],
      providers: ["openai:gpt-4o-mini"],
      tests: [
        {
          vars: {
            body: "Hello world",
          },
        },
        {
          vars: {
            body: "I'm hungry",
          },
        },
      ],
      writeLatestResults: true, // write results to disk so they can be viewed in web viewer
    },
    {
      maxConcurrency: 2,
    }
  )

  console.log(results)
}

export default function Home() {
  return (
    <MainContentWrapper>
      <Button onClick={evaluate}>Test</Button>
    </MainContentWrapper>
  )
}
