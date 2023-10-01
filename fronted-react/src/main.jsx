import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FormContact from './components/FormContact.jsx'
import FormLogin from './components/FormLogin.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './components/Dashboard'
import RouteGuard from './components/RouteGuard'

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

// const router = createBrowserRouter([
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
          <Route path="/dashboard" element={<RouteGuard><Dashboard /></RouteGuard>} />
        </Routes>
      </BrowserRouter >
    </React.StrictMode>
  </AuthProvider>
)
