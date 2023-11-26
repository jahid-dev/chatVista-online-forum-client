import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        try {
            setLoading(true);

            // Optimistic update
            queryClient.setQueryData(['users'], (oldData) => {
                return oldData.map((u) =>
                    u._id === user._id ? { ...u, role: 'admin' } : u
                );
            });

            await axiosSecure.patch(`/users/admin/${user._id}`);
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            // Handle error, revert optimistic update if needed
            console.error("Error making admin:", error);
            queryClient.invalidateQueries(['users']);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            setLoading(true);

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                // Optimistic update
                queryClient.setQueryData(['users'], (oldData) =>
                    oldData.filter((u) => u._id !== user._id)
                );

                await axiosSecure.delete(`/users/${user._id}`);
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            // Handle error, revert optimistic update if needed
            console.error("Error deleting user:", error);
            queryClient.invalidateQueries(['users']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-3xl mb-4 text-center">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-collapse border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border text-center align-middle">No.</th>
                            <th className="py-2 px-4 border text-center align-middle">Name</th>
                            <th className="py-2 px-4 border text-center align-middle">Email</th>
                            <th className="py-2 px-4 border text-center align-middle">Role</th>
                            <th className="py-2 px-4 border text-center align-middle">Subscription Status (Membership)</th>
                            <th className="py-2 px-4 border text-center align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border text-center align-middle">{index + 1}</td>
                                <td className="py-2 px-4 border text-center align-middle">{user.name}</td>
                                <td className="py-2 px-4 border text-center align-middle">{user.email}</td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    {user.role === 'admin' ? 'Admin' : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-orange-500 text-white py-1 px-2 rounded"
                                            disabled={loading}
                                        >
                                            <FaUsers className="text-2xl"></FaUsers>
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    {/* Add Subscription Status (Membership) field */}
                                    {user.membershipStatus ? 'Active' : 'Inactive'}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="text-red-600"
                                        disabled={loading}
                                    >
                                        <FaTrashAlt className="text-2xl"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ManageUsers;
