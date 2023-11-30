
import { Link } from "react-router-dom";
import useSearch from "../../../Hooks/useSearch";
import useComments from "../../../Hooks/useComments";


const ShowPost = ({ post }) => {
    const { setSearchTag } = useSearch()
    let { _id, authorName, authorImg, postTitle, tag, postImg, postTime, upVote, downVote } = post;
    const { totalComments } = useComments(_id);
   

    return (
        <div className="container mx-auto   w-11/12 md:w-2/3 lg:w-1/2  py-8 my-3">
            {post ? (
                <Link to={`/homepostdetails/${_id}`}>
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
                        <h1 className="text-3xl font-bold mb-4">{postTitle}</h1>
                        <Link to='/'> <button onClick={() => setSearchTag(tag)} className=" text-blue-600 underline">#{tag}</button></Link>
                        <img src={postImg} alt="" className=" h-[350px] w-full" />
                        <div className=' flex justify-between mx-1'>
                            <button className={`hover:bg-blue-500 hover:text-white px-3 my-1`}>
                                Like ({upVote})
                            </button>
                            <button className={`hover:bg-blue-500 hover:text-white px-3 my-1`}>
                                Dislike ({downVote})
                            </button>
                            <button className=" hover:btn ">Comment {totalComments ? `(${totalComments})` : '' }</button>
                            <button className=" hover:btn ">Share</button>
                        </div>
                    </div>
                </Link>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowPost;
