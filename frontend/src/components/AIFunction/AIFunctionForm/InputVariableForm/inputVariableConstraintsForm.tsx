import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import {
  StringInputConstraints,
  NumericInputConstraints,
  ImageFileInputConstraints,
  AudioFileInputConstraints,
} from "@/models"
import { InputConstraintsT } from "@/types"
import { NumberInput } from "@/components"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

interface inputVariableConstraintsFormProps {
  constraints: InputConstraintsT
  constraintType: string
  setConstraints: Dispatch<SetStateAction<InputConstraintsT>>
}

const InputVariableConstraintsForm: React.FC<inputVariableConstraintsFormProps> = ({
  constraints,
  constraintType,
  setConstraints,
}) => {
  //let constraints: InputConstraints = StringInputConstraints.parse({})

  // for string inputs
  const [maxCharLength, setMaxCharLength] = useState<number>(1000)
  const [minCharLength, setMinCharLength] = useState<number>(0)

  // for numeric inputs
  const [acceptFloat, setAcceptFloat] = useState<boolean>(false)
  const [maxNumValue, setMaxNumValue] = useState<number>(1000)
  const [minNumValue, setMinNumValue] = useState<number>(0)

  // for image file inputs
  const [maxImageFileSize, setMaxImageFileSize] = useState<number>(2)
  const [minImageWidth, setMinImageWidth] = useState<number>(0)
  const [maxImageWidth, setMaxImageWidth] = useState<number>(1920)
  const [minImageHeight, setMinImageHeight] = useState<number>(0)
  const [maxImageHeight, setMaxImageHeight] = useState<number>(1080)

  // for audio file inputs
  const [maxAudioFileSize, setMaxAudioFileSize] = useState<number>(2)
  const [minAudioLength, setMinAudioLength] = useState<number>(0)
  const [maxAudioLength, setMaxAudioLength] = useState<number>(300)

  // initialize state variables with the values from the constraints prop
  function initConstraints() {
    {
      let constraintsAux: InputConstraintsT = StringInputConstraints.parse({})
      switch (constraintType) {
        case "string":
          constraintsAux = StringInputConstraints.parse(constraints)
          setMaxCharLength(constraintsAux.max_char_length)
          setMinCharLength(constraintsAux.min_char_length)
          break
        case "numeric":
          constraintsAux = NumericInputConstraints.parse(constraints)
          setAcceptFloat(constraintsAux.accept_float)
          setMaxNumValue(constraintsAux.max_value)
          setMinNumValue(constraintsAux.min_value)
          break
        case "image_file":
          constraintsAux = ImageFileInputConstraints.parse(constraints)
          setMaxImageFileSize(constraintsAux.max_file_size)
          setMaxImageHeight(constraintsAux.max_height)
          setMaxImageWidth(constraintsAux.max_width)
          setMinImageHeight(constraintsAux.min_height)
          setMinImageWidth(constraintsAux.min_width)
          break
        case "audio_file":
          constraintsAux = AudioFileInputConstraints.parse(constraints)
          setMaxAudioFileSize(constraintsAux.max_file_size)
          setMaxAudioLength(constraintsAux.max_length)
          setMinAudioLength(constraintsAux.min_length)
          break
        default:
          throw new Error(`Constraint Type ${constraintType} is invalid`)
      }
    }

    setConstraints({ ...constraints })
  }
  useEffect(initConstraints, [])

  useEffect(() => {
    if (constraints.type === "numeric") {
      const aux = NumericInputConstraints.parse(constraints)
      setMaxNumValue(Math.floor(aux.max_value))
      setMinNumValue(Math.floor(aux.min_value))
    }
  }, [acceptFloat])

  // update constraints when a field changes
  function updateConstraints() {
    let constraintsAux: InputConstraintsT
    switch (constraintType) {
      case "string":
        constraintsAux = StringInputConstraints.parse({
          type: "string",
          max_char_length: maxCharLength,
          min_char_length: minCharLength,
        })
        break
      case "numeric":
        constraintsAux = NumericInputConstraints.parse({
          type: "numeric",
          accept_float: acceptFloat,
          max_value: maxNumValue,
          min_value: minNumValue,
        })
        break
      case "image_file":
        constraintsAux = ImageFileInputConstraints.parse({
          type: "image_file",
          max_file_size: maxImageFileSize,
          min_width: minImageWidth,
          max_width: maxImageWidth,
          min_height: minImageHeight,
          max_height: maxImageHeight,
        })
        break
      case "audio_file":
        constraintsAux = AudioFileInputConstraints.parse({
          type: "audio_file",
          max_file_size: maxAudioFileSize,
          min_length: minAudioLength,
          max_length: maxAudioLength,
        })
        break
      default:
        throw new Error(`Constraint Type ${constraintType} is invalid`)
    }

    setConstraints({ ...constraintsAux })
  }

  useEffect(updateConstraints, [
    constraintType,
    maxCharLength,
    minCharLength,
    acceptFloat,
    maxNumValue,
    minNumValue,
    maxImageFileSize,
    minImageWidth,
    maxImageWidth,
    minImageHeight,
    maxImageHeight,
    maxAudioFileSize,
    minAudioLength,
    maxAudioLength,
  ])

  return (
    <>
      {/* String */}
      <Box
        display={constraintType !== "string" ? "none" : "flex"}
        sx={{ flexDirection: "column", gap: "10px" }}
      >
        <NumberInput
          value={maxCharLength}
          setValue={setMaxCharLength}
          label="max. character length"
          minValue={1}
        ></NumberInput>
        <NumberInput
          value={minCharLength}
          setValue={setMinCharLength}
          maxValue={maxCharLength}
          minValue={0}
          label="min. character length"
        ></NumberInput>
      </Box>
      {/* Number */}
      <Box
        display={constraintType !== "numeric" ? "none" : "flex"}
        sx={{ flexDirection: "column", gap: "10px" }}
      >
        <FormControlLabel
          control={<Checkbox checked={acceptFloat} onChange={() => setAcceptFloat(!acceptFloat)} />}
          label="accept decimal numbers"
        />
        <NumberInput
          acceptFloat={acceptFloat}
          maxValue={10000000000000000000000000}
          minValue={-10000000000000000000000000}
          value={maxNumValue}
          setValue={setMaxNumValue}
          label="max. value"
        ></NumberInput>
        <NumberInput
          acceptFloat={acceptFloat}
          maxValue={maxNumValue}
          minValue={-10000000000000000000000000}
          value={minNumValue}
          setValue={setMinNumValue}
          label="min. value"
        ></NumberInput>
      </Box>
      {/* Image File */}
      <Box
        display={constraintType !== "image_file" ? "none" : "flex"}
        sx={{ flexDirection: "column", gap: "10px" }}
      >
        <NumberInput
          acceptFloat={true}
          value={maxImageFileSize}
          setValue={setMaxImageFileSize}
          label="max. image file size in mb"
          maxValue={20}
          minValue={0.00001}
          valueSuffix="mb"
        ></NumberInput>
        <NumberInput
          value={maxImageHeight}
          setValue={setMaxImageHeight}
          maxValue={4000}
          minValue={1}
          label="max. image height in pixels"
          valueSuffix="px"
        ></NumberInput>
        <NumberInput
          value={minImageHeight}
          setValue={setMinImageHeight}
          maxValue={maxImageHeight}
          minValue={0}
          label="min. image height in pixels"
          valueSuffix="px"
        ></NumberInput>
        <NumberInput
          value={maxImageWidth}
          setValue={setMaxImageWidth}
          label="max. image width in pixels"
          minValue={1}
          maxValue={4000}
          valueSuffix="px"
        ></NumberInput>
        <NumberInput
          value={minImageWidth}
          setValue={setMinImageWidth}
          label="min. image width in pixels"
          maxValue={maxImageWidth}
          minValue={0}
          valueSuffix="px"
        ></NumberInput>
      </Box>

      {/* Audio File */}
      <Box
        display={constraintType !== "audio_file" ? "none" : "flex"}
        sx={{ flexDirection: "column", gap: "10px" }}
      >
        <NumberInput
          acceptFloat={true}
          value={maxAudioFileSize}
          setValue={setMaxAudioFileSize}
          label="max. audio file size in mb"
          minValue={0.00001}
          maxValue={20}
          valueSuffix="mb"
        ></NumberInput>
        <NumberInput
          value={maxAudioLength}
          setValue={setMaxAudioLength}
          maxValue={1000}
          minValue={1}
          label="max. audio length in seconds"
          valueSuffix="s"
        ></NumberInput>
        <NumberInput
          value={minAudioLength}
          setValue={setMinAudioLength}
          maxValue={maxAudioLength}
          minValue={0}
          label="min. audio length in seconds"
          valueSuffix="s"
        ></NumberInput>
      </Box>
    </>
  )
}

export { InputVariableConstraintsForm }
