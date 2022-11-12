import {Typography, Box, Button, TextField} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm';
import {useAuth} from '../provider/AuthProvider';

// This is the auth'd page.
function SignIn() {
  const {signIn} = useAuth();
  const navigate = useNavigate();
  const {values, errors, handleChange, handleSubmit} = useForm(doLogin);
  function doLogin() {
    signIn(values['email'], values['pass'])
      .then(() => {
        navigate('/userpage');
      })
      .catch(error => {
        console.error(`${error.code}: ${error.message}`);
      });
  }

  return (
    <>
      <Typography>Login</Typography>
      <Box component="form">
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="standard"
          required={true}
          onChange={handleChange}
          error={errors['email']}
          helperText={errors['email'] || null}
          value={values['email'] || ''}
        ></TextField>
        <TextField
          id="pass"
          name="pass"
          label="Password"
          type="password"
          variant="standard"
          required={true}
          onChange={handleChange}
          error={errors['pass']}
          helperText={errors['pass'] || null}
          value={values['pass'] || ''}
        ></TextField>
        <Button onClick={handleSubmit}>Login</Button>
      </Box>
    </>
  );
}
export default SignIn;
