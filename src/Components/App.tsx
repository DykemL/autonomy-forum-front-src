import { ThemeProvider } from '@mui/material';
import moment from 'moment';
import 'moment/locale/ru';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMainTheme } from '../Common/Themes';
import snackbarService from '../Services/SnackbarService';
import userService from '../Services/UserService';
import BaseProgress from './Common/BaseProgress';
import AppRouter from './Router';

const mainTheme = createMainTheme();
moment.locale('ru');
moment.relativeTimeRounding(Math.floor);
moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 7);
moment.relativeTimeThreshold('w', 4);
moment.relativeTimeThreshold('M', 12);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService.updateAuthorizationState().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      {snackbarService.getContainer()}
      {!loading ?
        <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
          <AppRouter />
        </BrowserRouter>
        :
        <BaseProgress />
      }
    </ThemeProvider>
  );
};

export default App;