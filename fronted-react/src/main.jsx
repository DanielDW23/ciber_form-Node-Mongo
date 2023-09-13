import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FormContact from './components/FormContact.jsx'
import FormLogin from './components/FormLogin.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormContact />
  },
  {
    path: "/entrando_al_tunel23",
    element: <FormLogin />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  </AuthProvider>
)
