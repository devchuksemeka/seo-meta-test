import NextLink, { LinkProps as NextLinkProps } from "next/link";
import styles from "./style.module.scss";

interface LinkProps extends NextLinkProps {
  children: any;
}
const Link = ({ children, ...rest }: LinkProps) => {
  return (
    <NextLink className={styles.link} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
