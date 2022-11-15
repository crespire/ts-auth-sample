import {Typography, Box, Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm';
import {useAuth} from '../provider/AuthProvider';

function SignIn() {
  const {signIn, user} = useAuth();
  const navigate = useNavigate();
  const {values, errors, handleChange, handleSubmit} = useForm(doLogin);

  function doLogin() {
    signIn(values['email'], values['pass'])
      .then(() => {
        console.log('User logged in.');
      })
      .catch(error => {
        console.error(`${error.code}: ${error.message}`);
      });
  }

  useEffect(() => {
    if (user) {
      navigate('/userpage');
    }
  }, [user]);

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
