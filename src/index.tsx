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
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserPage from './components/UserPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const FirebaseContext = createContext(app);
export const AuthContext = React.createContext<firebase.User | null>(null);
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
        <AuthContext.Provider value={auth}>
          <App />
        </AuthContext.Provider>
      </FirebaseContext.Provider>
    </RouterProvider>
  </React.StrictMode>
);
