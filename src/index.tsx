import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import {firebaseConfig} from './firebase';
import {initializeApp} from 'firebase/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserPage from './components/UserPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirebaseContext = createContext(app);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'userpage',
        element: <UserPage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <FirebaseContext.Provider value={app}>
        <App />
      </FirebaseContext.Provider>
    </RouterProvider>
  </React.StrictMode>
);
