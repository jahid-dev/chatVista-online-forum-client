import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";



const useComments = (postId) => {
    const axiosSecure = useAxiosSecure();
    const { data: comments, isPending: commentsLoading,  refetch: commentRefetch  } = useQuery({
        queryKey: ['postId',postId],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res?.data
        }
    })
    const totalComments = comments?.length;

    return {comments, commentsLoading, commentRefetch, totalComments};
};

export default useComments;