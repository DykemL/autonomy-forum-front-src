import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { createMainTheme } from '../Common/Themes';
import snackbarService from '../Services/SnackbarService';
import userService from '../Services/UserService';
import AppRouter from './Router';

const mainTheme = createMainTheme();

function App() {
  userService.updateAuthorizationState();

  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        {snackbarService.getContainer()}
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;