import {
  Box,
  Popover as PopoverDefault,
  PopoverProps as PopoverDefaultProps,
} from "@mui/material";

import styles from "./style.module.scss";

interface PopoverProps extends PopoverDefaultProps {}

const Popover = ({
  id,
  open,
  onClose,
  anchorEl,
  anchorOrigin,
  children,
}: PopoverProps) => {
  return (
    <PopoverDefault
      id={id}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
    >
      <Box className={styles.wrapper}>{children}</Box>
    </PopoverDefault>
  );
};

export default Popover;
