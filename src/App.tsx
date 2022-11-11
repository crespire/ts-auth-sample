import {Container, AppBar, ButtonGroup, Button} from '@mui/material';
import React, {useState, useEffect, useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {FirebaseContext} from '.';
import {getAuth} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

export const AuthContext = React.createContext<firebase.User | null>(null);

function App() {
  const app = useContext(FirebaseContext);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <Container>
        <AppBar position="static">
          <ButtonGroup variant="text">
            <Button variant="outlined" color="secondary" href="/userpage">
              Home
            </Button>
            {user === null && (
              <Button variant="text" color="secondary" href="/">
                Sign In
              </Button>
            )}
            {user && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  {
                    auth.signOut().then(() => {
                      navigate('/');
                    });
                  }
                }}
              >
                Sign Out
              </Button>
            )}
            <Button variant="text" color="secondary" href="/signup">
              Sign Up
            </Button>
          </ButtonGroup>
        </AppBar>
        <Outlet />
      </Container>
    </AuthContext.Provider>
  );
}

export default App;
