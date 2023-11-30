import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import AdminRoute from "./AdminRoute";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ReportedComments from "../Pages/Dashboard/Admin/ReportedComments";
import HomePostDetails from "../components/MainSection/Post/HomePostDetails";


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
        {
          path: '/homepostdetails/:id',
          element: <HomePostDetails></HomePostDetails>,
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
      ],
    },
    {
      path:"dashboard",
      element: <Dashboard></Dashboard>,
      children:[
        //normal user routes
        {
          path:"myprofile",
          element:<MyProfile></MyProfile>,
        },
        {
          path:"addpost",
          element:<AddPost></AddPost>
        },
        {
          path:"mypost",
          element:<MyPost></MyPost>
        },

        //admin only routes

        {
          path: 'adminProfile',
          element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        },
        {
          path: 'makeannouncement',
          element:<AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
        },
        {
          path: 'manageusers',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'reportedcomments',
          element:<AdminRoute><ReportedComments></ReportedComments></AdminRoute>
        },
        
      ]
    }
  ]);

export default router;