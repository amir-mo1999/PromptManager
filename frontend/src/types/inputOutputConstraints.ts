// Importing Zod library
import { z } from "zod"

const StringInputConstraintsObj = z.object({
  type: z.literal("string").default("string"),
  max_char_length: z.number().default(1000),
  min_char_length: z.number().default(0),
})

const NumericInputConstraintsObj = z.object({
  type: z.literal("numeric").default("numeric"),
  accept_float: z.boolean().default(false),
  max_value: z.number().default(1000),
  min_value: z.number().default(0),
})

const ImageFileInputConstraintsObj = z.object({
  type: z.literal("image_file").default("image_file"),
  max_file_size: z.number().default(2),
  min_width: z.number().default(0),
  max_width: z.number().default(1920),
  min_height: z.number().default(0),
  max_height: z.number().default(1080),
})

const AudioFileInputConstraintsObj = z.object({
  type: z.literal("audio_file").default("audio_file"),
  max_file_size: z.number().default(2),
  min_length: z.number().default(0),
  max_length: z.number().default(300),
})

// export the input objects
export {
  StringInputConstraintsObj,
  ImageFileInputConstraintsObj,
  AudioFileInputConstraintsObj,
  NumericInputConstraintsObj,
}

// Export the types
export type StringInputConstraints = z.infer<typeof StringInputConstraintsObj>
export type NumericInputConstraints = z.infer<typeof NumericInputConstraintsObj>
export type AudioFileInputConstraints = z.infer<typeof AudioFileInputConstraintsObj>
export type ImageFileInputConstraints = z.infer<typeof ImageFileInputConstraintsObj>

export type StringOutputConstraints = z.infer<typeof StringInputConstraintsObj>
export type NumericOutputConstraints = z.infer<typeof NumericInputConstraintsObj>
export type AudioFileOutputConstraints = z.infer<typeof AudioFileInputConstraintsObj>
export type ImageFileOutputConstraints = z.infer<typeof ImageFileInputConstraintsObj>
