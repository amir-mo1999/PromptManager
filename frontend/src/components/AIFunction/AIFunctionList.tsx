import { AIFunctionT } from "@/types"
import Box from "@mui/material/Box"

interface AIFunctionListProps {
  AIFunctions: Array<AIFunctionT>
}

const AIFunctionList: React.FC<AIFunctionListProps> = ({ AIFunctions }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {AIFunctions.map((AIFunction) => AIFunction.name)}
    </Box>
  )
}

export { AIFunctionList }
