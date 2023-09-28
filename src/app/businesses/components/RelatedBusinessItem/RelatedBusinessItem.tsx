import Typography from "@/components/atoms/Typography";
import Avatar from "@/components/molecules/Avatar";
import Link from "next/link";

import styles from "./style.module.scss";
import { useRouter } from "next/router";
import Icon from "@/components/atoms/Icon";

interface BusinessCardProps {
  item: {
    id: string;
  };
}

const RelatedBusinessItem = ({ item }: BusinessCardProps) => {
  return (
    <Link href={`/businesses/${item.id}`}>
      <section className={styles.business_card}>
        <Avatar size='small'>
          <Icon name='fallback-business-logo' fontSize='1.5rem' />
        </Avatar>
        <Typography variant='large' fontStyle='extra-bold'>
          Rolland’s unisex barber’s shop{" "}
        </Typography>
      </section>
    </Link>
  );
};
export default RelatedBusinessItem;
