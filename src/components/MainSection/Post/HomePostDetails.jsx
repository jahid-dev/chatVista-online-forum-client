import { useContext, useState } from "react";
import { Link,  useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from "react-icons/fa";
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";


import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";

const HomePostDetails = () => {
 
  const { user } = useContext(AuthContext);
  const commenterEmail = user?.email;
  const commenter = user?.displayName;
  const commenterImg = user?.photoURL;
  const commentTime = new Date();

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const {id} = useParams()
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: post,isPending:loading, refetch } = useQuery({
    queryKey: ["post"],
    queryFn: async() => {
      const res = await axiosSecure.get(`/posts/${id}`)
      return res.data;
    }
  })
if(loading){
  return <div>
    Loading....
  </div>
}
  console.log(post);
  let {
    _id,
    authorName,
    authorImg,
    postTitle,
    postImg,
    postDescription,
    tag,
    upVote,
    downVote,
    share,
    commentCount,
    createdAt,
  } = post;

 

  const handleUpvote = async () => {
    if (!isUpvoted) {
      if (isDownvoted) {
        setIsDownvoted(false);
        if (downVote > 0) {
          downVote--;
        }

      }
      upVote++;

      setIsUpvoted(true);
    } else {
      if (upVote > 0) {
        upVote--;
      }

      setIsUpvoted(false);
    }
    
    const res = await axiosSecure.patch(`/posts/update/${_id}`, { upVote, downVote });
    if (res?.data) {
      refetch()
    }

    
  };
  // handle dislike
  const handleDownvote = async () => {
    if (!isDownvoted) {
      if (isUpvoted) {
        setIsUpvoted(false);
        if (upVote > 0) {
          upVote--;
        }
      }
      downVote++;

      setIsDownvoted(true);
    } else {
      if (downVote > 0) {
        downVote--;
      }
      setIsDownvoted(false);
    }
    const res = await axiosSecure.patch(`/posts/update/${_id}`, { upVote, downVote });
    if (res?.data) {
      refetch()
    }
    
  };

  // Handle comment input change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handle comment submission
  const handleSubmitComment = async () => {
    if (comment.trim() === "") {
      // Handle empty comment submission
      return;
    }

    // Set isSubmitting to true to show loading state
    setIsSubmitting(true);

    try {
      // Make a POST request to your server API endpoint
      const response = await axiosSecure.post("/comments", {
        postTitle,
        commentText: comment,
        commenter,
        commenterImg,
        commenterEmail,
        commentTime: commentTime.toISOString(), // Convert commentTime to a string
      });

      // Assuming the server request is successful, you can reset the form
      setComment("");
      setIsSubmitting(false);
      console.log("Comment submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting comment", error);
      // Handle error, e.g., show an error message to the user
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card
        shadow={false}
        className="relative flex flex-col items-center justify-center w-full max-w-[40rem] overflow-hidden text-center"
        style={{
          backgroundImage: `url(${postImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12 text-white">
          {/* Author image and name */}
          <div className="author-details flex items-center">
            <Avatar
              size="sm"
              variant="circular"
              alt={authorName}
              className="border-2 border-white"
              src={authorImg}
            />
            <div className="ml-4">
              <Typography variant="h5" className="mb-2 text-gray-400">
                {authorName}
              </Typography>
              <Typography variant="h6" className="text-gray-400">
                Post Time: {createdAt}
              </Typography>
            </div>
          </div>

          {/* Post content */}
          <div className="post-content mt-4">
            <Typography
              variant="h2"
              color="white"
              className="mb-6 font-medium leading-[1.5]"
            >
              {postTitle}
            </Typography>
            <Typography variant="h5" className="mb-4 text-gray-400">
              Tag: {tag}
            </Typography>
          </div>

          {/* Post description without background opacity */}
          <div className="post-description p-4 rounded-lg my-4 text-white">
            <Typography variant="body1" className="mb-4">
              {postDescription}
            </Typography>
          </div>

          <div>
      {/* Comment field */}
      <div className="comment-field mt-4">
        <label htmlFor="comment" className="text-gray-400">
          Add your comment:
        </label>
        <textarea 
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          rows="4"
          placeholder="Type your comment here..."
        />
        <button
          onClick={handleSubmitComment}
          disabled={isSubmitting}
          className="btn btn-accent mt-2"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
      </div>
    </div>

          {/* Post actions */}
          <div className="post-actions flex items-center mt-4">
            {/* Like, Dislike, Comment, and Share buttons */}
            <div className="flex items-center mr-4" onClick={handleUpvote}>
              <FaThumbsUp className={`vote-icon mr-1 ${isUpvoted ? 'text-blue-500' : ''}`} />
              <span className="text-sm">{upVote} Likes</span>
            </div>
            <div className="flex items-center mr-4" onClick={handleDownvote}>
              <FaThumbsDown className={`vote-icon mr-1 ${isDownvoted ? 'text-red-500' : ''}`} />
              <span className="text-sm">{downVote} Dislikes</span>
            </div>
            <div className="flex items-center mr-4">
              <FaComment className="vote-icon mr-1" />
              <span className="text-sm">{commentCount} Comments</span>
            </div>
            <div className="flex items-center">
              <FaShare className="vote-icon mr-1" />
              <span className="text-sm">{share} Shares</span>
            </div>
          </div>
        </CardBody>
        <div className="mt-4">
          <Link to="/">
            <button className="btn w-full btn-accent">
              Go Back to Previous Page
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default HomePostDetails;
