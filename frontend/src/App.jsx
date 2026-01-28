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
import AdminUsers from './components/AdminComponents/AdminUsers';
import AdminContact from './components/AdminComponents/AdminContact';
import AdminSetting from './components/AdminComponents/AdminSetting';
import AdminBookings from './components/AdminComponents/AdminBookings';
import AdminOverview from './components/AdminComponents/AdminOverview';
import { ProtectedRoute } from './components/ProtectedRoute';

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
    { path: '/user/dashboard', element: <ProtectedRoute><UserDashboard /></ProtectedRoute> },

    // Admin routes with nested children
    {
      path: '/admin',
      element: <ProtectedRoute adminOnly={true}><GymAdminDashboard /></ProtectedRoute>,
      children: [
        { index: true, element: <AdminOverview /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'bookings', element: <AdminBookings /> },
        { path: 'contacts', element: <AdminContact /> },
        { path: 'settings', element: <AdminSetting /> },
      ]
    },
    { path: '/adminpanel', element: <GymAdminDashboard /> },
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