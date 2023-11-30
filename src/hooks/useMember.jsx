import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const useMember = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    
    const { data: isMember } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/member/${user?.email}`)
            return res.data;
        }
    }) 

    return isMember
};

export default useMember;