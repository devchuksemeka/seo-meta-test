import Image from "next/image";
import styles from "./page.module.css";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Triple E Couture",
    description: "Triple E business description",
    openGraph: {
      title: "Triple E Couture",
      description: "The business for you",
      images: ["/vercel.svg"],
      type: "website",
      siteName: "Test Next App Router",
    },
  };
}

export default function BusinessProfile() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Get started by editing&nbsp;</p>
        <div>
          <a
            href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            By{" "}
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
