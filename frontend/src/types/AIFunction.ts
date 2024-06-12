import { z } from "zod"
import inputVariable from "./inputVariable"
import { DatasetLinkedOutlined } from "@mui/icons-material"

// Define the schema using zod
const AIFunction = z.object({
  name: z.string(),
  description: z.string(),
  outputType: z.union([z.literal("string"), z.literal("int"), z.literal("float")]),
  inputVariables: z.array(inputVariable),
  dataset: z.record(
    z.string(),
    z.array(z.union([z.literal("string"), z.literal("int"), z.literal("float")]))
  ),
})

type AIFunction = z.infer<typeof AIFunction>

export type { AIFunction }

const a: AIFunction = {
  name: "A",
  description: "A",
  outputType: "string",
  inputVariables: [
    { name: "gewgew", varType: "string" },
    { name: "gewgew", varType: "int" },
  ],
}
