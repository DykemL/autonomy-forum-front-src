import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import ClearLink from '../Base/ClearLink';

export default function MainLayout() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography component={ClearLink} to="/" variant="h6" sx={{ flexGrow: 1 }}>
              Autonomy forum
            </Typography>
            <Button component={Link} to={"/login"} color="inherit">
              Вход
            </Button>
            <Button component={Link} to={"/register"} color="inherit">
              Регистрация
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}