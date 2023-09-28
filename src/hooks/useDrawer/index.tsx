import { useState } from "react";
import useShow from "../useShow";

interface IUsePopover {
  isOpen: boolean;
  close: () => void;
  open: (e?: React.MouseEvent<HTMLElement>) => void;
}

const useDrawer = (): IUsePopover => {
  const { isShowing: isOpen, show, hide } = useShow();

  const open = (event?: React.MouseEvent<HTMLElement>) => {
    return show();
  };
  const close = () => {
    // setAnchorEl(null);
    return hide();
  };

  return {
    isOpen,
    close,
    open,
  };
};

export default useDrawer;
