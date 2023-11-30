


import { useState } from 'react';

import usePosts from '../../../hooks/usePosts';
import ShowPost from './ShowPost';


const TotalPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedPosts, setSortedPosts] = useState(false);
  const { postsData, refetch, loading } = usePosts(currentPage, 5);


  if(loading ){
    return <p className=' text-center'>Loading....</p>
  }

  const totalPost = postsData?.totalPosts || 0;
  const pageNumbers = Array.from({ length: Math.ceil(totalPost / 5) }, (_, index) => index + 1);
  

    const handlePagination = pageNumber => {
      setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < Math.ceil(totalPost / 5)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
  // sort by popularity button
  const handleSortByPopularity = () => {
    setSortedPosts(!sortedPosts)
  }


  return (
    <div className="container mx-auto py-8">
      <div className=' flex justify-center'>
        {
          postsData?.posts?.length > 0 ?  <button onClick={() => handleSortByPopularity(!sortedPosts)} className=' px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700'>{ sortedPosts ? 'Sort by new post': 'Sort By Popularity'}</button>
          :
        <div className="flex flex-col items-center justify-center mt-8">
          <p className="text-lg font-semibold text-gray-500 mb-4">No posts available.</p>
          <p className="text-gray-600">Start exploring and sharing your thoughts!</p>
        </div>

        }
      </div>
      <div className="grid gap-4">
        {
          sortedPosts ?
            <span>
              {postsData?.popularPosts?.map(post => <ShowPost key={post._id} post={post} refetch={refetch}></ShowPost>)}
            </span>
            :
            <span>
              {postsData?.posts?.map(post => <ShowPost key={post._id} post={post} refetch={refetch}></ShowPost>)}
            </span>
        }
      </div>
     {
       pageNumbers?.length > 1 && <div className="flex justify-center mt-4">
       <button onClick={handlePrevPage} className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
           Prev
         </button>
         { pageNumbers.map((_, index) => (
           <button
             key={index}
             onClick={() => handlePagination(index + 1)}
             className={`mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700 ${
               currentPage === index + 1 ? 'bg-blue-700' : ''
             }`}
           >
             {index + 1}
           </button>
         ))}
           <button onClick={handleNextPage} className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
           Next
         </button>
       </div>
     }
    </div>
  );
};

export default TotalPost;
