import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FacebookShareButton } from "react-share";
import PropTypes from 'prop-types';
import useComments from "../../../Hooks/useComments";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDate from "../../../hooks/useDate";

const RecentPosts = ({post, reload}) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const { register, handleSubmit, reset } = useForm()
    const { user } = useContext(AuthContext);
    const currentDateTime = useDate();
    const axiosSecure = useAxiosSecure();
    const shareUrl = window.location.href;
   
    // getting comments of this post 
    const { comments, commentsLoading, commentRefetch, totalComments } = useComments(post._id);

    // handle loading
    if ( commentsLoading) {
        return <p className=" text-center">Loading...</p>
    }
    let { _id, authorName, authorImg, postTitle, postDescription, tag, postImg, postTime, upVote, downVote } = post;

  
    // handle comments
    const handleShowComments = () => {
        setShowCommentInput(!showCommentInput);

    };
   
    // handle comment submuit
    const handleCommentSubmit = async (data) => {
        const comment = data.comment;
        console.log('comment: ', comment);
        const commentInfo = {
            postId: _id,
            commentText: comment,
            commenterName: user?.displayName,
            commenterImg: user?.photoURL,
            commenterEmail: user?.email,
            commentTime: currentDateTime
        }
        const pushComment = await axiosSecure.post(`/comments`, commentInfo)
        console.log(pushComment?.data);
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
            await reload();
            setLiked(true);

        } else {
            if (upVote > 0) {
                upVote--;
            }

            setLiked(false);
        }
        const res = await axiosSecure.patch(`/posts/update/${id}`, { upVote, downVote });
        if (res?.data) {
          reload();
        }

        console.log(`Upvotes: ${upVote}, Downvotes: ${downVote}`);
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
            reload();
            setDisliked(true);
        } else {
            if (downVote > 0) {
                downVote--;
            }
            setDisliked(false);
        }
        const res = await axiosSecure.patch(`/posts/update/${id}`, { upVote, downVote });
        if (res?.data) {
          reload();
        }
        console.log(`Upvotes: ${upVote}, Downvotes: ${downVote}`);
    };

    return (
        <div>
             
            <div  className="container mx-auto   w-11/12 md:w-2/3 lg:w-1/2  py-8 my-3">

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
                <h1 className="text-2xl font-bold mb-4">{postTitle}</h1>
                {
                  <p>{postDescription}</p>
                }
                <p>{tag}</p>
                <img src={postImg} alt="" className=" h-[350px] w-full" />
                <div className=' flex justify-between mx-1'>
                  <button onClick={() => handleLikeButton(_id)} className={`hover:btn hover:btn-sm ${liked ? 'bg-blue-500 text-white px-3 my-1 ' : ''}`}>
                    Like ({upVote})
                  </button>
                  <button onClick={() => handleDislikeButton(_id)} className={`hover:btn hover:btn-sm ${disliked ? 'bg-blue-500 text-white px-3 my-1' : ''}`}>
                    Dislike ({downVote})
                  </button>
                  <button onClick={handleShowComments} className=" hover:btn hover:btn-sm ">Comment { totalComments ? `(${totalComments})` : '' }</button>
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

            </div>
          
        </div>
    );
};

RecentPosts.propTypes = {
  reload: PropTypes.func
}


export default RecentPosts;