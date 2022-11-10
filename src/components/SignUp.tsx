import {Box, TextField} from '@mui/material';
import React, {useState} from 'react';
import useForm from '../hooks/useForm';

function SignUp() {
  const {values, errors, handleChange, handleSubmit} = useForm();

  return (
    <Box component="form">
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="standard"
        onChange={handleChange}
        value={values['email'] || ''}
      ></TextField>
    </Box>
  );
}

export default SignUp;
