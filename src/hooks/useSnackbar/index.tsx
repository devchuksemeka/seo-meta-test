import useShow from "../useShow";

interface IUseSnackBar {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
}

const useSnackbar = (): IUseSnackBar => {
  const { isShowing: isOpen, show, hide, toggle } = useShow();

  const open = () => {
    return show();
  };
  const toggleModal = () => {
    return toggle();
  };

  return {
    isOpen,
    close: hide,
    open,
    toggle: toggleModal,
  };
};

export default useSnackbar;
