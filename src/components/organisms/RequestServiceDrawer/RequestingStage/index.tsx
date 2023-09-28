import React from "react";
import { Box, Drawer } from "@mui/material";

import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";

import styles from "./style.module.scss";
import Loading from "@/components/atoms/Loading";
import { MutationResult } from "@apollo/client";
import Icon from "@/components/atoms/Icon";

interface RequestingStageProps {
  requestServiceMutationProps: MutationResult<any>;
}

const RequestingStage = ({
  requestServiceMutationProps,
}: RequestingStageProps) => {
  const { loading, data, error } = requestServiceMutationProps;

  return (
    <Box className={styles.verify_request_infor_service_form}>
      {loading && (
        <>
          <Typography variant='large' fontStyle='medium'>
            Requesting Service
          </Typography>
          <Box display='flex' justifyContent='center'>
            <Loading />
          </Box>
        </>
      )}
      {data && (
        <>
          <Box
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            gap='1rem'
          >
            <Icon name='check' color='primary' fontSize='3rem' />
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              gap='.25rem'
              // justifyContent='center'
            >
              <Typography variant='base' fontStyle='medium'>
                Your request has been submitted successfully.
              </Typography>
              <Typography variant='base'>
                You should get an immediate response from business in less than
                a minute
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
export default RequestingStage;
