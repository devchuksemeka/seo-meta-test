import { ReactNode } from "react";
import Icon from "@/components/atoms/Icon";
import Typography from "@/components/atoms/Typography";
import styles from "./style.module.scss";

interface ReviewProps {
  totalReview: number;
  showReviewText?: boolean;
  label?: ReactNode;
}
const ReviewStars = ({ totalReview, showReviewText, label }: ReviewProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stars_group}>
        <Icon name='review-star' fontSize='1rem' />
        <Icon name='review-star' fontSize='1rem' />
        <Icon name='review-star' fontSize='1rem' />
        <Icon name='review-star' fontSize='1rem' />
        <Icon name='review-star' fontSize='1rem' />
      </div>
      <Typography>
        {showReviewText ? `${totalReview} Reviews` : label}
      </Typography>
    </div>
  );
};

export default ReviewStars;
