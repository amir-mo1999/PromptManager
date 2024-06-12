import { z } from "zod"
import inputVariable from "./inputVariable"

// Define the schema using zod
const AIFunctionInput = z.object({
  name: z.string(),
  description: z.string(),
  outputType: z.union([z.literal("string"), z.literal("int"), z.literal("float")]),
  inputVariables: z.array(inputVariable),
  dataset: z.record(z.string(), z.array(z.union([z.string(), z.number()]))),
})

type AIFunctionInput = z.infer<typeof AIFunctionInput>

export type { AIFunctionInput }
