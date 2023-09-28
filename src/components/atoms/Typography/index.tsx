import styles from "./typography.module.scss";

interface TypographyProps {
  children: any;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "large"
    | "base"
    | "small"
    | "xsmall";
  fontStyle?: "regular" | "medium" | "bold" | "extra-bold";
  color?: "primary" | "secondary" | "inherit" | "brand";
}

const Typography = ({
  variant = "base",
  fontStyle = "regular",
  children,
  color = "primary",
  ...rest
}: TypographyProps) => {
  let style = styles.regular;

  if (fontStyle === "bold") {
    style = styles.bold;
  }
  if (fontStyle === "extra-bold") {
    style = styles.extra_bold;
  }
  if (fontStyle === "medium") {
    style = styles.medium;
  }

  if (color === "primary") {
    style = `${style} ${styles.primary_text}`;
  }
  if (color === "secondary") {
    style = `${style} ${styles.secondary_text}`;
  }

  if (color === "inherit") {
    style = `${style} ${styles.inherit_text}`;
  }

  if (color === "brand") {
    style = `${style} ${styles.brand_text}`;
  }

  if (variant === "h1") {
    return <h1 className={style}>{children}</h1>;
  }
  if (variant === "h2") {
    return <h2 className={style}>{children}</h2>;
  }
  if (variant === "h3") {
    return <h3 className={style}>{children}</h3>;
  }
  if (variant === "h4") {
    return <h4 className={style}>{children}</h4>;
  }
  if (variant === "h5") {
    return <h5 className={style}>{children}</h5>;
  }
  if (variant === "h6") {
    return <h6 className={style}>{children}</h6>;
  }

  if (variant === "large") {
    style = `${style} ${styles.large_text}`;
  }
  if (variant === "small") {
    style = `${style} ${styles.small_text}`;
  }

  if (variant === "base") {
    style = `${style} ${styles.base_text}`;
  }

  return (
    <span role='span' className={style} {...rest}>
      {children}
    </span>
  );
};

export default Typography;
