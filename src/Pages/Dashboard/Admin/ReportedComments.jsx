import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure()
    const { data: comments, isPending } = useQuery({
        queryKey: ['repotedComments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/comments')
            return res.data
        }
    })

    if (isPending || !comments) {
        return <div className=" text-center">Loading...</div>
    }

   console.log(comments);
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-8 mb-4">Reported Activities/Comments</h1>

            <div className="bg-white shadow-md rounded my-6">
                {/* Individual reported item */}
                {
                    comments?.map(comment => <div key={comment._id} className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">Report: { comment.feedback }</h2>
                                    <p className="text-gray-500">Reported by: {comment.reportedBy}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Warn User</button>
                                     <Link to = {`/homepostdetails/${comment.postId}`}><button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View Content</button></Link>
                                </div>
                            </div>
                            <p className="text-gray-700 mt-2">
                              {comment.commentText}
                            </p>
                        </div>

                    )
                }
            </div>
        </div>

    );
};

export default ReportedComments;