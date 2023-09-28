import { PropsWithChildren } from "react";
import { Avatar, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import styles from "./style.module.scss";
import Typography from "@/components/atoms/Typography";

import GET_USER_MANAGED_BUSINESS_TAG from "@/graphql/gql-tags/user-business/queries";
import Loading from "@/components/atoms/Loading";
import { UserManagedBusinessProfileSchema } from "@/constants/user-business";

interface ManagedBusinessProfilesProps {
  // user: User;
}

const ManagedBusinessProfilesTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.header__content__body}>
      <Typography>Business Profile(s)</Typography>
      {children}
    </div>
  );
};

const ManagedBusinessProfiles = (props: ManagedBusinessProfilesProps) => {
  const router = useRouter();
  const { loading, data, error } = useQuery(GET_USER_MANAGED_BUSINESS_TAG);

  const managedBusinessess = (data?.getUserManagedBusinesses ??
    []) as UserManagedBusinessProfileSchema[];

  if (loading) {
    return (
      <ManagedBusinessProfilesTemplate>
        <Loading />
      </ManagedBusinessProfilesTemplate>
    );
  }

  if (error) {
    return (
      <ManagedBusinessProfilesTemplate>
        {error.message}
      </ManagedBusinessProfilesTemplate>
    );
  }

  if (managedBusinessess.length === 0) {
    return (
      <ManagedBusinessProfilesTemplate>
        <Typography>Currently Not Managing Business Profile</Typography>
      </ManagedBusinessProfilesTemplate>
    );
  }

  return (
    <ManagedBusinessProfilesTemplate>
      {managedBusinessess.map((managedUserBizItem) => {
        return (
          <Link
            key={managedUserBizItem.id}
            href={`/businesses/${managedUserBizItem.business?.id}`}
            className={styles.managed_biz_link}
          >
            <Avatar src={managedUserBizItem.business?.image} />
            <Typography>{managedUserBizItem.business?.name}</Typography>
          </Link>
        );
      })}
    </ManagedBusinessProfilesTemplate>
  );
};
export default ManagedBusinessProfiles;
