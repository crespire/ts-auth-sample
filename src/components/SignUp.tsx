import {Box, TextField, Button, Typography} from '@mui/material';
import React, {useState, useRef} from 'react';
import useForm from '../hooks/useForm';
import {app} from '../index';
import {useAuth} from '../provider/AuthProvider';
import {useNavigate} from 'react-router-dom';
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage';

function SignUp() {
  const {signUp} = useAuth();
  const navigate = useNavigate();
  const storage = getStorage(app);
  const {values, errors, handleChange, handleSubmit} = useForm(makeUser);
  const [file, setFile] = useState<ArrayBuffer | null>(null);
  const fileRef = useRef();
  const handleFileSelect = event => {
    setFile(event?.target?.files?.[0]);
  };

  function makeUser() {
    signUp(values['email'], values['pass'])
      .then(userCredential => {
        const user = userCredential.user;
        const storageRef = ref(storage, user.uid);

        if (file) {
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            snapshot => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            error => {
              console.error(`Error: ${error}`);
            },
            () => {
              navigate('/userpage');
            }
          );
        }
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
