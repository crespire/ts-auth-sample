import React from 'react';
import {Container, AppBar, ButtonGroup, Button} from '@mui/material';
import {NavLink, useNavigate, Outlet} from 'react-router-dom';
import {useAuth} from './provider/AuthProvider';

function App() {
  const navigate = useNavigate();
  const {signOff, user} = useAuth();

  return (
    <Container>
      <AppBar position="static">
        <ButtonGroup variant="text">
          <Button
            component={NavLink}
            variant="outlined"
            color="secondary"
            to="/userpage"
          >
            Home
          </Button>
          {user === null && (
            <Button component={NavLink} variant="text" color="secondary" to="/">
              Sign In
            </Button>
          )}
          {user && (
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                signOff().then(() => {
                  navigate('/');
                });
              }}
            >
              Sign Out
            </Button>
          )}
          <Button
            component={NavLink}
            variant="text"
            color="secondary"
            to="/signup"
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </AppBar>
      <Outlet />
    </Container>
  );
}

export default App;
