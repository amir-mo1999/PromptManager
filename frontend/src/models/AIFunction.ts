import { z } from "zod"
import { InputVariable } from "./InputVariable"
import { OutputConstraints } from "./InputOutputConstraints"

const AIFunctionRouteInput = z.object({
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(1000),
  input_variables: z.array(InputVariable),
  output_type: z.enum(["numeric", "string", "audio_file", "image_file"]),
  output_constraints: OutputConstraints,
  example_dataset: z.array(z.record(z.union([z.number(), z.string()]))),
})

export { AIFunctionRouteInput }
