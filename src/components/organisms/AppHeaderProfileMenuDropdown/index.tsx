import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { signOut } from "next-auth/react";

import styles from "./style.module.scss";
import Avatar from "@/components/molecules/Avatar";
import useMenuDropdown from "@/hooks/useMenuDropdown";
import Icon from "@/components/atoms/Icon";
import { useRouter } from "next/navigation";
import { User } from "@/constants/user";

interface AppHeaderProfileMenuDropdownProps {
  user: User;
}

const AppHeaderProfileMenuDropdown = ({
  user,
}: AppHeaderProfileMenuDropdownProps) => {
  const router = useRouter();
  const {
    isOpen: isMenuDropDownOpen,
    open: openMenuDropdown,
    close: closeMenuDropdown,
    anchorEl: menuDropdownAnchorEl,
  } = useMenuDropdown();

  const navigateToProfile = () => {
    router.push(`/profile/${user.id}`);
    closeMenuDropdown();
  };

  return (
    <>
      <IconButton
        className={styles.avatar_menu_button}
        onClick={openMenuDropdown}
      >
        <Avatar size='small'>
          <Image
            src={user.image}
            width={36}
            height={36}
            alt='user-profile-logo'
          />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={menuDropdownAnchorEl}
        id='account-menu'
        open={isMenuDropDownOpen}
        onClose={closeMenuDropdown}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className={styles.menu}
      >
        <MenuItem onClick={navigateToProfile}>
          <ListItemIcon>
            <Icon name='menu-profile' fontSize='1rem' />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Icon name='menu-logout' fontSize='1rem' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default AppHeaderProfileMenuDropdown;
