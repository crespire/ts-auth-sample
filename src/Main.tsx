import {Container, AppBar, ButtonGroup, Button} from '@mui/material';
import React from 'react';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './provider/AuthProvider';

function Main() {
  const navigate = useNavigate();
  const {signOff, user} = useAuth();

  return (
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
                signOff().then(() => {
                  navigate('/');
                });
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
  );
}

export default Main;
