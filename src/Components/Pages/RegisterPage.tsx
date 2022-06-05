import { FormEvent, useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useField } from '../../Hooks/useField';
import Api from '../../Api/Api';
import { observer } from 'mobx-react-lite';
import snackbarService from '../../Services/SnackbarService';
import { useNavigate } from 'react-router-dom';
import userService from '../../Services/UserService';

function RegisterPage() {
  const userName = useField('', { isNotEmpty: true });
  const email = useField('', { isNotEmpty: true });
  const password = useField('', { isNotEmpty: true });
  const passwordRetype = useField('', { isNotEmpty: true, sameValue: password.value });

  const [isUserNameAlreadyExists, setIsUserNameAlreadyExists] = useState(false);

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
        userService.login(result.body!);
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
    if (userName.validation.hasErrors || email.validation.hasErrors || password.validation.hasErrors || passwordRetype.validation.hasErrors || isUserNameAlreadyExists) {
      return false;
    }

    return true;
  }

  const checkUserNameAlreadyExists = async () => {
    const result = await Api.users.isUserNameExists(userName.value!);
    if (result.body == true) {
      setIsUserNameAlreadyExists(true);
      return;
    }

    setIsUserNameAlreadyExists(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Регистрация</Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3, width: '100%' }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {isUserNameAlreadyExists && <Alert severity="error">Такое имя пользователя уже существует</Alert>}
            <TextField id="userName" name="userName" label="Логин"
              onChange={userName.onChange}
              onBlur={() => {
                userName.startValidation();
                checkUserNameAlreadyExists();
              }}
              error={userName.validation.hasErrors || isUserNameAlreadyExists}
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

export default observer(RegisterPage);