import  { useState } from 'react';
import Select from 'react-select';

const AddPost = () => {
  const [authorImage, setAuthorImage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [tag, setTag] = useState(null);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);

  const tagOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    // Add more tag options as needed
  ];

  const handleTagChange = (selectedOption) => {
    setTag(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!validateUrl(authorImage) || !authorName || !validateEmail(authorEmail) || !postTitle || !postDescription || !tag) {
      alert('Please fill in all required fields with valid information.');
      return;
    }

    // Perform any actions you need with the form data (e.g., send to the server)

    // Reset the form fields
    setAuthorImage('');
    setAuthorName('');
    setAuthorEmail('');
    setPostTitle('');
    setPostDescription('');
    setTag(null);
    setUpVote(0);
    setDownVote(0);
  };

  const validateUrl = (url) => {
    // Basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Post</h2>
      <form className="max-w-md mx-auto bg-white p-8 border rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Image (URL):</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={authorImage}
            onChange={(e) => setAuthorImage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            required
          />
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
          <label className="block text-gray-600 text-sm font-semibold mb-2">UpVote:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={upVote}
            onChange={(e) => setUpVote(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">DownVote:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={downVote}
            onChange={(e) => setDownVote(e.target.value)}
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
