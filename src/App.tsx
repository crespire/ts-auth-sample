import {Container, AppBar, ButtonGroup, Button} from '@mui/material';
import React from 'react';

function App() {
  return (
    <Container>
      <AppBar>
        <ButtonGroup variant="text">
          <Button variant="outlined" color="secondary">
            Home
          </Button>
          <Button variant="text" color="secondary">
            Sign In
          </Button>
          <Button variant="text" color="secondary">
            Sign Out
          </Button>
          <Button variant="text" color="secondary">
            Sign Up
          </Button>
        </ButtonGroup>
      </AppBar>
    </Container>
  );
}

export default App;
