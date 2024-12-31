import { createBrowserRouter } from "react-router-dom";
import Main from '../pages/main'
import Home from "../pages/Home";
import Mall from "../pages/Mall";
import User from "../pages/User";
import PageOne from "../pages/Other/pageOne";
import PageTwo from "../pages/Other/pageTwo";

const routes = [
    {
        path: '/',
        element: <Main/>,
        children: [
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
    }
]

export default createBrowserRouter(routes)