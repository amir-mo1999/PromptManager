import { z } from "zod"

// Define the schema using zod
const inputVariable = z.object({
  name: z.string(),
  varType: z.union([z.literal("string"), z.literal("int"), z.literal("float")]),
})

type inputVariableType = z.infer<typeof inputVariable>

export type { inputVariableType }
export default inputVariable
