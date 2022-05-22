import { LoadingButton } from '@mui/lab';
import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../Api/Api';
import { useField } from '../../Hooks/useField';
import snackbarService from '../../Services/SnackbarService';
import userService from '../../Services/UserService';

function Login() {
  const userName = useField('', { isEmpty: true });
  const password = useField('', { isEmpty: true });

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setWasSubmitted(false);
    if (!wasSubmitted || !validateForm()) {
      return;
    }

    setLoading(true);
    Api.auth.login({ userName: userName.value, password: password.value }).then(result => {
      setLoading(false);
      if (!result.ensureSuccess()) {
        snackbarService.push('Ошибка авторизации', 'error');
        return;
      }

      userService.updateAuthorizationState();
      navigate('/');
    });
  }, [wasSubmitted])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userName.startValidation();
    password.startValidation();
    setWasSubmitted(true);
  };

  const validateForm = () : boolean => {
    if (userName.validation.hasErrors || password.validation.hasErrors) {
      return false;
    }

    return true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Вход</Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3, width: '100%' }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <TextField id="userName" name="userName" label="Логин"
              onChange={userName.onChange}
              onBlur={() => userName.startValidation()}
              error={userName.validation.hasErrors}
              required fullWidth />
            <TextField id="password" name="password" type="password" label="Пароль"
              onChange={password.onChange}
              onBlur={() => password.startValidation()}
              error={password.validation.hasErrors}
              required fullWidth />
          </Stack>
          <LoadingButton loading={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Войти
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;