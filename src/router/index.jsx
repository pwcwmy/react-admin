import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from '../pages/main'
import Home from "../pages/Home";
import Mall from "../pages/Mall";
import User from "../pages/User";
import PageOne from "../pages/Other/pageOne";
import PageTwo from "../pages/Other/pageTwo";
import Login from "../pages/Login"

const routes = [
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Navigate to='home' replace />
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'mall',
                element: <Mall/>
            },
            {
                path: 'user',
                element: <User/>,
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        element: <PageOne/>,
                    },
                    {
                        path: 'pageTwo',
                        element: <PageTwo/>,
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    }
]

export default createBrowserRouter(routes)