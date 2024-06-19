"use client"
import * as React from "react"
import { MainContentWrapper } from "@/components"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import { useState, useEffect } from "react"
import StepButton from "@mui/material/StepButton"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import { MuiFileInput } from "mui-file-input"
import FormHelperText from "@mui/material/FormHelperText"
import { inputVariableType } from "@/types"
import Box from "@mui/material/Box"

// global variables
const steps = ["Set Name and Description", "Define Input Variable", "Upload a Validation Dataset"]
const maxInputVariables = 5
const datasetMaxSize = 20000000

function validateFunctionName(functionName: string): boolean {
  let valid = true

  // length must be at least one character long
  if (functionName.length < 1) {
    valid = false
  }

  // max 20 characters long
  if (functionName.length > 20) {
    valid = false
  }
  return valid
}

function validateDescription(description: string): boolean {
  let valid = true

  // length must be at least one character long
  if (description.length < 1) {
    valid = false
  }

  // max 20 characters long
  if (description.length > 1000) {
    valid = false
  }
  return valid
}

function validateInputVariableName(inputVariableName: string): boolean {
  let valid = true

  // length must be at least one character long
  if (inputVariableName.length < 1) {
    valid = false
  }

  // max 20 characters long
  if (inputVariableName.length > 20) {
    valid = false
  }
  return valid
}

