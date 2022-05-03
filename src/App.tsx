import { Route, Routes } from 'react-router-dom';
import MainLayout from './Components/Layouts/MainLayout';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import { ThemeProvider } from '@mui/material/styles';
import { createMainTheme } from './Common/Themes';

const mainTheme = createMainTheme();

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}