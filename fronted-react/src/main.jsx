import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FormContact from './components/FormContact.jsx'
import FormLogin from './components/FormLogin.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import User_dashboard from './components/User_dashboard'
import Admin_dashboard from './components/Admin_dashboard'
import RouteGuard from './components/RouteGuard'

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

// const router = createBrowserRouter([a
//   {
//     path: "/",
//     element: <FormContact />
//   },
//   {
//     path: "/entrando_al_tunel23",
//     element: <FormLogin />
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />
//   },
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormContact />} />
          <Route path="/entrando_al_tunel23" element={<FormLogin />} />
          <Route path="/user_dashboard" element={<RouteGuard><User_dashboard/></RouteGuard>} />
          <Route path="/admin_dashboard" element={<RouteGuard><Admin_dashboard/></RouteGuard>} />
        </Routes>
      </BrowserRouter >
    </React.StrictMode>
  </AuthProvider>
)
