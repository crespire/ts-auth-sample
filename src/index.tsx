import React from 'react';
import ReactDOM from 'react-dom/client';
import {firebaseConfig} from './firebase';
import {initializeApp} from 'firebase/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserPage from './components/UserPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import App from './App';
import {AuthProvider} from './provider/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
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
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
