import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { Form } from "react-final-form";
import { useMutation } from "@apollo/client";

import Button from "@/components/atoms/Button";

import styles from "./style.module.scss";
import VerifyRequestInfoStage from "./VerifyRequestInfoStage";
import RequestingStage from "./RequestingStage";
import REQUEST_SERVICE_GQL_TAG from "@/graphql/gql-tags/order/mutations";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_USER_PROFILE_TAG } from "@/graphql/gql-tags/user/queries";
import { User } from "@/constants/user";
import Loading from "@/components/atoms/Loading";
import { useRouter } from "next/navigation";

interface RequestServiceDrawerProps {
  isOpen: boolean;
  onClose: VoidFunction;
  businessId: string;
}

const RequestServiceDrawer = ({
  isOpen,
  onClose,
  businessId,
}: RequestServiceDrawerProps) => {
  const router = useRouter();
  const [stage, setStage] = useState("VERIFY");

  const [requestService, requestServiceProps] = useMutation(
    REQUEST_SERVICE_GQL_TAG
  );

  const handleOnClose = () => {
    const { data } = requestServiceProps;
    const { requestService } = data ?? {};
    router.push(`/requests/${requestService.id}`);

    onClose();
    // navigate to request page
    setTimeout(() => {
      setStage("VERIFY");
    }, 500);
  };

  const handleOnCancel = () => {
    onClose();
    setTimeout(() => {
      setStage("VERIFY");
    }, 500);
  };
  const { loading, data } = useQuery(GET_USER_PROFILE_TAG);
  const profileData = (data?.getUserProfile ?? {}) as User;
  const { address, phone } = profileData;

  const initialValues = {
    phone,
    address,
  };

  const onSubmit = (props: { phone: string; address: string }) => {
    setTimeout(() => setStage("REQUEST"), 500);
    requestService({
      variables: {
        businessId,
        date: Date(),
        orderSummary: {
          requester: props,
        },
      },
    });
  };

  return (
    <Drawer anchor='bottom' open={isOpen}>
      <Box className={styles.request_service_drawer}>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, submitting }) => (
            <Box
              component='form'
              onSubmit={handleSubmit}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap='2rem'
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  {stage === "REQUEST" ? (
                    <RequestingStage
                      requestServiceMutationProps={requestServiceProps}
                    />
                  ) : (
                    <VerifyRequestInfoStage />
                  )}
                  <Box display='flex' gap='1rem'>
                    {stage === "VERIFY" ? (
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={handleOnCancel}
                        type='button'
                      >
                        Cancel
                      </Button>
                    ) : (
                      <>
                        {!requestServiceProps.loading ? (
                          <Button
                            variant='outlined'
                            size='small'
                            onClick={handleOnClose}
                            type='button'
                          >
                            Close
                          </Button>
                        ) : (
                          <></>
                        )}
                      </>
                    )}

                    {stage === "VERIFY" && (
                      <Button size='small' type='submit'>
                        Request
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </Box>
          )}
        />
      </Box>
    </Drawer>
  );
};
export default RequestServiceDrawer;
