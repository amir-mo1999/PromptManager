import { z } from "zod"

// Define the schema using zod
const inputVariable = z.object({
  var_name: z.string(),
  var_type: z.union([z.literal("string"), z.literal("int"), z.literal("float")]),
})

type inputVariableType = z.infer<typeof inputVariable>

export type { inputVariableType }
export default inputVariable
