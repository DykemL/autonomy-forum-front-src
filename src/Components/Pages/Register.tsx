import React, { useState } from 'react';
import { Container, Box, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

class FormValidation {
  hasNameErrors: boolean = false;
  hasEmailErrors: boolean = false;
  hasPasswordErrors: boolean = false;
  hasPasswordRetypeErrors: boolean = false;
}

export default function Register() {
  const [validation, setValidation] = useState<FormValidation>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('userName'),
      password: data.get('password'),
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Регистрация</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField error={validation?.hasNameErrors} required fullWidth id="userName" name="userName" label="Логин" />
          <TextField error={validation?.hasEmailErrors} required sx={{ mt: 2 }} fullWidth id="email" name="email" label="Email" />
          <TextField error={validation?.hasPasswordErrors} required sx={{ mt: 2 }} fullWidth id="password" name="password" type="password" label="Пароль" />
          <TextField error={validation?.hasPasswordRetypeErrors} required sx={{ mt: 2 }} fullWidth id="password-retype" name="password-retype" type="password" label="Повторите пароль" />
          <LoadingButton loading={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Зарегистрироваться
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}