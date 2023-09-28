"use client";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Avatar, Box, Rating, Tab, Tabs } from "@mui/material";
import { Metadata, ResolvingMetadata } from "next";

import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_BUSINESS_GQL } from "@/graphql/gql-tags/business/queries";
import Loading from "@/components/atoms/Loading";
import Icon from "@/components/atoms/Icon";
import styles from "./style.module.scss";
import { useAppApiInitializationContext } from "@/contexts/AppApiInitialization";
import { Business } from "@/constants/business";
import Popover from "@/components/atoms/Popover";
import usePopover from "@/hooks/usePopover";
import useDrawer from "@/hooks/useDrawer";
import RequestServiceDrawer from "@/components/organisms/RequestServiceDrawer";
import BusinessKebabMenuDropdown from "@/components/organisms/BusinessKebabMenuDropdown";
import BusinessReviews from "@/components/organisms/BusinessReviews";

interface BusinessProfileProps {
  id: string;
}

export default function BusinessProfile(props: BusinessProfileProps) {
  const { id } = props;
  const router = useRouter();
  const { services: globalServiceList } = useAppApiInitializationContext();
  const { status } = useSession();

  const [activeTab, setActiveTab] = useState<"services" | "reviews">(
    "services"
  );
  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: "services" | "reviews"
  ) => {
    setActiveTab(newValue);
  };

  const { open, isOpen, close, anchorEl } = usePopover();
  const {
    open: openDrawer,
    isOpen: isOpenDrawer,
    close: closeDrawer,
  } = useDrawer();

  const { data, loading, error } = useQuery(GET_BUSINESS_GQL, {
    fetchPolicy: "cache-first",
    variables: {
      id,
    },
    skip: !id,
  });

  const handleRequestService = (event: React.MouseEvent<HTMLElement>) => {
    if (status !== "authenticated") {
      // show a popover
      open(event);
    } else {
      // show request service drawer
      openDrawer();
    }
  };

  const { getBusiness } = data ?? {};
  const {
    id: businessId,
    image,
    name,
    description,
    services,
    bannerUrl,
    rating,
  } = (getBusiness ?? {}) as Business;

  const serviceList =
    services?.length > 0
      ? globalServiceList.filter((service) => {
          return services?.includes(service.slug);
        })
      : [];

  return (
    <section className={styles.wrapper}>
      <section className={styles.back_btn_wrapper}>
        <Button size='small' variant='outlined' onClick={router.back}>
          <Icon name='arrow-back' color='primary' />
        </Button>
      </section>
      <div className={styles.container}>
        <section className={styles.header}>
          <section
            className={styles.header__banner}
            style={{
              background: `url(${bannerUrl}) lightgray 50% / cover no-repeat`,
            }}
          ></section>
        </section>
        {loading && <Loading />}
        {data && (
          <>
            <section className={styles.header__content}>
              <div className={styles.header__content__top}>
                <Avatar
                  src={image}
                  alt={`${name} biz logo`}
                  className={styles.header__content__avatar}
                />

                <Box display='flex' alignItems='center' gap='1rem'>
                  <>
                    <Button
                      variant='contained'
                      size='small'
                      onClick={handleRequestService}
                      aria-describedby={businessId}
                      type='button'
                    >
                      Request Service
                      <Icon
                        name='request-service'
                        className={styles.request_service_icon}
                        color='text'
                      />
                    </Button>
                    <Popover
                      id={businessId}
                      open={isOpen}
                      onClose={close}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "left",
                      }}
                    >
                      <Button variant='outlined' onClick={signIn}>
                        Sign In to continue
                      </Button>
                    </Popover>
                    <RequestServiceDrawer
                      businessId={businessId}
                      isOpen={isOpenDrawer}
                      onClose={closeDrawer}
                    />
                  </>
                  <BusinessKebabMenuDropdown business={getBusiness} />
                </Box>
              </div>

              <section className={styles.header__content__body}>
                <Typography variant='large' fontStyle='bold'>
                  {name}
                </Typography>
                <Typography>{description}</Typography>
                <Box display='flex' alignItems='center' gap='.5rem'>
                  <Rating
                    name='simple-controlled'
                    readOnly
                    precision={0.5}
                    value={rating}
                    size='small'
                  />
                  <Typography>
                    <strong>{rating}</strong> Reviews
                  </Typography>
                </Box>
              </section>
            </section>

            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              variant='fullWidth'
              centered
            >
              <Tab label='Service Catalog' value='services' />
              <Tab label='Reviews' value='reviews' />
            </Tabs>
            <section className={styles.main_content}>
              {activeTab === "services" && (
                <section className={styles.business_services}>
                  {serviceList.length > 0 &&
                    serviceList.map((service) => (
                      <div
                        className={styles.business_services__catalog_card}
                        key={service.id}
                      >
                        <Typography fontStyle='medium'>
                          {service.name}
                        </Typography>
                      </div>
                    ))}
                </section>
              )}
              {activeTab === "reviews" && (
                <BusinessReviews business={getBusiness} />
              )}

              {/* 
          {[...Array(4)].map((business, index) => {
            return (
              <RelatedBusinessItem
                key={index.toString()}
                item={{ id: index.toString() }}
              />
            );
          })}
          <section className={styles.see_more_section}>
            <Button
              onClick={() => {
                router.push("/businesses");
              }}
              size='small'
            >
              See More
            </Button>
          </section> */}
            </section>
          </>
        )}
      </div>
    </section>
  );
}
