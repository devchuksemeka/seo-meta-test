"use client";
import { useRouter } from "next/navigation";
import { Avatar, Box, Chip, Rating } from "@mui/material";

import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import Loading from "@/components/atoms/Loading";
import styles from "./style.module.scss";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

import { GET_REQUEST_BY_ID_TAG } from "@/graphql/gql-tags/order/queries";
import { RequestDetail, RequestStatusEnum } from "@/constants/request";
import { numberToMoney } from "@/utils/numberToMoney";
import RequestStatusStepper from "@/components/organisms/RequestStatusStepper";
import useDrawer from "@/hooks/useDrawer";
import SubmitReviewDrawer from "@/components/organisms/SubmitReviewDrawer";

interface RequestDetailProps {
  id: string;
}

function RequestDetails({ id }: RequestDetailProps) {
  const router = useRouter();

  const {
    isOpen: isSubmitReviewDrawerOpen,
    close: closeSubmitReviewDrawer,
    open: openSubmitReviewDrawer,
  } = useDrawer();

  const handleOnGoBack = () => {
    router.back();
  };

  const handleSubmitReview = () => {
    openSubmitReviewDrawer();
  };

  // get request details
  const { loading, data, refetch } = useQuery(GET_REQUEST_BY_ID_TAG, {
    variables: {
      id,
    },
  });

  const request = (data?.getRequest ?? {}) as RequestDetail;

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' py='5rem'>
        <Loading />
      </Box>
    );
  }

  const { business, requester, amount, status, review } = request;

  let amountText = numberToMoney(amount);

  return (
    <section className={styles.wrapper}>
      <section className={styles.back_btn_wrapper}>
        <Button size='small' variant='outlined' onClick={handleOnGoBack}>
          <Icon name='arrow-back' color='secondary' />
        </Button>
      </section>
      <div className={styles.container}>
        <section className={styles.header}>
          <section className={styles.header__banner}>
            <RequestStatusStepper status={status} viewer='client' />
          </section>
          <section className={styles.header__content}>
            {review && (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                gap='.5rem'
              >
                <Rating
                  name='simple-controlled'
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
              </Box>
            )}
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              gap='.5rem'
            >
              <Chip
                label={<Typography variant='xsmall'>Amount</Typography>}
                size='small'
              />
              <Typography variant='h1' fontStyle='extra-bold'>
                {amountText}
              </Typography>
            </Box>
          </section>
          <Box
            component='section'
            aria-label='request content'
            className={styles.content}
          >
            <Box>
              <Typography variant='large' fontStyle='medium'>
                Client
              </Typography>
              <Box px='1rem' className={styles.content__card}>
                <Avatar
                  src={requester.profileUrl}
                  className={styles.content__card__avatar}
                />
                <Box display='flex' flexDirection='column' gap='.25rem'>
                  <Typography>
                    {requester.firstname} {requester.lastname}
                  </Typography>
                  <Typography>{requester.phone}</Typography>
                  <Typography>{requester.email}</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant='large' fontStyle='medium'>
                Service Provider
              </Typography>
              <Box className={styles.content__card} px='1rem'>
                <Box display='flex' flexDirection='column' gap='.25rem'>
                  <Typography>{business.name}</Typography>
                  <Typography>{business.phone}</Typography>
                  <Typography>{business.email}</Typography>
                </Box>
                <Avatar
                  src={business.image}
                  className={styles.content__card__avatar}
                />
              </Box>
            </Box>
          </Box>
          {/* <Box
            component='section'
            display='flex'
            justifyContent='center'
            p='1rem'
            gap='1rem'
          >
            <Button
              variant='contained'
              gaEventProps={{
                action: "submit_review",
                category: "Clicked Submit review button",
              }}
              onClick={handleSubmitReview}
            >
              Accept Request
            </Button>
          </Box> */}
        </section>
        {status === RequestStatusEnum.COMPLETED && !review && (
          // and is the requesting client
          <>
            <Box
              component='section'
              display='flex'
              justifyContent='center'
              p='1rem'
            >
              <Button
                variant='outlined'
                gaEventProps={{
                  action: "submit_review",
                  category: "Clicked Submit review button",
                }}
                onClick={handleSubmitReview}
              >
                Submit Review
              </Button>
            </Box>
            <SubmitReviewDrawer
              isOpen={isSubmitReviewDrawerOpen}
              onClose={closeSubmitReviewDrawer}
              request={request}
              onSuccess={refetch}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default RequestDetails;
