import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {firebaseConfig} from './firebase';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const FirebaseContext = createContext(app);

root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={app}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);
