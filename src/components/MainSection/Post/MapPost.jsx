import  { useEffect, useState } from 'react';
import ShowPost from './ShowPost';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const MapPost = () => {
  const axiosPublic = useAxiosPublic(); 

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get('/posts'); 
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <ShowPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MapPost;
