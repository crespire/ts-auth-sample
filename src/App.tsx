import {Container, AppBar, ButtonGroup, Button} from '@mui/material';
import React from 'react';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <Container>
      <AppBar position="static">
        <ButtonGroup variant="text">
          <Button variant="outlined" color="secondary" href="/userpage">
            Home
          </Button>
          <Button variant="text" color="secondary" href="/">
            Sign In
          </Button>
          <Button variant="text" color="secondary" href="/signout">
            Sign Out
          </Button>
          <Button variant="text" color="secondary" href="/signup">
            Sign Up
          </Button>
        </ButtonGroup>
      </AppBar>
      <Outlet />
    </Container>
  );
}

export default App;
