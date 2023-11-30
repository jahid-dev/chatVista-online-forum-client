import { useContext, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const userName = user?.displayName;
  const authorImg = user?.photoURL;

  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [tag, setTag] = useState(null);
  const [postTime, setPostTime] = useState('');
  const [postImg, setPostImg] = useState('');
  const [userPostCount, setUserPostCount] = useState(0); // Track the number of posts by the current user

  const tagOptions = [
    { value: 'General', label: 'General' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Movies', label: 'Movies' },
    { value: 'Music', label: 'Music' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Sports', label: 'Sports' },
  ];

  const handleTagChange = (selectedOption) => {
    setTag(selectedOption);
  };

  const validateUrl = (url) => {
    // Basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !postTitle ||
      !postDescription ||
      !tag ||
      !postTime ||
      !validateUrl(postImg)
    ) {
      alert('Please fill in all required fields with valid information.');
      return;
    }

    // Check if the user has reached the maximum number of posts (5)
    if (userPostCount >= 5) {
      alert('You have reached the maximum limit of 5 posts.');
      return;
    }

    // Prepare the data to be sent to the server
    const postData = {
      authorImg,
      authorName: userName,
      authorEmail: userEmail,
      postTitle,
      postDescription,
      tag: tag.value,
      postTime,
      postImg,
    };

    try {
      // Send a POST request to your server using Axios
      const response = await axiosSecure.post('/posts', postData);

      // Handle the response as needed
   

      // Increment the user's post count
      setUserPostCount(userPostCount + 1);

      // Reset the form fields after successful submission
      setPostTitle('');
      setPostDescription('');
      setTag(null);
      setPostTime('');
      setPostImg('');

      // Display SweetAlert2 success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post submitted successfully!',
      });

      // Optionally, you can perform additional actions based on the server response
    } catch (error) {
      // Handle errors
   

      // Display SweetAlert2 error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit the post. Please try again later.',
      });
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Post</h2>
      <form className="max-w-md mx-auto bg-white p-8 border rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Name:</label>
          <div className="text-gray-800 p-2 border rounded">{userName}</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Email:</label>
          <div className="text-gray-800 p-2 border rounded">{userEmail}</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Image (URL):</label>
          <div className="text-gray-800 p-2 border rounded break-words">{authorImg}</div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Description:</label>
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Tag:</label>
          <Select className="w-full" options={tagOptions} value={tag} onChange={handleTagChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Time:</label>
          <DatePicker
            selected={postTime}
            onChange={(date) => setPostTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Image (URL):</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={postImg}
            onChange={(e) => setPostImg(e.target.value)}
          />
        </div>

    

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
