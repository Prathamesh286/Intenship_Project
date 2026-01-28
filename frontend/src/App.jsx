// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Contactpage from './pages/Contactpage';
import Course from './pages/Course';
import Ourteam from './pages/Ourteam';
import GalleryPage from './pages/GalleryPage';
import BecomeaMember from './pages/BecomeaMember';
import UserDashboard from './pages/Userdashboard';
import Membership from './pages/Membership';
import GymAdminDashboard from './pages/Adminpanel';

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Signup /> },
    { path: '/login', element: <Login /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contactpage /> },
    { path: '/course', element: <Course /> },
    { path: '/gallery', element: <GalleryPage /> },
    { path: '/ourteam', element: <Ourteam /> },
    { path: '/becomeamember', element: <BecomeaMember /> },
    { path: '/membership', element: <Membership /> },

    // Protected routes
    // { path: '/admin/dashboard', element: <GymAdminDashboard /> },
    { path: '/admin', element: <GymAdminDashboard /> },
    { path: '/user/dashboard', element: <UserDashboard /> },
    {path: '/adminpanel', element: <GymAdminDashboard />},
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;