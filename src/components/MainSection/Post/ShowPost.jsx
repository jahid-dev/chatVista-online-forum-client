
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa'; 

const ShowPost = ({ post }) => {
    console.log(post);
  const {
    authorName,
    authorImg,
    postTitle,
    postTime,
    postImg,
    postDescription,
    tag,
    upVote,
    downVote,
    share,
    commentsCount,
    createdAt,
  } = post;

  return (
    <div className="max-w-md mx-auto mb-4 bg-white p-4 border rounded-lg shadow-md">
      {/* Author Info */}
      <div className="flex items-center mb-4">
        <img
          src={authorImg}
          alt={authorName}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-semibold">{authorName}</p>
          <p className="text-gray-500 text-sm">{createdAt}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-xl font-semibold mb-2">{postTitle}</p>
      {postImg && <img src={postImg} alt={postTitle} className="mb-2 rounded-lg" />}
      <p className="text-gray-700">{postDescription}</p>

      {/* Tags */}
      <div className="mt-4">
        {tag && tag.map((tagItem) => (
          <span key={tagItem} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {tagItem}
          </span>
        ))}
      </div>

      {/* Post Actions */}
      <div className="flex mt-4">
        <div className="flex items-center mr-4">
          <FaThumbsUp className="text-blue-500 mr-1" />
          <span>{upVote}</span>
        </div>
        <div className="flex items-center mr-4">
          <FaThumbsDown className="text-red-500 mr-1" />
          <span>{downVote}</span>
        </div>
        <div className="flex items-center mr-4">
          <FaShare className="text-green-500 mr-1" />
          <span>{share}</span>
        </div>
        <div className="flex items-center">
          <span>{commentsCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

ShowPost.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string,
    authorImg: PropTypes.string,
    postTitle: PropTypes.string,
    postTime: PropTypes.string,
    postImg: PropTypes.string,
    postDescription: PropTypes.string,
    tag: PropTypes.arrayOf(PropTypes.string),
    upVote: PropTypes.number,
    downVote: PropTypes.number,
    share: PropTypes.number,
    commentsCount: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default ShowPost;
