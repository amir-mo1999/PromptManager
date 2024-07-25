import { z } from "zod"
import { InputVariable } from "./InputVariable"

// Define the schema using zod
const AIFunctionRouteInput = z.object({
  name: z.string(),
  description: z.string(),
  outputType: z.union([z.literal("string"), z.literal("int"), z.literal("float")]),
  inputVariables: z.array(InputVariable),
  dataset: z.record(z.string(), z.array(z.union([z.string(), z.number()]))),
})

export { AIFunctionRouteInput }
