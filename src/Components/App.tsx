import { ThemeProvider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMainTheme } from '../Common/Themes';
import snackbarService from '../Services/SnackbarService';
import userService from '../Services/UserService';
import BaseProgress from './Common/BaseProgress';
import AppRouter from './Router';

const mainTheme = createMainTheme();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService.updateAuthorizationStateFromServer().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      {snackbarService.getContainer()}
      {!loading ?
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        :
        <BaseProgress />
      }
    </ThemeProvider>
  );
};

export default App;