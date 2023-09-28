import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./style.module.scss";
import useMenuDropdown from "@/hooks/useMenuDropdown";
import Icon from "@/components/atoms/Icon";

import useDrawer from "@/hooks/useDrawer";
import { Business } from "@/constants/business";
import BusinessShareMenuDrawer from "../BusinessShareMenuDrawer";
import { gaEvent } from "@/utils/google-analytics";

interface BusinessKebabMenuDropdownProps {
  business: Business;
}

const BusinessKebabMenuDropdown = ({
  business,
  ...rest
}: BusinessKebabMenuDropdownProps) => {
  const router = useRouter();
  const {
    isOpen: isKebabMenuDropDownOpen,
    open: openMenuDropdown,
    close: closeMenuDropdown,
    anchorEl: menuDropdownAnchorEl,
  } = useMenuDropdown();

  const {
    isOpen: isShareDrawerOpen,
    close: closeShareDrawer,
    open: openShareDrawer,
  } = useDrawer();

  const handleOpenShareDrawer = () => {
    openShareDrawer();
    gaEvent({
      category: "Open share business drawer",
      action: "share_business",
      value: 99,
    });
    closeMenuDropdown();
  };

  const navigateToProfile = () => {
    // router.push(`/profile/${user.id}`);
  };

  return (
    <>
      <IconButton
        aria-labelledby='kebab-business-menu'
        onClick={openMenuDropdown}
      >
        <Icon name='kebab-horizontal' color='primary' />
      </IconButton>
      <Menu
        anchorEl={menuDropdownAnchorEl}
        id='kebab-business-menu'
        open={isKebabMenuDropDownOpen}
        onClose={closeMenuDropdown}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpenShareDrawer}>
          <ListItemIcon>
            <Icon name='share' fontSize='1rem' />
          </ListItemIcon>
          Share
        </MenuItem>
      </Menu>
      <BusinessShareMenuDrawer
        isOpen={isShareDrawerOpen}
        onClose={closeShareDrawer}
        business={business}
      />
    </>
  );
};

export default BusinessKebabMenuDropdown;
