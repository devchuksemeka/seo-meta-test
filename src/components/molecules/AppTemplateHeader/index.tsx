"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import Button from "@/components/atoms/Button";
import styles from "./style.module.scss";

import AppHeaderProfileMenuDropdown from "@/components/organisms/AppHeaderProfileMenuDropdown";
import AppHeaderNotificationBadge from "@/components/organisms/AppHeaderNotificationBadge";
import { User } from "@/constants/user";

const AppTemplateHeader = () => {
  const sessionPayload = useSession();
  const { data: sessionData, status } = sessionPayload;

  const sessionUser = sessionData?.user as User;

  return (
    <nav className={styles.nav_section}>
      <div className={`${styles.logo}`}>
        <Link href='/'>
          <Image height={40} width={90} src='/logo.svg' alt='Logo Image' />
        </Link>
      </div>
      {status !== "loading" && (
        <div className={styles.nav_section_right}>
          {sessionData && status === "authenticated" ? (
            <>
              <AppHeaderNotificationBadge />
              <AppHeaderProfileMenuDropdown user={sessionUser!} />
            </>
          ) : (
            <Button variant='outlined' onClick={signIn}>
              SIGN IN
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppTemplateHeader;
