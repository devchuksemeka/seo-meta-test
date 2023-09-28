import { Avatar, Box, Rating } from "@mui/material";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import styles from "./style.module.scss";

import { Business } from "@/constants/business";
import Typography from "@/components/atoms/Typography";
import { GET_BUSINESS_REVIEWS_GQL } from "@/graphql/gql-tags/business-review/queries";
import Loading from "@/components/atoms/Loading";
import { GetBusinessReviewResult } from "@/constants/business-review";

interface BusinessReviewsProps {
  business: Business;
}

const BusinessReviews = ({ business }: BusinessReviewsProps) => {
  const { data, loading, error } = useQuery(GET_BUSINESS_REVIEWS_GQL, {
    fetchPolicy: "cache-first",
    variables: {
      id: business.id,
    },
    skip: !business.id,
  });

  if (loading) {
    return (
      <section className={styles.business_services__review}>
        <Loading />
      </section>
    );
  }

  const { getBusinessReviews } = data ?? {};
  const { reviews } = getBusinessReviews as GetBusinessReviewResult;

  if (reviews.length === 0) {
    return (
      <section className={styles.business_services__review}>
        <div className={styles.business_services__review__no_review}>
          <Typography fontStyle='medium'>No Reviews</Typography>
          <Typography>No Review currently available for business</Typography>
        </div>
      </section>
    );
  }

  return (
    <Box px='1rem' component='section'>
      {reviews.map((review) => {
        return (
          <section key={review.id} className={styles.business_reviews__card}>
            <section className={styles.business_reviews__card__top}>
              <Avatar
                // alt={`${review.requestId} reviewer logo`}
                className={styles.business_reviews__card__avatar}
              />
              <section className={styles.business_reviews__card__top__right}>
                <Typography variant='large'>Chuks</Typography>
                <Rating readOnly value={review.rating} size='small' />
              </section>
            </section>
            <section className={styles.business_reviews__card__content}>
              <Typography variant='small'>{review.message}</Typography>
            </section>
          </section>
        );
      })}
    </Box>
  );
};
export default BusinessReviews;
