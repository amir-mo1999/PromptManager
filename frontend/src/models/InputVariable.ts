import { z } from "zod"
import { InputConstraints } from "./InputOutputConstraints"

const InputVariable = z
  .object({
    name: z.string(),
    var_type: z.union([
      z.literal("string"),
      z.literal("numeric"),
      z.literal("audio_file"),
      z.literal("image_file"),
    ]),
    constraints: InputConstraints.default({ type: "string" }),
  })
  .superRefine((data, ctx) => {
    // assert that the var type and the type of the input constraints match
    if (data.var_type !== data.constraints.type) {
      ctx.addIssue({
        code: "custom",
        message: "The input variable type and type of constraints object do not match.",
      })
    }
  })

export { InputVariable }
