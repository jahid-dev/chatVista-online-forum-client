
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { FacebookShareButton } from 'react-share';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import useSearch from "../../../Hooks/useSearch";
import useComments from "../../../Hooks/useComments";
import useDate from "../../../hooks/useDate";



const HomePostDetails = () => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const { setSearchTag } = useSearch()
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const currentDateTime = useDate();
    const axiosSecure = useAxiosSecure();
    const shareUrl = window.location.href;
    // getting post data
    const { data: post, isPending, refetch } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${id}`);
            return res?.data
        }
    });

    const { comments, commentsLoading, commentRefetch } = useComments(id);
    // handle loading
    if (isPending || commentsLoading) {
        return <p className=" text-center">Loading...</p>
    }
    let { _id, authorName, authorImg, postTitle, postDescription, tag, postImg, postTime, upVote, downVote } = post;
   

    const totalComments = comments?.length;
    // handle comments
    const handleShowComments = () => {
        setShowCommentInput(!showCommentInput);

    };

    // handle comment submuit
    const handleCommentSubmit = async (data) => {
        const comment = data.comment;
       
        const commentInfo = {
            postId: _id,
            commentText: comment,
            commenterName: user?.displayName,
            commenterImg: user?.photoURL,
            commenterEmail: user?.email,
            commentTime: currentDateTime
        }
        const pushComment = await axiosSecure.post(`/comments`, commentInfo)
      
        if (pushComment?.data._id) {
            commentRefetch()
            reset();
        }
    }

    // handle like
    const handleLikeButton = async (id) => {
        if (!liked) {
            if (disliked) {
                setDisliked(false);
                if (downVote > 0) {
                    downVote--;
                }

            }
            upVote++;

            setLiked(true);
        } else {
            if (upVote > 0) {
                upVote--;
            }

            setLiked(false);
        }
        const res = await axiosSecure.patch(`/posts/update/${id}`, { upVote, downVote });
        if (res?.data) {
            refetch()
        }

      
    };
    // handle dislike
    const handleDislikeButton = async (id) => {
        if (!disliked) {
            if (liked) {
                setLiked(false);
                if (upVote > 0) {
                    upVote--;
                }
            }
            downVote++;

            setDisliked(true);
        } else {
            if (downVote > 0) {
                downVote--;
            }
            setDisliked(false);
        }
        const res = await axiosSecure.patch(`/posts/update/${id}`, { upVote, downVote });
        if (res?.data) {
            refetch()
        }
        
    };

    return (
        <div className="container mx-auto   w-11/12 md:w-2/3 lg:w-1/2  py-8 my-3">
            {post ? (
                <div className="bg-white p-6 shadow-md">
                    <div>
                        <div className=" flex flex-row gap-2 items-center">
                            <img src={authorImg} alt="" className=" w-16 rounded-full " />
                            <span>
                                <span className=" text-2xl font-bold ">{authorName}</span>
                                <p className=" text-sm">{postTime}</p>
                            </span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{postTitle}</h1>
                    {
                        <p>{postDescription}</p>
                    }
                    <button onClick={() => setSearchTag(tag)} className=" text-blue-600 underline"> #{tag}</button>
                    <img src={postImg} alt="" className=" h-[350px] w-full" />
                    <div className=' flex justify-between mx-1'>

                        <div>
                            <button onClick={() => handleLikeButton(_id)} className={`hover:btn hover:btn-sm ${liked ? 'bg-blue-500 text-white px-3 my-1 ' : ''}`}>
                                Like ({upVote})
                            </button>
                        </div>
                        <div>
                            <button onClick={() => handleDislikeButton(_id)} className={`hover:btn hover:btn-sm ${disliked ? 'bg-blue-500 text-white px-3 my-1' : ''}`}>
                                Dislike ({downVote})
                            </button>
                        </div>
                        <button onClick={handleShowComments} className=" hover:btn hover:btn-sm ">Comment {totalComments ? `(${totalComments})` : ''}</button>
                        <FacebookShareButton url={shareUrl} className=" hover:btn  hover:btn-sm">Share</FacebookShareButton>
                    </div>
                    {
                        showCommentInput && <div>
                            <form onSubmit={handleSubmit(handleCommentSubmit)} className=" my-2">
                                <input
                                    type="text"
                                    // name ='comment'
                                    {...register('comment')}
                                    className=" w-[85%] py-1"
                                    placeholder="Type your comment here..."
                                />
                                <button type="submit" className=" bg-blue-500 text-white px-2 py-1 rounded-lg ml-2" >Send  </button>
                            </form>
                            <div>
                                {comments?.map(comment => (
                                    <div key={comment._id} className="bg-gray-100 p-4 rounded-md my-4">
                                        <div className=" flex items-center gap-2">
                                            <img src={comment.commenterImg} className=" w-10 rounded-full " alt="" />
                                            <span>
                                                <p>{comment.commenterName}</p>
                                                <p className="  text-sm text-gray-500">{comment.commentTime}</p>
                                            </span>
                                        </div>
                                        <p className="text-center text-gray-700">{comment.commentText}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    }
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HomePostDetails;