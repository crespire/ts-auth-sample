import {Box, TextField, Button} from '@mui/material';
import React, {useContext} from 'react';
import useForm from '../hooks/useForm';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {AuthContext} from '..';
import {FirebaseContext} from '..';
import {useNavigate} from 'react-router-dom';

function SignUp() {
  let user = useContext(AuthContext);
  const app = useContext(FirebaseContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const {values, errors, handleChange, handleSubmit} = useForm(makeUser);

  function makeUser() {
    createUserWithEmailAndPassword(auth, values['email'], values['pass'])
      .then(userCredential => {
        user = userCredential.user;
        navigate('/userpage');
      })
      .catch(error => {
        console.error(`${error.code}, ${error.message}`);
      });
  }

  return (
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
      <TextField
        id="passconf"
        name="passconf"
        label="Password Confirmation"
        type="password"
        variant="standard"
        required={true}
        onChange={handleChange}
        error={errors['passconf']}
        helperText={errors['passconf'] || null}
        value={values['passconf'] || ''}
      ></TextField>
      <Button onClick={handleSubmit}>Sign Up!</Button>
    </Box>
  );
}

export default SignUp;
