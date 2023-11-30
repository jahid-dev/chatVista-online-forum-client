import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPost = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: posts = [], isPending, refetch } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/myposts/${user?.email}`);
            return res.data;
        },
    });

    if (isPending || !posts) {
        return <div className="text-center my-16">Loading...</div>;
    }

    const handleDeletePost = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`posts/myposts/delete/${id}`).then((res) => {
                    if (res.data)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your post has been deleted.",
                            icon: "success",
                        });
                    refetch();
                });
            }
        });
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-collapse border-gray-300">
                    {/* Head */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border text-center">No.</th>
                            <th className="py-2 px-4 border text-center">Post Title</th>
                            <th className="py-2 px-4 border text-center">Likes</th>
                            <th className="py-2 px-4 border text-center">Dislikes</th>
                            <th className="py-2 px-4 border text-center">Shares</th>
                            <th className="py-2 px-4 border text-center">Comments</th>
                            <th className="py-2 px-4 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Rows */}
                        {posts.map((post, index) => (
                            <tr
                                key={post._id}
                                className={index % 2 === 0 ? "bg-gray-50" : ""}
                            >
                                <td className="py-2 px-4 border text-center align-middle">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    {post.postTitle}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    {post.upVote}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    {post.downVote}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    {post.share}
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    <Link to={`/dashboard/allComments/${post._id}`}>
                                        <button className="btn btn-sm text-black hover:bg-blue-700">
                                            Comment
                                        </button>
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border text-center align-middle">
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="btn btn-ghost btn-lg text-red-600"
                                    >
                                        <FaTrashAlt />
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

export default MyPost;
