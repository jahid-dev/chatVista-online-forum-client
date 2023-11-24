import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div>
                <NavLink to= "myprofile">My Profile</NavLink>
                <NavLink to= "addpost">Add Post</NavLink>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;