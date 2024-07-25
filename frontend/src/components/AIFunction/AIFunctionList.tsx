import { AIFunctionT } from "@/types"
import Box from "@mui/material/Box"
import { AIFunctionPaper } from "./AIFunctionPaper"
import { SxProps } from "@mui/material"
interface AIFunctionListProps {
  AIFunctions: Array<AIFunctionT>
  sx?: SxProps
}

const AIFunctionList: React.FC<AIFunctionListProps> = ({ AIFunctions, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        ...sx,
      }}
    >
      {AIFunctions.map((AIFunction) => (
        <AIFunctionPaper AIFunction={AIFunction}></AIFunctionPaper>
      ))}
    </Box>
  )
}

export { AIFunctionList }
