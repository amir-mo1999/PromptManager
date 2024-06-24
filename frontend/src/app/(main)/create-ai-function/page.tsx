"use client"
import * as React from "react"
import {
  ContentStepper,
  MainContentWrapper,
  TextInputField,
  InputVariableFormDialog,
} from "@/components"
import { AIFunctionInput } from "@/types"
import { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import { MuiFileInput } from "mui-file-input"
import FormHelperText from "@mui/material/FormHelperText"
import { inputVariableType } from "@/types"
import Box from "@mui/material/Box"
import { api } from "@/network"
import { useSession } from "next-auth/react"
import { inputOutputTypes } from "@/app/utils"

// global variables
const maxInputVariables = 5
const maxDatasetEntries = 10

//TODO: add validation for the function name so there is no doubles
//TODO: redirect user after submit
//TODO: change form so that users can add constraints to output and to the input variables

export default function Home() {
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

  // state for output type
  const [outputType, setOutputType] = useState<string>("string")

  // state for input variables
  const [inputVariables, setInputVariables] = useState<inputVariableType[]>([])
  const [inputVariablesHelpertext, setInputVariablesHelpertext] = useState<Array<string>>(
    Array(maxInputVariables).fill([""]).flat()
  )
  const [inputVariablesError, setInputVariablesError] = useState<Array<boolean>>(
    Array(maxInputVariables).fill([false]).flat()
  )

  // function for adding another input variable
  function addInputVariable() {
    setInputVariables([...inputVariables, { name: "", var_type: "string" }])
  }

  // function for removing an input variable
  function removeInputVariable(indx: number) {
    const a = inputVariables.filter((item, i) => i !== indx)
    setInputVariables(a)
  }

  // function for changing input variable name
  function changeInputVariableName(name: string, indx: number) {
    const newFields = inputVariables.map((variable, i) =>
      i === indx ? { ...variable, name: name } : variable
    )
    setInputVariables(newFields)
  }

  // function changeInputVariableType(type: "string" | "float" | "int", indx: number) {
  //   const newFields = inputVariables.map((variable, i) =>
  //     i === indx ? { ...variable, var_type: type } : variable
  //   )
  //   setInputVariables(newFields)
  // }

  // set dataset state
  const [dataset, setDataset] = useState<Record<string, (string | number)[]>>()
  const [nOfDatapoints, setnOfDatapoints] = useState<number>(1)

  // handles forward step
  function handleStep() {
    setActiveStep(activeStep === 3 ? 3 : activeStep + 1)
  }

  // handles back step
  function handleBackStep() {
    console.log("checking can step")
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1)
    setCanStep(true)
  }

  // state for checking if user can step or not based on field entries
  const [canStep, setCanStep] = useState<boolean>(false)

  // checks if user can step based on field entries
  function checkCanStep(): boolean {
    // for first step: if function name or description is empty or if there are errors
    if (activeStep === 0) {
      if (functionName === "" || description === "") {
        return false
      }
      if (functionNameError === true || descriptionError === true) {
        return false
      }
      return true
      // for step 2: if input variable names are not set
    } else if (activeStep === 1) {
      let aux = true
      inputVariables.forEach((inputVariable) => {
        if (inputVariable.name === "") {
          aux = false
        }
      })
      return aux
      // for step 4: if dataset is not uploaded or invalid
    } else if (activeStep === 2) {
      //TODO: update this after setting the output constraints and stuff
      return true
    } else {
      return false
    }
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
      // inputVariablesError,
      outputType,
      activeStep,
    ]
  )

  // function for handling the file upload of the dataset
  // const handleFileUploadChange = (file: File | null) => {
  //   // set the dataset file
  //   setDatasetFile(file)

  //   // read the file and set the dataset
  //   const reader = new FileReader()
  //   file?.text().then((content) => {
  //     setDataset(JSON.parse(content))
  //   })
  //   // set the dataset size
  //   setDatasetSize(file?.size === undefined ? 0 : file?.size)
  // }

  function handleSubmit() {
    // assemble the request body
    const body = {
      name: functionName,
      description: description,
      input_variables: inputVariables,
      output_type: outputType,
      //example_dataset: dataset,
    }
    // send the request
    api.postAIFunction(session?.user.access_token as string, body)
  }

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
          valueSetter={setFunctionName}
          isError={functionNameError}
          setIsError={setFunctionNameError}
          label="name"
          inputProps={{ maxLength: 40 }}
        ></TextInputField>

        {/* AI function description*/}
        <Typography>Describe what this Function does</Typography>
        <TextInputField
          valueSetter={setDescription}
          isError={descriptionError}
          setIsError={setDescriptionError}
          label="description"
          inputProps={{ maxLength: 1000 }}
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
        {inputVariables.map((_, indx) => {
          return (
            <InputVariableFormDialog
              showButton={false}
              inputVariables={inputVariables}
              setInputVariables={setInputVariables}
              indx={indx}
              key={indx}
            ></InputVariableFormDialog>
          )
        })}
        <InputVariableFormDialog
          inputVariables={inputVariables}
          showButton={true}
          setInputVariables={setInputVariables}
          indx={inputVariables.length + 1}
        ></InputVariableFormDialog>
        {/* {inputVariables.map((variable, indx) => (
          <Box sx={{ display: "flex", flexDirection: "column", width: "full" }} key={indx}>
            <Typography>Variable {(indx + 1).toString()}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", width: "full" }}>
              <TextField
                id="outlined-basic"
                label="variable name"
                variant="outlined"
                required={true}
                value={variable.name}
                inputProps={{ maxLength: 40 }}
                onChange={(e) => {
                  {
                    changeInputVariableName(e.target.value, indx)
                    if (e.target.value !== "") {
                      const err = inputVariablesError
                      err[indx] = false
                      setInputVariablesError([...err])

                      const helper = inputVariablesHelpertext
                      helper[indx] = ""
                      setInputVariablesHelpertext([...helper])
                    }
                  }
                }}
                error={inputVariablesError[indx]}
                helperText={inputVariablesHelpertext[indx]}
                onBlur={(e) => {
                  // set error if field was blurred and is still empty
                  if (e.target.value === "") {
                    const err = inputVariablesError
                    err[indx] = true
                    setInputVariablesError([...err])

                    const helper = inputVariablesHelpertext
                    helper[indx] = "This field is required"
                    setInputVariablesHelpertext([...helper])
                  } else {
                    const err = inputVariablesError
                    err[indx] = false
                    setInputVariablesError([...err])

                    const helper = inputVariablesHelpertext
                    helper[indx] = ""
                    setInputVariablesHelpertext([...helper])
                  }
                }}
              />
              <TextField
                defaultValue={"string"}
                select={true}
                required={true}
                onChange={(e) =>
                  changeInputVariableType(e.target.value as "string" | "float" | "int", indx)
                }
              >
                {inputOutputTypeValues.map((value, indx) => (
                  <MenuItem key={indx} value={value}>
                    {inputOutputTypeAliases[indx]}
                  </MenuItem>
                ))}
              </TextField>
              {indx === 0 ? (
                ""
              ) : (
                <Button variant="contained" onClick={() => removeInputVariable(indx)}>
                  -
                </Button>
              )}
            </Box>
          </Box>
        ))} */}
      </Box>
      {/* Step Three content*/}
      <Box
        sx={{
          display: activeStep === 2 ? "flex" : "none",
          flexDirection: "column",
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
          onChange={(e) => setOutputType(e.target.value)}
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
      </Box>
      {/* Step Four content*/}
      <Box
        sx={{
          flexDirection: "column",
          width: "80%",
          display: activeStep === 3 ? "flex" : "none",
          height: "80%",
        }}
      >
        <Typography align="center">Define the validation dataset</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {/* One Box for each input variable*/}
          {inputVariables.map((inputVariable, indx) => (
            <Box
              key={indx}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: `${100 / inputVariables.length}%`,
              }}
            >
              <Typography align="center">{inputVariable.name}</Typography>
            </Box>
          ))}
        </Box>
        <Button variant="contained" sx={{ alignSelf: "center" }}>
          Add Data Point
        </Button>
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
