import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import userService from '../../Services/UserService';
import Header from '../Header/Header';

function BaseLayout() {
  console.log("authed: " + userService.isAuthorized());
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default BaseLayout;