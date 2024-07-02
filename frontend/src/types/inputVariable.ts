import { z } from "zod"
import {
  StringInputConstraintsObj,
  NumericInputConstraintsObj,
  AudioFileInputConstraintsObj,
  ImageFileInputConstraintsObj,
} from "./inputOutputConstraints"

// Define the schema using zod
const inputVariableObj = z
  .object({
    name: z.string(),
    var_type: z.union([
      z.literal("string"),
      z.literal("numeric"),
      z.literal("audio_file"),
      z.literal("image_file"),
    ]),
    constraints: z
      .union([
        StringInputConstraintsObj,
        NumericInputConstraintsObj,
        AudioFileInputConstraintsObj,
        ImageFileInputConstraintsObj,
      ])
      .default({}),
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

type inputVariableType = z.infer<typeof inputVariableObj>

export type { inputVariableType }
export { inputVariableObj }
