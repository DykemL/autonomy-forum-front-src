import { FormEvent, useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useField } from '../../Hooks/useField';
import Api from '../../Api/Api';
import { observer } from 'mobx-react-lite';
import snackbarService from '../../Services/SnackbarService';
import { useNavigate } from 'react-router-dom';
import userService from '../../Services/UserService';

function Register() {
  const userName = useField('', { isEmpty: true });
  const email = useField('', { isEmpty: true });
  const password = useField('', { isEmpty: true });
  const passwordRetype = useField('', { isEmpty: true, sameValue: password.value });

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setWasSubmitted(false);
    if (!wasSubmitted || !validateForm()) {
      return;
    }

    setLoading(true);
    Api.auth.register({ userName: userName.value, email: email.value, password: password.value }).then(result => {
      if (!result.ensureSuccess()) {
        setLoading(false);
        result.code && snackbarService.push(result.body?.message ?? 'Ошибка при регистрации', 'error');
        return;
      }

      Api.auth.login({ userName: userName.value, password: password.value }).then(result => {
        setLoading(false);
        if (!result.ensureSuccess()) {
          snackbarService.push('Ошибка при авторизации после успешной регистрации', 'error');
          return;
        }

        snackbarService.push('Регистрация прошла успешно', 'success');
        userService.updateAuthorizationState();
        navigate('/');
      });
    });
  }, [wasSubmitted])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userName.startValidation();
    email.startValidation();
    password.startValidation();
    passwordRetype.startValidation();
    setWasSubmitted(true);
  };

  const validateForm = () : boolean => {
    if (userName.validation.hasErrors || email.validation.hasErrors || password.validation.hasErrors || passwordRetype.validation.hasErrors) {
      return false;
    }

    return true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Регистрация</Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3, width: '100%' }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <TextField id="userName" name="userName" label="Логин"
              onChange={userName.onChange}
              onBlur={() => userName.startValidation()}
              error={userName.validation.hasErrors}
              required fullWidth />
            <TextField id="email" name="email" label="Email"
              onChange={email.onChange}
              onBlur={() => email.startValidation()}
              error={email.validation.hasErrors}
              required fullWidth />
            <TextField id="password" name="password" type="password" label="Пароль"
              onChange={password.onChange}
              onBlur={() => password.startValidation()}
              error={password.validation.hasErrors}
              required fullWidth />
            {!passwordRetype.validation.isSameValue && <Alert severity="error">Пароли должны совпадать</Alert>}
            <TextField id="passwordRetype" name="passwordRetype" type="password" label='Повторите пароль'
              onChange={passwordRetype.onChange}
              onBlur={() => passwordRetype.startValidation()}
              error={passwordRetype.validation.hasErrors}
              required fullWidth />
          </Stack>
          <LoadingButton loading={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}

export default observer(Register);