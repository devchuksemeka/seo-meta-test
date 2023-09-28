import ReactGA from "react-ga4";

import styles from "./button.module.scss";
import { GAEventProps } from "@/constants/google-analytics";

interface ButtonProps {
  children: any;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "info" | "error" | "success" | "warning";
  fullWidth?: boolean;
  onClick?: (event?: any) => void;
  // onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  // onMouseLeave?: () => void;
  type?: "submit" | "button";
  size?: "large" | "medium" | "small" | "smallest";
  disabled?: boolean;
  gaEventProps?: GAEventProps;
}
const Button = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  type = "button",
  fullWidth,
  onClick,
  disabled,
  gaEventProps,
  ...rest
}: ButtonProps) => {
  let style = "";

  /**
   * COLOR Injection
   */
  if (color === "primary") {
    style = `${style} ${styles.button_color_primary}`;
  }

  if (color === "error") {
    style = `${style} ${styles.button_color_error}`;
  }

  if (color === "warning") {
    style = `${style} ${styles.button_color_warning}`;
  }

  if (color === "info") {
    style = `${style} ${styles.button_color_info}`;
  }

  if (color === "success") {
    style = `${style} ${styles.button_color_success}`;
  }

  /**
   * Size injection
   */

  if (size === "large") {
    style = `${style} ${styles.button_size_large}`;
  }
  if (size === "medium") {
    style = `${style} ${styles.button_size_medium}`;
  }
  if (size === "small") {
    style = `${style} ${styles.button_size_small}`;
  }
  if (size === "smallest") {
    style = `${style} ${styles.button_size_smallest}`;
  }

  /**
   * Variant Injection
   */

  if (variant === "text") {
    style = `${style} ${styles.button_variant_text}`;
  }

  if (variant === "contained") {
    style = `${style} ${styles.button_variant_contained}`;

    if (color === "primary") {
      style = `${style} ${styles.button_variant_contained_primary}`;
    }

    if (color === "error") {
      style = `${style} ${styles.button_variant_contained_error}`;
    }

    if (color === "warning") {
      style = `${style} ${styles.button_variant_contained_warning}`;
    }

    if (color === "info") {
      style = `${style} ${styles.button_variant_contained_info}`;
    }

    if (color === "success") {
      style = `${style} ${styles.button_variant_contained_success}`;
    }
  }

  if (variant === "outlined") {
    style = `${style} ${styles.button_variant_outlined}`;
  }

  if (fullWidth) {
    style = `${style} ${styles.button_fullwidth}`;
  }

  if (disabled) {
    style = `${style} ${styles.button_disabled}`;
  }

  const handleOnClick = (event: any) => {
    if (!disabled) {
      gaEventProps && ReactGA.event(gaEventProps);
      onClick?.(event);
    } else {
      console.log("Button is disabled");
    }
  };

  return (
    <button
      className={style}
      {...rest}
      onClick={handleOnClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
