"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, Avatar, Box, Snackbar } from "@mui/material";
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_USER_PROFILE_TAG } from "@/graphql/gql-tags/user/queries";
import { GET_USER_MANAGED_BUSINESS_TAG } from "@/graphql/gql-tags/user-business/queries";
import Loading from "@/components/atoms/Loading";
import styles from "./style.module.scss";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { User } from "@/constants/user";
import TextField from "@/components/molecules/TextField";

import { UPDATE_USER_PROFILE_TAG } from "@/graphql/gql-tags/user/mutations";
import { required } from "@/utils/validations";

import useSnackbar from "@/hooks/useSnackbar";
import ManagedBusinessProfiles from "@/components/organisms/ManagedBusinessProfiles";

interface ProfileProps {
  params: { id: string };
}

export default function Profile({ params }: ProfileProps) {
  const router = useRouter();
  const {
    isOpen: isUpdateSuccessOpen,
    close: closeUpdateSuccess,
    open: openUpdateSuccess,
  } = useSnackbar();
  const {
    isOpen: isUpdateErrOpen,
    close: closeUpdateErr,
    open: openUpdateErr,
  } = useSnackbar();

  // get request details
  const [updateProfileMutation, updateProps] = useMutation(
    UPDATE_USER_PROFILE_TAG
  );
  const { loading, data, refetch } = useQuery(GET_USER_PROFILE_TAG);

  const handleOnGoBack = () => {
    router.back();
  };

  const handleSubmit = (props: { phone: string; address: string }) => {
    updateProfileMutation({
      variables: props,
    });
  };

  useEffect(() => {
    const { data, error } = updateProps;
    if (data) {
      openUpdateSuccess();
      refetch();
    }
    if (error) {
      openUpdateErr();
    }
  }, [updateProps.data, updateProps.error]);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' py='5rem'>
        <Loading />
      </Box>
    );
  }

  const profileData = (data?.getUserProfile ?? {}) as User;
  const { address, phone, role } = profileData;

  const initialValues = {
    phone,
    address,
  };

  return (
    <>
      <section className={styles.wrapper}>
        <section className={styles.back_btn_wrapper}>
          <Button size='small' variant='outlined' onClick={handleOnGoBack}>
            <Icon name='arrow-back' color='secondary' />
          </Button>
        </section>
        <div className={styles.container}>
          <section className={styles.header}>
            <section
              className={styles.header__banner}
              style={{
                background: `url(https://drive.google.com/uc?id=1sJkz1eA5tsErrUrAMJL7qlalfa8E9Ety) lightgray 50% / cover no-repeat`,
              }}
            ></section>
            <section className={styles.header__content}>
              <Avatar
                className={styles.header__content__avatar}
                src={profileData.profileUrl}
              />
              <div className={styles.header__content__body}>
                <Typography>
                  {profileData.firstname} {profileData.lastname}
                </Typography>
                <Typography color='brand'>{profileData.email}</Typography>
                <Form
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  render={({ handleSubmit, pristine }) => {
                    return (
                      <Box component='form' onSubmit={handleSubmit}>
                        <Box
                          display='grid'
                          gridTemplateColumns='repeat(auto-fill, minmax(300px, 1fr))'
                          gap='1rem'
                        >
                          <Field
                            name='phone'
                            validate={required}
                            render={(fieldProps) => (
                              <TextField
                                type='text'
                                placeholder='Eg. 07012345678'
                                fullWidth
                                label={
                                  <Typography variant='small'>
                                    Phone Number
                                  </Typography>
                                }
                                {...fieldProps}
                              />
                            )}
                          />
                          <Field
                            name='address'
                            validate={required}
                            render={(fieldProps) => (
                              <TextField
                                type='text'
                                placeholder='Address'
                                fullWidth
                                label={
                                  <Typography variant='small'>
                                    Address
                                  </Typography>
                                }
                                {...fieldProps}
                              />
                            )}
                          />
                        </Box>
                        <Box display='flex' justifyContent='center' py='1rem'>
                          <Button
                            type='submit'
                            disabled={updateProps.loading || pristine}
                          >
                            Save {updateProps.loading && <Loading />}
                          </Button>
                        </Box>
                      </Box>
                    );
                  }}
                />
              </div>
              {role === "biz_manager" && <ManagedBusinessProfiles />}
            </section>
          </section>
        </div>
      </section>
      <Snackbar
        open={isUpdateSuccessOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={closeUpdateSuccess}
      >
        <Alert severity='success'>Update successful!</Alert>
      </Snackbar>

      <Snackbar
        open={isUpdateErrOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={closeUpdateErr}
      >
        <Alert severity='error'>Update failed, try again!</Alert>
      </Snackbar>
    </>
  );
}
