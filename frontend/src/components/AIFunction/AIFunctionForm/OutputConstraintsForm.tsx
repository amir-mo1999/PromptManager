import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import {
  StringOutputConstraints,
  NumericOutputConstraints,
  ImageFileOutputConstraints,
  AudioFileOutputConstraints,
} from "@/models"
import { OutputConstraintsT } from "@/types"

import { inputOutputTypes } from "@/app/utils"
import { NumberInput } from "@/components"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
interface OutputConstraintsFormProps {
  constraintType: string
  setConstraints: Dispatch<SetStateAction<OutputConstraintsT>>
}

//TODO: add validation to check that number min is lower than number max

const OutputConstraintsForm: React.FC<OutputConstraintsFormProps> = ({
  constraintType,
  setConstraints,
}) => {
  let constraints = undefined
  // for string inputs
  const [maxCharLength, setMaxCharLength] = useState<number>(1000)
  const [minCharLength, setMinCharLength] = useState<number>(0)

  // for numeric inputs
  const [acceptFloat, setAcceptFloat] = useState<boolean>(false)
  const [maxNumValue, setMaxNumValue] = useState<number>(1000)
  const [minNumValue, setMinNumValue] = useState<number>(0)
  useEffect(() => {
    setMaxNumValue(Math.floor(maxNumValue))
    setMinNumValue(Math.floor(minNumValue))
  }, [acceptFloat])

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

  // initialize constraints object with the default constraints object for the respective constraints type
  const inputTypes = Object.keys(inputOutputTypes)

  function updateConstraints() {
    switch (constraintType) {
      case inputTypes[0]:
        constraints = StringOutputConstraints.parse({
          type: "string",
          max_char_length: maxCharLength,
          min_char_length: minCharLength,
        })
        break
      case inputTypes[1]:
        constraints = NumericOutputConstraints.parse({
          type: "numeric",
          accept_float: acceptFloat,
          max_value: maxNumValue,
          min_value: minNumValue,
        })
        break
      case inputTypes[2]:
        constraints = ImageFileOutputConstraints.parse({
          type: "image_file",
          max_file_size: maxImageFileSize,
          min_width: minImageWidth,
          max_width: maxImageWidth,
          min_height: minImageHeight,
          max_height: maxImageHeight,
        })
        break
      case inputTypes[3]:
        constraints = AudioFileOutputConstraints.parse({
          type: "audio_file",
          max_file_size: maxAudioFileSize,
          min_length: minAudioLength,
          max_length: maxAudioLength,
        })
        break
      default:
        throw new Error(`Constraint Type ${constraintType} is invalid`)
    }
    setConstraints({ ...constraints })
  }
  useEffect(updateConstraints, [])
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

export { OutputConstraintsForm }
