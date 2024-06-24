import { z } from "zod"

// Define the schema using zod
const inputVariable = z.object({
  name: z.string(),
  var_type: z.union([
    z.literal("string"),
    z.literal("numeric"),
    z.literal("audio_file"),
    z.literal("image_file"),
  ]),
})

type inputVariableType = z.infer<typeof inputVariable>

export type { inputVariableType }
export default inputVariable
