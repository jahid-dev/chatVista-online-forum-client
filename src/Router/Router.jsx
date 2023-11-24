import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
      ],
    },
    {
      path:"dashboard",
      element: <Dashboard></Dashboard>,
      children:[
        {
          path:"myprofile",
          element:<MyProfile></MyProfile>,
        },
        {
          path:"addpost",
          element:<AddPost></AddPost>
        }
      ]
    }
  ]);

export default router;