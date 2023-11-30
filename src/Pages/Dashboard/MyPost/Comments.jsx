import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";

const Comments = () => {
    const [feedbackValues, setFeedbackValues] = useState({});
    const [ readMore , setReadMore ] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { data: comments = [], isPending } = useQuery({
        queryKey: ['postId', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${id}`);
            console.log(res.data);
            return res.data
        }
    })
    if (isPending || !comments) {
        return <div className=" text-center h-screen my-auto">Loading...</div>;
    }

    const handleChangeFeedback = (commentId, options) => {
        setFeedbackValues({
            ...feedbackValues,
            [commentId]: options
        });
    };

    const handleReport = async (commentId) => {
        const feedback = feedbackValues[commentId] || "";
        const res = await axiosSecure.patch(`/comments/${commentId}`, {feedback});
        if(res.data.modifiedCount > 0 ){
            setFeedbackValues('')
        }
    };

    const handleReadComment = () => {
        setReadMore(!readMore)
        console.log(readMore);
    }

    return (
        <div>
            <div className=" flex  justify-center my-">

                <h2 className=" text-3xl">Total comments: {comments.length}</h2>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Commenter Email</th>
                            <th>Comment text</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            comments?.map((comment, index) => <tr key={comment._id}>
                                <th>{index + 1}</th>
                                <td> {comment?.commenterEmail}</td>
                                <td>
                                    { comment.commentText.length <= 20 ?  comment.commentText
                                     : 
                                      <div>
                                       { readMore? `${comment.commentText} ` :  `${comment.commentText.slice(0,20)} `}

                                       <button className=" text-gray-500" onClick={handleReadComment}> { readMore ? ' Less' : ' Read More' } </button>
                                      </div>
                                     }
                               </td>
                                <td>
                                    <select name="feedback"
                                        onChange={(e) => handleChangeFeedback(comment._id, e.target.value)}
                                        value={feedbackValues[comment._id] || ""}
                                    >
                                        <option value="">Select feedback</option>
                                        <option value="positive">Positive</option>
                                        <option value="neutral">Neutral</option>
                                        <option value="negative">Negative</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        disabled={!feedbackValues[comment._id]}
                                        onClick={() => handleReport(comment._id)}
                                        className="btn btn-sm "
                                    >
                                        Report
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;