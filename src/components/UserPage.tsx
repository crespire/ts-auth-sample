import React, {useState, useEffect} from 'react';
import {Typography} from '@mui/material';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {getStorage, getDownloadURL, ref} from 'firebase/storage';

function UserPage() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [image, setImage] = useState<String | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    onAuthStateChanged(auth, firebaseuser => {
      if (firebaseuser) {
        setUser(firebaseuser);
        const gsRef = ref(
          storage,
          `gs://authflow-89fd5.appspot.com/${firebaseuser.uid}`
        );
        getDownloadURL(gsRef)
          .then(prom => {
            setImage(prom);
          })
          .catch(error => {
            console.error(`${error}`);
          });
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <>
      <Typography>User Info. Email: {user?.email}</Typography>
      {image && (
        <img
          style={{maxWidth: 300}}
          alt={`${user?.email}'s avatar`}
          src={image}
        />
      )}
    </>
  );
}
export default UserPage;
