import  {  useState } from 'react';
import ShowPost from './ShowPost';

import HomePostDetails from './HomePostDetails'; 
import usePosts from '../../../hooks/usePosts';

const MapPost = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts,  loading } = usePosts();
  console.log(posts);
  if(loading){
    return <div>
      Loading....
    </div>
  }
  

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <ShowPost key={post._id} post={post} onClick={() => handlePostClick(post)} />
        ))}
      </div>
        
      
      {selectedPost && <HomePostDetails post={selectedPost} />}
    </div>
  );
};

export default MapPost;
