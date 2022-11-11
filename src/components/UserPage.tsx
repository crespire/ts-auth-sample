import React, {useState, useEffect} from 'react';
import {Typography} from '@mui/material';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

function UserPage() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, firebaseuser => {
      if (firebaseuser) {
        setUser(firebaseuser);
      } else {
        console.log('No Auth found.');
        navigate('/');
      }
    });
  }, []);

  return <Typography>User Info. Email: {user?.email}</Typography>;
}
export default UserPage;
