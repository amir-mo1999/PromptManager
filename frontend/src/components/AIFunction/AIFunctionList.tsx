import { AIFunctionT } from "@/types"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { AIFunctionPaper } from "./AIFunctionPaper"
import { splitArrayIntoChunks } from "@/app/utils"
import { AIFunction } from "@/models"
import { useAIFunctions } from "@/hooks"
import { useRouter } from "next/navigation"

interface AIFunctionListProps {}

const AIFunctionList: React.FC<AIFunctionListProps> = () => {
  const router = useRouter()

  const AIFunctions = useAIFunctions()

  // if there are no AI functions yet return empty html
  if (AIFunctions.length === 0) {
    return <></>
  }

  // split AIFunctions into chunks of max 3
  const AIFunctionsChunks = splitArrayIntoChunks(AIFunctions, 3)
  const nChunks = AIFunctionsChunks.length
  // if the last chunk is full, push an empty chunk to the list of chunks to render the button properly
  if (AIFunctionsChunks[nChunks - 1].length === 3) {
    AIFunctionsChunks.push([])
  }

  function onClickCreateAIFunction() {
    router.push("/create-ai-function")
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "100%",
      }}
    >
      {AIFunctionsChunks.map((AIFunctionsChunk, chunkIndx) => (
        <Box
          key={chunkIndx}
          sx={{ display: "flex", flexDirection: "row", gap: "5px", width: "100%" }}
        >
          {AIFunctionsChunk.map((AIFunction, indx) => (
            <AIFunctionPaper
              key={indx}
              AIFunction={AIFunction}
              sx={{ width: "25%", height: "150px" }}
            ></AIFunctionPaper>
          ))}
          {chunkIndx === AIFunctionsChunks.length - 1 ? (
            <Button
              variant="contained"
              sx={{ width: "25%", height: "150px" }}
              onClick={onClickCreateAIFunction}
            >
              Create AI Function
            </Button>
          ) : (
            <></>
          )}
        </Box>
      ))}
    </Box>
  )
}

export { AIFunctionList }
