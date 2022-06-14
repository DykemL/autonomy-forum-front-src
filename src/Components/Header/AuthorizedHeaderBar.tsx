import { AccountCircle, Logout } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nullable } from "../../Common/Types";
import userService from "../../Services/UserService";

function AuthorizedHeaderBar () {
  const navigate = useNavigate();

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<Nullable<HTMLElement>>(undefined);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setProfileMenuAnchorEl(undefined);
  }

  return (
    <>
      <Tooltip title="Профиль">
        <Button sx={{ textTransform: 'none' }} startIcon={<AccountCircle />} onClick={handleProfileClick} size="large" color="inherit">
          {userService.getUserName()}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={profileMenuAnchorEl}
        open={isProfileMenuOpen}
        onClose={closeProfileMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          closeProfileMenu();
          navigate('/users/' + userService.getUserId());
        }}>
          Профиль
        </MenuItem>
        <MenuItem onClick={() => {
          closeProfileMenu();
          navigate('/messages');
        }}>
          Диалоги
        </MenuItem>
        <MenuItem onClick={() => {
            closeProfileMenu();
            userService.logout();
          }}
          >
            Выход
        </MenuItem>
      </Menu>
    </>
  );
}

export default AuthorizedHeaderBar;