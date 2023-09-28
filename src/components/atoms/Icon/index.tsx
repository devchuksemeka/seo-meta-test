import styles from "./icon.module.scss";
import iconList, { IconType } from "./icon-list";
import { HTMLAttributes } from "react";

interface IconWrapperProps {
  fontSize?: number | string;
  color?: "primary" | "secondary" | "text" | "none";
  disabled?: boolean;
  filled?: boolean;
  className?: any;
}

export interface IconProps extends IconWrapperProps {
  name: IconType;
}

const Icon = ({
  name,
  disabled,
  fontSize,
  color = "secondary",
  filled,
  className,
  ...rest
}: IconProps): JSX.Element => {
  const iconSvg = iconList[name];

  let style = styles.icon_wrapper;
  // let style = `${styles.icon_wrapper} ${styles.color_secondary}`

  if (color === "primary") {
    style = `${style} ${styles.icon_color_primary}`;
  }
  if (color === "secondary") {
    style = `${style} ${styles.icon_color_secondary}`;
  }

  if (color === "text") {
    style = `${style} ${styles.icon_color_text}`;
  }

  if (filled) {
    style = `${style} ${styles.icon_filled}`;
  }

  return (
    <div
      className={className ? `${style} ${className}` : style}
      style={{
        fontSize,
      }}
    >
      {iconSvg}
    </div>
  );
};

export default Icon;
