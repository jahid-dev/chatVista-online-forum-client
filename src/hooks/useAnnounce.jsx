import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAnnounce = () => {
    const axiosPublic = useAxiosPublic();
    const { data: announcements , isPending: loadingAncc, refetch:refethcAnnc } = useQuery({
        queryKey: ['announcements', 'announce'],
        queryFn: async() => {
           const res = await axiosPublic.get('/announcements');
           return res.data
        } 
    });
 
    const totalAnnouncements = announcements?.length;
    console.log(totalAnnouncements);
    return { announcements, totalAnnouncements, loadingAncc , refethcAnnc}
};

export default useAnnounce;