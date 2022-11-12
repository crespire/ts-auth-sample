import React from 'react';
import Main from './Main';
import {AuthProvider} from './provider/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
