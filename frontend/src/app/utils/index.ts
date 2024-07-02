import {
  StringInputConstraintsObj,
  NumericInputConstraintsObj,
  ImageFileInputConstraintsObj,
  AudioFileInputConstraintsObj,
  InputConstraints,
} from "@/types"

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

function initInputConstraints(type: "string" | "numeric" | "image_file" | "audio_file") {
  let constraints: InputConstraints = StringInputConstraintsObj.parse({})
  switch (type) {
    case "string":
      constraints = StringInputConstraintsObj.parse({})
      break
    case "numeric":
      constraints = NumericInputConstraintsObj.parse({})
      break
    case "image_file":
      constraints = ImageFileInputConstraintsObj.parse({})
      break
    case "audio_file":
      constraints = AudioFileInputConstraintsObj.parse({})
      break
    default:
      throw new Error(`Constraint Type ${type} is invalid`)
  }

  return constraints
}

export { initInputConstraints }
