import React, {useContext, useEffect} from 'react';
import {Typography} from '@mui/material';
import {AuthContext} from '..';
import {useNavigate} from 'react-router-dom';

// This is the auth'd page.
function UserPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      console.log(auth);
      console.log('No Auth found.');
      navigate('/');
    }
  }, []);
  console.log('User page');

  return <Typography>User Info. Email: {auth?.email}</Typography>;
}
export default UserPage;
