"use client"
import * as React from "react"
import { ContentStepper, MainContentWrapper, TextInputField } from "@/components"
import { DatasetForm } from "./DatasetForm"
import { InputVariableForm } from "./InputVariableForm"
import { OutputConstraintsForm } from "./OutputConstraintsForm"
import { OutputConstraintsT } from "@/types"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import { InputVariableT } from "@/types"
import Box from "@mui/material/Box"
import { api } from "@/network"
import { useSession } from "next-auth/react"
import { inputOutputTypes } from "@/app/utils"
import { AIFunctionRouteInput } from "@/models"
import { AIFunctionOutputTypeT } from "@/types"
import { StringInputConstraints } from "@/models"

//TODO: add validation for the function name so there is no doubles

interface AIFunctionFormProps {}

const AIFunctionForm: React.FC<AIFunctionFormProps> = () => {
  // get router
  const router = useRouter()

  // get current session
  const { data: session } = useSession()

  // current active step
  const [activeStep, setActiveStep] = useState<number>(0)

  // state for function name
  const [functionName, setFunctionName] = useState<string>("")
  const [functionNameError, setFunctionNameError] = useState<boolean>(false)

  // state for description
  const [description, setDescription] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<boolean>(false)

  // state for input variables
  const [inputVariables, setInputVariables] = useState<InputVariableT[]>([])

  // state for output type
  const [outputType, setOutputType] = useState<AIFunctionOutputTypeT>("string")
  const [outputConstraints, setOutputConstraints] = useState<OutputConstraintsT>(
    StringInputConstraints.parse({})
  )

  // set dataset state
  const [dataset, setDataset] = useState<Array<Record<string, string | number>>>([])

  // handles forward step
  function handleStep() {
    setActiveStep(activeStep === 3 ? 3 : activeStep + 1)
  }

  // handles back step
  function handleBackStep() {
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1)
    setCanStep(true)
  }

  // state for checking if user can step or not based on field entries
  const [canStep, setCanStep] = useState<boolean>(false)

  // checks if user can step based on field entries
  function checkCanStep(): boolean {
    // for step 1: if function name or description is empty or if there are errors
    if (activeStep === 0) {
      if (functionName === "" || description === "") {
        return false
      }
      if (functionNameError === true || descriptionError === true) {
        return false
      }
      return true
      // for step 2: if no input variable is set
    } else if (activeStep === 1) {
      if (inputVariables.length === 0) {
        return false
      }
      return true
      // for step 3: output step
    } else if (activeStep === 2) {
      return true
      // for step 4: dataset step
    } else if (activeStep === 3) {
      if (dataset.length === 0) {
        return false
      } else {
        return true
      }
    }
    return false
  }

  // check if user can step; updates whenever a field entry is updated
  useEffect(
    () => setCanStep(checkCanStep()),
    [
      functionName,
      description,
      functionNameError,
      descriptionError,
      inputVariables,
      outputType,
      activeStep,
      dataset,
    ]
  )
  function handleSubmit() {
    // assemble the request body
    let body = {
      name: functionName,
      description: description,
      input_variables: inputVariables,
      output_type: outputType,
      output_constraints: outputConstraints,
      example_dataset: dataset,
    }

    // send the request
    api
      .postAIFunction(session?.user.access_token as string, body)
      .then((response) => {
        return response.json()
      })
      .then((data) => data)
    // redirect user to main page
    router.push("/")
  }

  // reset the dataset when the input variables change
  useEffect(() => setDataset([]), [inputVariables])

  return (
    <MainContentWrapper>
      <ContentStepper
        activeStep={activeStep}
        steps={[
          "Set Name and Description",
          "Define output type and constraints",
          "Define Input Variable",
          "Upload a Validation Dataset",
        ]}
      />
      {/* Step one content*/}
      <Box
        sx={{
          display: activeStep === 0 ? "flex" : "none",
          flexDirection: "column",
          height: "80%",
          width: "30%",
        }}
      >
        {/* AI function name*/}
        <Typography align="center">Give the Function a name</Typography>
        <TextInputField
          value={functionName}
          valueSetter={setFunctionName}
          isError={functionNameError}
          setIsError={setFunctionNameError}
          label="name"
          minChars={5}
          maxChars={40}
        ></TextInputField>

        {/* AI function description*/}
        <Typography>Describe what this Function does</Typography>
        <TextInputField
          value={description}
          valueSetter={setDescription}
          isError={descriptionError}
          setIsError={setDescriptionError}
          label="description"
          minChars={5}
          maxChars={1000}
          multiline={true}
          minRows={5}
          maxRows={10}
        ></TextInputField>
      </Box>
      {/* Step Two content*/}
      <Box
        sx={{
          display: activeStep === 1 ? "flex" : "none",
          flexDirection: "column",
          width: "30%",
          height: "80%",
        }}
      >
        <Typography align="center">Define the input variables of your function</Typography>
        <InputVariableForm
          inputVariables={inputVariables}
          setInputVariables={setInputVariables}
        ></InputVariableForm>
      </Box>
      {/* Step Three content*/}
      <Box
        sx={{
          display: activeStep === 2 ? "flex" : "none",
          flexDirection: "column",
          gap: "10px",
          height: "80%",
          width: "30%",
        }}
      >
        {/* AI function output type*/}
        <Typography align="center">Define the output type</Typography>
        <TextField
          defaultValue={"string"}
          select={true}
          required={true}
          onChange={(e) => setOutputType(e.target.value as AIFunctionOutputTypeT)}
        >
          {Object.keys(inputOutputTypes).map((key, indx) => {
            // @ts-ignore
            const alias = inputOutputTypes[key]
            return (
              <MenuItem key={indx} value={key}>
                {
                  // @ts-ignore
                  inputOutputTypes[key]
                }
              </MenuItem>
            )
          })}
        </TextField>
        <Typography align="center">Define the output constraints</Typography>
        <OutputConstraintsForm
          constraintType={outputType}
          setConstraints={setOutputConstraints}
        ></OutputConstraintsForm>
      </Box>
      {/* Step Four content*/}
      <Box
        sx={{
          flexDirection: "column",
          width: "30%",
          display: activeStep === 3 ? "flex" : "none",
          height: "80%",
        }}
      >
        <Typography align="center">Define the validation dataset</Typography>
        <DatasetForm
          inputVariables={inputVariables}
          dataset={dataset}
          setDataset={setDataset}
        ></DatasetForm>
      </Box>

      {/* Bottom buttons*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "30%",
        }}
      >
        <Button
          variant="contained"
          onClick={handleBackStep}
          disabled={activeStep === 0 ? true : false}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep == 3 ? handleSubmit : handleStep}
          disabled={!canStep}
        >
          {activeStep === 3 ? "Create AI Function" : "Next"}
        </Button>
      </Box>
    </MainContentWrapper>
  )
}

export { AIFunctionForm }
