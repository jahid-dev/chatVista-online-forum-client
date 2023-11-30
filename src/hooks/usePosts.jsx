import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
// import useSearch from "./useSearch";


const usePosts = (page , limit = 5) => {
    //const { searchTag } = useSearch() || '';
    const axiosPublic = useAxiosPublic();

    const { data: posts, isPending: loading, refetch } = useQuery({
        queryKey:  ['post', page, limit],
        queryFn: async() => {
            let url = `/posts?page=${page}&limit=${limit}`
            // if(searchTag){
            //     url += &tag=${searchTag} 
            // }
             const res = await axiosPublic.get(url);
             return res?.data;
        }
    })
    return { posts, refetch, loading };
};

export default usePosts;
