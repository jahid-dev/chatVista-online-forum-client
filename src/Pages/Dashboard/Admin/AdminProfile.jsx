
// import PieChart from './PieChart'; // Import your PieChart component

import { useQuery } from "@tanstack/react-query";

import { Cell, Legend, Pie, PieChart } from "recharts";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'green', 'pink'];


const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['admin-stats', 'comments', 'posts', 'users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })
    if (isPending) {
        return <div className=" text-center"> Loading....</div>
    }
    refetch()
    const totalPosts = data?.posts;
    const totalComments = data?.comments;
    const totalUsers = data?.users;



    const chartData = [
        { name: 'Posts', value: totalPosts },
        { name: 'Comments', value: totalComments },
        { name: 'Users', value: totalUsers }
    ]


 
    // custom shap for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="container mx-auto  max-h-screen p-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Admin Profile Section */}
                <div className="flex flex-col items-center p-6 bg-blue-500 text-white">
                    {/* Admin Name, Image, Email */}
                    <div className="flex items-center justify-center mb-4">
                        <img src={user?.photoURL} alt="Admin Photo" className="w-20 h-20 rounded-full border-4 border-white" />
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                            <p>{user?.email}</p>
                        </div>
                    </div>

                    {/* Statistics: Number of Posts, Comments, Users */}
                    <div className="flex justify-around gap-5">
                        <div className="text-center">
                            <p className="text-lg font-semibold">{totalPosts}</p>
                            <p>Posts</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">{totalComments}</p>
                            <p>Comments</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">{totalUsers}</p>
                            <p>Users</p>
                        </div>
                    </div>
                </div>

                {/* Pie Chart Section */}
                <div className="bg-gray-100  flex justify-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>

                </div>

            
                <div className="p-6">
                    <form className="flex items-center">
                        <input
                            type="text"
                            placeholder="Add Tag"
                            className="rounded-l-md border border-gray-300 px-4 py-2 flex-1 focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Add</button>
                    </form>

                    {/* Display Tags */}
                    {/* You can display the added tags here */}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
