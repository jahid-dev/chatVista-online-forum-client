import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useSearch from "../hooks/useSearch";


const usePosts = (page , limit = 5) => {
    const { searchTag } = useSearch() || '';
    const axiosPublic = useAxiosPublic();

    const { data: postsData, isPending: loading, refetch } = useQuery({
        queryKey: searchTag ?  ['post', page, limit, searchTag] : ['post', page, limit],
        queryFn: async() => {
            let url = `/posts?page=${page}&limit=${limit}`
            if(searchTag){
                url += `&tag=${searchTag}` 
            }
            const res = await axiosPublic.get(url);
            return res?.data;
        }
    })
    return { postsData, refetch, loading };
};

export default usePosts;
