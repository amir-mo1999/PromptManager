import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepButton from "@mui/material/StepButton"
import { SxProps, Theme } from "@mui/system"

interface ContentStepperProps {
  activeStep: number
  steps: Array<string>
  sx?: SxProps<Theme>
}

const ContentStepper: React.FC<ContentStepperProps> = ({ activeStep, steps, sx }) => {
  return (
    <Stepper sx={{ width: "100%", ...sx }} nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton color="inherit" disabled={true}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  )
}

export { ContentStepper }
