import React from "react";
import { Box } from "@mui/material";
import { Field } from "react-final-form";

import Typography from "@/components/atoms/Typography";

import styles from "./style.module.scss";
import TextField from "@/components/molecules/TextField";
import Divider from "@/components/atoms/Divider";
import { required } from "@/utils/validations";

const VerifyRequestInfoStage = () => {
  return (
    <Box className={styles.verify_request_info_service_form}>
      <Typography variant='large' fontStyle='medium'>
        Verify/Validate Request info
      </Typography>
      <Divider />
      <Box display='flex' gap='.25rem' flexDirection='column'>
        <Field name='phone' validate={required}>
          {(fieldProps) => (
            <TextField
              placeholder='Enter phone number'
              label='Phone'
              fullWidth
              {...fieldProps}
            />
          )}
        </Field>
        <Field name='address' validate={required}>
          {(fieldProps) => (
            <TextField
              placeholder='Enter Address'
              label='Address'
              fullWidth
              {...fieldProps}
            />
          )}
        </Field>
        <Typography variant='base'>
          Provided infomations, helps us to serve you fast and better
        </Typography>
      </Box>
    </Box>
  );
};
export default VerifyRequestInfoStage;
