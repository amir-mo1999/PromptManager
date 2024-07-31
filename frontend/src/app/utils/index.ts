import { InputConstraintsT } from "@/types"

import {
  StringInputConstraints,
  NumericInputConstraints,
  ImageFileInputConstraints,
  AudioFileInputConstraints,
} from "@/models"

export const inputOutputTypes = {
  string: "Text",
  numeric: "Number",
  image_file: "Image file",
  audio_file: "Audio file",
}

export const inputConstraintsAliases = {
  max_char_length: "max. character length",
  min_char_length: "min. character length",
  accept_float: "Accepts decimal numbers",
  max_value: "max. value",
  min_value: "min. value",
  max_file_size: "max. file size",
  min_width: "min. width",
  max_width: "min. width",
  min_height: "min. height",
  max_height: "max. height",
  min_length: "min. length",
  max_length: "max. length",
}

export function initInputConstraints(type: "string" | "numeric" | "image_file" | "audio_file") {
  let constraints: InputConstraintsT = StringInputConstraints.parse({})
  switch (type) {
    case "string":
      constraints = StringInputConstraints.parse({})
      break
    case "numeric":
      constraints = NumericInputConstraints.parse({})
      break
    case "image_file":
      constraints = ImageFileInputConstraints.parse({})
      break
    case "audio_file":
      constraints = AudioFileInputConstraints.parse({})
      break
    default:
      throw new Error(`Constraint Type ${type} is invalid`)
  }

  return constraints
}

export function splitArrayIntoChunks(array: Array<any>, chunkSize: number) {
  const result: Array<Array<any>> = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}
