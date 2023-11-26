import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {


    const [isAdmin] = useAdmin();
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="bg-white text-white shadow-2xl w-full md:w-64 p-6 md:min-h-screen">
                <div className="flex items-center mb-8">
                    <img className="w-12 mr-2" src="https://i.ibb.co/NjF9Xrb/Adobe-Stock-3-Xfw-F5i-Vh-D.png" alt="" />
                    <span className="text-2xl font-bold text-black">chatVista</span>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-center text-black">Admin</h2>
                </div>
                <nav>
                    <ul className="text-center text-black">
                        {
                            isAdmin ? <>

                    <li>
                            <NavLink
                                to="/dashboard/adminProfile"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                               Admin Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/makeannouncement"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                                Make Announcement
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/manageusers"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                               Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/reportedcomments"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                              Reported Comments
                            </NavLink>
                        </li>

                            </> 

                            :


                            <>
                                <li>
                            <NavLink
                                to="/dashboard/myprofile"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                                My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/addpost"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                                Add Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/mypost"
                                className="block py-2 px-4 hover:bg-gray-500 rounded"
                                activeClassName="bg-blue-700"
                            >
                                My Post
                            </NavLink>
                        </li>
                            </>
                            
                        }
                        
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Add a top navbar if needed */}
                {/* <header className="bg-white shadow p-4"> */}
                    {/* Add any header content here */}
                {/* </header> */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
