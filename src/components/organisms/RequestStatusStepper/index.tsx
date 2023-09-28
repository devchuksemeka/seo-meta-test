import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

import Stack from "@mui/material/Stack";
import {
  ClientViewStatusSteps,
  ClientViewStatusCanceledSteps,
  RequestStatusEnum,
  RequestStatusMapping,
} from "@/constants/request";

interface RequestStatusStepperProps {
  status: RequestStatusEnum;
  viewer: "business" | "client" | "internal-admin";
}

const RequestStatusStepper = (props: RequestStatusStepperProps) => {
  const { status, viewer } = props;

  let steps: RequestStatusEnum[] = [];

  if (status === RequestStatusEnum.CANCELLED) {
    steps = ClientViewStatusCanceledSteps;
  } else {
    steps = ClientViewStatusSteps;
  }

  const activeStep =
    steps.findIndex((step) => {
      return step === status;
    }) + 1;

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((step) => {
        return (
          <Step key={step}>
            <StepLabel>{RequestStatusMapping.get(step)?.name}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default RequestStatusStepper;
