import { useState } from "react";
import useShow from "../useShow";

interface IUsePopover {
  isOpen: boolean;
  close: () => void;
  open: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
}

const usePopover = (): IUsePopover => {
  const { isShowing: isOpen, show, hide } = useShow();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = (event: React.MouseEvent<HTMLElement>) => {
    if (event) {
      setAnchorEl(event?.currentTarget);
      return show();
    }
  };
  const close = () => {
    setAnchorEl(null);
    return hide();
  };

  return {
    isOpen,
    close,
    open,
    anchorEl,
  };
};

export default usePopover;
