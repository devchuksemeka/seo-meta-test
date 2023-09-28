import React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

import Button from "@/components/atoms/Button";
import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import Typography from "@/components/atoms/Typography";

import styles from "./style.module.scss";
import Popover from "@/components/atoms/Popover";
import usePopover from "@/hooks/usePopover";
import useDrawer from "@/hooks/useDrawer";
import Loading from "@/components/atoms/Loading";
import RequestServiceDrawer from "@/components/organisms/RequestServiceDrawer";
import { Business } from "@/constants/business";
import { Avatar } from "@mui/material";
import BusinessShareMenuDrawer from "@/components/organisms/BusinessShareMenuDrawer";

interface BusinessCardProps {
  item: Business;
}

const BusinessCard = ({ item }: BusinessCardProps) => {
  const sessionPayload = useSession();
  const { data: sessionData, status } = sessionPayload;

  const { open, isOpen, close, anchorEl } = usePopover();
  const {
    open: openDrawer,
    isOpen: isOpenDrawer,
    close: closeDrawer,
  } = useDrawer();

  const {
    isOpen: isShareDrawerOpen,
    close: closeShareDrawer,
    open: openShareDrawer,
  } = useDrawer();

  const { id, name, image, bannerUrl } = item;

  const handleRequestService = (event: React.MouseEvent<HTMLElement>) => {
    if (status !== "authenticated") {
      // show a popover
      open(event);
    } else {
      // show request service drawer
      openDrawer();
    }
  };

  return (
    <section className={styles.business_card}>
      <section
        className={styles.business_card__banner}
        style={{
          background: `url(${bannerUrl}) lightgray 50% / cover no-repeat`,
        }}
      ></section>
      <section className={styles.business_card__top_section}>
        <Avatar
          className={styles.business_card__avatar}
          src={image}
          alt={`${name} biz logo`}
        />
        <Link href={`businesses/${id}`}>
          <Typography variant='large' fontStyle='bold'>
            {name}
          </Typography>
        </Link>
      </section>
      <Divider />
      <section className={styles.business_card__bottom_section}>
        <section className={styles.business_card__bottom_section__button_group}>
          <Button
            variant='contained'
            size='small'
            onClick={handleRequestService}
            aria-describedby={id}
            type='button'
          >
            Request Service
            <Icon
              name='request-service'
              className={styles.request_service_icon}
            />
          </Button>
          <Popover
            id={id}
            open={isOpen}
            onClose={close}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "center", horizontal: "left" }}
          >
            <Button variant='outlined' onClick={signIn}>
              Sign In to continue
            </Button>
          </Popover>
          <RequestServiceDrawer
            businessId={id}
            isOpen={isOpenDrawer}
            onClose={closeDrawer}
          />
          <Button
            variant='outlined'
            size='small'
            onClick={openShareDrawer}
            gaEventProps={{
              category: "Open share business drawer",
              action: "share_business",
              value: 99,
            }}
          >
            <Icon name='share' />
            Share
          </Button>
        </section>
      </section>
      <BusinessShareMenuDrawer
        isOpen={isShareDrawerOpen}
        onClose={closeShareDrawer}
        business={item}
      />
    </section>
  );
};
export default BusinessCard;
