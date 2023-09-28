import React, { useEffect, useState } from "react";
import { Alert, Box, Drawer, Rating, Snackbar } from "@mui/material";
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

import Button from "@/components/atoms/Button";

import styles from "./style.module.scss";
import REQUEST_SERVICE_GQL_TAG from "@/graphql/gql-tags/order/mutations";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_USER_PROFILE_TAG } from "@/graphql/gql-tags/user/queries";
import Loading from "@/components/atoms/Loading";
import { useRouter } from "next/router";
import { RequestDetail } from "@/constants/request";
import TextField from "@/components/molecules/TextField";
import Typography from "@/components/atoms/Typography";
import { REVIEW_BUSINESS_GQL_TAG } from "@/graphql/gql-tags/business-review/mutations";
import { required } from "@/utils/validations";
import useSnackbar from "@/hooks/useSnackbar";
import usePrevious from "@/hooks/usePrevious";

interface SubmitReviewDrawerProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onSuccess: VoidFunction;
  request: RequestDetail;
}

const SubmitReviewDrawer = ({
  isOpen,
  onClose,
  onSuccess,
  request,
}: SubmitReviewDrawerProps) => {
  const router = useRouter();

  const [reviewBusiness, reviewBusinessProps] = useMutation(
    REVIEW_BUSINESS_GQL_TAG
  );

  const previousReviewBusinessProps = usePrevious(reviewBusinessProps);

  const {
    isOpen: isErrSnkbarOpen,
    close: closeErrSnkbar,
    open: openErrSnkbar,
  } = useSnackbar();

  const handleOnCancel = () => {
    onClose();
  };

  const initialValues = {
    rating: 0,
    message: "",
  };

  const onSubmit = (props: { rating: string; message: string }) => {
    const { rating } = props;
    reviewBusiness({
      variables: {
        ...props,
        rating: Number.parseFloat(rating),
        requestId: request.id,
        businessId: request.business.id,
      },
    });
  };

  useEffect(() => {
    if (
      reviewBusinessProps.error &&
      reviewBusinessProps.error !== previousReviewBusinessProps?.error
    ) {
      openErrSnkbar();
    }
    if (
      reviewBusinessProps.data &&
      reviewBusinessProps.data.reviewBusiness.id !==
        previousReviewBusinessProps?.data?.reviewBusiness?.id
    ) {
      onSuccess();
      onClose();
    }
  }, [reviewBusinessProps]);

  return (
    <Drawer anchor='bottom' open={isOpen}>
      <Box className={styles.request_service_drawer}>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, submitting, pristine }) => (
            <Box
              component='form'
              onSubmit={handleSubmit}
              display='flex'
              justifyContent='center'
              alignItems='center'
              py='1rem'
            >
              <Box
                display='flex'
                justifyContent='center'
                flexDirection='column'
                gap='1rem'
              >
                <Box display='flex' alignItems='center' flex={1}>
                  <Typography>Rating:</Typography>
                  <Field
                    name='rating'
                    type='radio'
                    validate={required}
                    render={(fieldProps) => {
                      return (
                        <Rating
                          name='simple-controlled'
                          precision={0.5}
                          onChange={(event, newValue) => {
                            fieldProps.input.onChange(event);
                          }}
                        />
                      );
                    }}
                  />
                </Box>
                <Field
                  name='message'
                  validate={required}
                  render={(fieldProps) => {
                    return (
                      <TextField
                        placeholder='Review Message'
                        label={<Typography>Review Message</Typography>}
                        {...fieldProps}
                      />
                    );
                  }}
                />

                <Box display='flex' gap='1rem' justifyContent='center'>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={handleOnCancel}
                    type='button'
                    gaEventProps={{
                      action: "submit_review",
                      category: "Cancel submit review btn clicked",
                    }}
                    disabled={reviewBusinessProps.loading}
                  >
                    Cancel
                  </Button>

                  <Button
                    size='small'
                    type='submit'
                    disabled={reviewBusinessProps.loading || pristine}
                  >
                    Submit {reviewBusinessProps.loading && <Loading />}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        />
      </Box>
      <Snackbar
        open={isErrSnkbarOpen}
        autoHideDuration={3000}
        onClose={closeErrSnkbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity='error'>{reviewBusinessProps.error?.message}</Alert>
      </Snackbar>
    </Drawer>
  );
};
export default SubmitReviewDrawer;