export default function Home() {
  // current active step
  const [activeStep, setActiveStep] = useState<number>(0)

  // state for function name
  const [functionName, setFunctionName] = useState<string>("")
  const [functionNameHelpertext, setFunctionNameHelpertext] = useState<string>("")
  const [functionNameError, setFunctionNameError] = useState<boolean>(false)

  // state for description
  const [description, setDescription] = useState<string>("")
  const [descriptionHelpertext, setDescriptionHelpertext] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<boolean>(false)

  // state for output type
  const [outputType, setOutputType] = useState<string>("string")

  // state for input variables
  const [inputVariables, setInputVariables] = useState<inputVariableType[]>([
    { name: "", type: "string" },
  ])
  const [inputVariablesHelpertext, setInputVariablesHelpertext] = useState<Array<string>>(
    Array(maxInputVariables).fill([""]).flat()
  )
  const [inputVariablesError, setInputVariablesError] = useState<Array<boolean>>(
    Array(maxInputVariables).fill([false]).flat()
  )

  // state variables for dataset
  const [datasetFile, setDatasetFile] = useState<File | null>(null)
  const [dataset, setDataset] = useState<{ [key: string]: number[] | string[] }>()
  const [datasetSize, setDatasetSize] = useState<number>(0)
  const [datasetAboveMax, setDatasetAboveMax] = useState<boolean>(false)
  const [datasetError, setDatasetError] = useState<boolean>(false)
  const [datasetHelperText, setDatasetHelperText] = useState<string>("")

  // handles forward step
  function handleStep() {
    setActiveStep(activeStep === 2 ? 2 : activeStep + 1)
  }

  // handles back step
  function handleBackStep() {
    setActiveStep(activeStep === 0 ? 0 : activeStep - 1)
    setCanStep(true)

    // when stepping back completely reset the third step for uploading the dataset to avoid errors
    setIsDatasetValid(true, "")
    resetDataset()
  }

  function resetDataset() {
    setDataset(undefined)
    setDatasetFile(null)
    setDatasetSize(0)
    setDatasetAboveMax(false)
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
      // for step 3: if dataset is not uploaded or invalid
    } else {
      if (dataset === undefined || !validateDataset()) {
        return false
      }
      return true
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
      inputVariablesError,
      dataset,
      datasetFile,
      datasetError,
      activeStep,
    ]
  )

  // validates the dataset
  function validateDataset(): boolean {
    // if dataset not uploaded; in this case do not give an error yet because the user might not have uploaded it yet
    if (dataset === undefined) {
      return false
    }

    // helper text in case there are errors
    let helperText = "Please review the following errors:\n"

    // if dataset is valid
    let valid = true

    // Validation 0: check if the dataset is above max size
    if (datasetAboveMax) {
      helperText =
        helperText + `- The file exceeds the maximum size of ${datasetMaxSize / 1000000}mb`
      valid = false
    }

    // if the previous validations fails skip the validations coming after
    if (!valid) {
      setIsDatasetValid(valid, helperText)
      console.log("we are returning")
      return valid
    }

    // Validation 1: check that the elements of the dataset are arrays
    for (const key in Object.keys(dataset)) {
      if (!Array.isArray(dataset[key])) {
        valid = false
        helperText = helperText + "- The values for each key must be contained in arrays\n"
        break
      }
    }

    // Validation 2: check if all input variables are present in dataset
    const missingInputVariableNames: Array<string> = []
    inputVariables.forEach((inputVariable) => {
      if (!(inputVariable.name in dataset)) {
        valid = false

        // set the dataset error
        setDatasetError(true)

        // append to missing variable names
        missingInputVariableNames.push(inputVariable.name)
      }
    })
    // add helper text if there are input variables missing
    if (missingInputVariableNames.length > 0) {
      helperText =
        helperText +
        `- The following input variables are not present as keys in the dataset: ${missingInputVariableNames.join(
          ", "
        )}\n`
    }

    // Validation 3: check if dataset has the same amount of keys as there are input variables plus one for the output key
    if (Object.keys(dataset).length - 1 !== inputVariables.length) {
      valid = false
      setDatasetError(true)
      helperText =
        helperText +
        "- The dataset must not contain additional keys other than the variable names and the output key\n"
    }

    // Validation 4: check if the output key is present in the dataset
    if (!dataset.hasOwnProperty("output")) {
      valid = false
      helperText =
        helperText +
        "- The dataset must contain the key for the outputs of the ai function: output\n"
    }

    // if the one of previous validations fails skip the validations coming after
    if (!valid) {
      setIsDatasetValid(valid, helperText)
      return valid
    }

    // Validation 5: check that all elements of the dataset have the same amount of entries
    // get length of first for the first key
    const l = dataset[Object.keys(dataset)[0]].length
    // iterate over the dataset and check if length matches the length of the first element
    Object.keys(dataset).forEach((key) => {
      if (dataset[key].length !== l) {
        valid = false
        helperText = helperText + "- The data points for each key must have the same length\n"
      }
    })

    // Validation 6: check if the types of the input variables match the ones inputted in the input variable step
    inputVariables.forEach((inputVariable) => {
      // loop over values in dataset for current input variable
      for (const value of dataset[inputVariable.name]) {
        // check if types of values match the ones of the input variable

        // for int
        if (inputVariable.type === "int") {
          if (!Number.isInteger(value)) {
            valid = false
            helperText =
              helperText +
              `- The values for the input variable ${inputVariable.name} must be of type ${inputVariable.type}\n`
            break
          }
          // for float
        } else if (inputVariable.type === "float") {
          if (!(typeof value === "number")) {
            valid = false
            helperText =
              helperText +
              `- The values for the input variable ${inputVariable.name} must be of type ${inputVariable.type}\n`
            break
          }
          // for string
        } else if (inputVariable.type === "string") {
          if (!(typeof value === "string")) {
            valid = false
            helperText =
              helperText +
              `- The values for the input variable ${inputVariable.name} must be of type ${inputVariable.type}\n`
            break
          }
        }
      }
    })

    setIsDatasetValid(valid, helperText)
    return valid
  }

  function setIsDatasetValid(valid: boolean, helperText: string) {
    if (!valid) {
      setDatasetHelperText(helperText)
      setDatasetError(true)
    } else {
      setDatasetError(false)
      setDatasetHelperText("")
    }
  }

  // when dataset size changes, check if it exceed max size and set the state to true if yes
  useEffect(() => {
    if (datasetSize > datasetMaxSize) {
      setDatasetAboveMax(true)
      validateDataset()
    }
  }, [datasetSize])

  // function for adding another input variable
  function addInputVariable() {
    setInputVariables([...inputVariables, { name: "", type: "string" }])
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

  function changeInputVariableType(type: "string" | "float" | "int", indx: number) {
    const newFields = inputVariables.map((variable, i) =>
      i === indx ? { ...variable, type: type } : variable
    )
    setInputVariables(newFields)
  }

  // function for handling the file upload of the dataset
  const handleFileUploadChange = (file: File | null) => {
    // set the dataset file
    setDatasetFile(file)

    // read the file and set the dataset
    const reader = new FileReader()
    file?.text().then((content) => {
      setDataset(JSON.parse(content))
    })
    // set the dataset size
    setDatasetSize(file?.size === undefined ? 0 : file?.size)
  }

  return (
    <MainContentWrapper>
      <Stepper sx={{ width: "100%" }} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" disabled={true}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {/* Step one content*/}
      <Box
        sx={{
          display: activeStep === 0 ? "flex" : "none",
          flexDirection: "column",
          height: "80%",
          width: "30%",
        }}
      >
        <Typography>Give the Function a name</Typography>
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          required={true}
          onChange={(e) => setFunctionName(e.target.value)}
          inputProps={{ maxLength: 20 }}
          helperText={functionNameHelpertext}
          error={functionNameError}
          onBlur={(e) => {
            if (!validateFunctionName(functionName)) {
              setFunctionNameError(true)
              setFunctionNameHelpertext("Please enter a function name")
            } else {
              setFunctionNameError(false)
              setFunctionNameHelpertext("")
            }
          }}
        />
        <Typography>Describe what this Function does</Typography>
        <TextField
          id="outlined-basic"
          label="description"
          variant="outlined"
          required={true}
          multiline={true}
          minRows={5}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: 1000 }}
          helperText={descriptionHelpertext}
          error={descriptionError}
          onBlur={(e) => {
            if (!validateDescription(description)) {
              setDescriptionError(true)
              setDescriptionHelpertext("Please enter a description")
            } else {
              setDescriptionError(false)
              setDescriptionHelpertext("")
            }
          }}
        />
        <Typography>Define the output type</Typography>
        <TextField
          defaultValue={"string"}
          select={true}
          required={true}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <MenuItem value="int">int</MenuItem>
          <MenuItem value="string">string</MenuItem>
          <MenuItem value="float">float</MenuItem>
        </TextField>
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
        <Typography>Define the input variables of your function</Typography>

        {inputVariables.map((variable, indx) => (
          <Box sx={{ display: "flex", flexDirection: "column", width: "full" }} key={indx}>
            <Typography>Variable {(indx + 1).toString()}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", width: "full" }}>
              <TextField
                id="outlined-basic"
                label="variable name"
                variant="outlined"
                required={true}
                value={variable.name}
                inputProps={{ maxLength: 20 }}
                onChange={(event) => {
                  changeInputVariableName(event.target.value, indx)
                }}
                error={inputVariablesError[indx]}
                helperText={inputVariablesHelpertext[indx]}
                onBlur={() => {
                  if (!validateInputVariableName(inputVariables[indx].name)) {
                    const err = inputVariablesError
                    err[indx] = true
                    setInputVariablesError([...err])

                    const helper = inputVariablesHelpertext
                    helper[indx] = "Please enter a variable name"
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
                <MenuItem value="int">int</MenuItem>
                <MenuItem value="string">string</MenuItem>
                <MenuItem value="float">float</MenuItem>
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
        ))}
        <Button
          disabled={inputVariables.length === 5 ? true : false}
          variant="contained"
          sx={{ alignSelf: "center" }}
          onClick={addInputVariable}
        >
          Add variable
        </Button>
      </Box>
      {/* Step Three content*/}
      <Box sx={{ width: "30%", display: activeStep === 2 ? "normal" : "none", height: "80%" }}>
        <Typography>Upload a .json file containing the example dataset</Typography>
        <Typography>Max size: 20mb</Typography>
        <MuiFileInput
          inputProps={{ accept: ".json" }}
          value={datasetFile}
          onChange={(file) => {
            handleFileUploadChange(file)
          }}
          error={datasetError}
          helperText={
            <FormHelperText>
              {datasetHelperText.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </FormHelperText>
          }
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant="contained"
          onClick={handleBackStep}
          disabled={activeStep === 0 ? true : false}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleStep} disabled={!canStep}>
          {activeStep === 2 ? "Create AI Function" : "Next"}
        </Button>
      </Box>
    </MainContentWrapper>
  )
}
