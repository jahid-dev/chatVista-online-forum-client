import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from "react-icons/fa";
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";
import CommentSection from "./CommentSection";

import useAxiosPublic from "../../../hooks/useAxiosPublic";

const HomePostDetails = () => {
  const postDetails = useLoaderData();
  const axiosPublic = useAxiosPublic();

  const {
    postId,
    authorName,
    authorImg,
    postTitle,
    postImg,
    postDescription,
    tag,
    upVote,
    downVote,
    share,
    commentsCount,
    createdAt,
  } = postDetails;

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleUpvote = async () => {
    try {
      if (!isUpvoted) {
        await axiosPublic.post(`/posts/upvote/${postId}`);
        setIsUpvoted(true);
      }
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      if (!isDownvoted) {
        await axiosPublic.post(`/posts/downvote/${postId}`);
        setIsDownvoted(true);
      }
    } catch (error) {
      console.error("Error downvoting post:", error);
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

          {/* Comment section */}
          <CommentSection postId={postId} />

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
              <span className="text-sm">{commentsCount} Comments</span>
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
