import React, {useState, useEffect} from 'react';
import {Typography} from '@mui/material';
import {useAuth} from '../provider/AuthProvider';
import {Navigate} from 'react-router-dom';
import {getStorage, getDownloadURL, ref} from 'firebase/storage';

function UserPage() {
  const {user} = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const storage = getStorage();

  useEffect(() => {
    if (user) {
      const gsRef = ref(storage, `gs://authflow-89fd5.appspot.com/${user.uid}`);
      getDownloadURL(gsRef)
        .then(prom => {
          setImage(prom);
        })
        .catch(error => {
          console.error(error.message);
        });
    } else {
      console.log('User:', user);
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Typography>User Info.Email: {user?.email}</Typography>
          {image ? (
            <img
              style={{maxWidth: 300}}
              alt={`${user?.email}'s avatar`}
              src={image}
            />
          ) : (
            <Typography>No image found.</Typography>
          )}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
export default UserPage;
