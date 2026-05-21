import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/signin", element: <SignIn />},
    {path: "/signup", element: <SignUp />},
    {path: "/dashboard", element: <Dashboard />}
    
])