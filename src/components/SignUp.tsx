import {Box, TextField, Button, Typography} from '@mui/material';
import React, {useContext, useState, useRef} from 'react';
import useForm from '../hooks/useForm';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {AuthContext} from '../App';
import {FirebaseContext} from '..';
import {useNavigate} from 'react-router-dom';
import {getStorage, ref, uploadBytes} from 'firebase/storage';

function SignUp() {
  let user = useContext(AuthContext);
  const app = useContext(FirebaseContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const storage = getStorage(app);
  const {values, errors, handleChange, handleSubmit} = useForm(makeUser);
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const handleFileSelect = event => {
    setFile(event?.target?.files?.[0]);
  };

  function makeUser() {
    createUserWithEmailAndPassword(auth, values['email'], values['pass'])
      .then(userCredential => {
        user = userCredential.user;
        const storageRef = ref(storage, user.uid);
        uploadBytes(storageRef, file);

        navigate('/userpage');
      })
      .catch(error => {
        console.error(`${error.code}, ${error.message}`);
      });
  }

  return (
    <>
      <Typography>Sign Up</Typography>
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
        <Button variant="contained" component="label">
          Upload
          <input
            ref={fileRef}
            hidden
            name="ava"
            id="ava"
            accept="image/*"
            type="file"
            onChange={handleFileSelect}
          />
        </Button>
        <Button onClick={handleSubmit}>Sign Up!</Button>
      </Box>
    </>
  );
}

export default SignUp;
