import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CommentSection = ({ postId }) => {
  const axiosPublic = useAxiosPublic();

  // State for handling comments
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useContext(AuthContext);
  const commenterEmail = user?.email;
  const commenter = user?.displayName;
  const commenterImg = user?.photoURL;
  const commentTime = new Date(); // Add commentTime (assuming you want to include it)

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
      const response = await axiosPublic.post("/comments", {
        postId,
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
  );
};

export default CommentSection;
