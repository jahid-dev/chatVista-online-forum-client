import { useForm } from "react-hook-form";
import useSearch from "../../../hooks/useSearch";

const HeroSection = () => {
  const { setSearchTag } = useSearch();    
   const { register, handleSubmit, reset } = useForm()

  const handleSearchClick = async(data) => {
        const searchTag = data.searchTag;
        setSearchTag(searchTag)
       reset()
    };
    return (
        <div
        className="relative bg-cover bg-center h-96 sm:h-80 md:h-96 lg:h-120 xl:h-160"
        style={{ backgroundImage: 'url("https://i.ibb.co/Bt4hDRq/Downloader-La-e-PSso-Yx-Ag-O.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 text-center">
             Forum Search
          </h1>
          <div className="relative w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit(handleSearchClick)} className="flex space-x-4">
                    <input
                        type="text"
                        {...register('searchTag')}
                        placeholder="Search by tags"
                        className="text-black rounded-l-md px-4 py-2 flex-1"
                    />
                    <input type="submit" value='search' className="bg-blue-500 text-white px-4 py-2 rounded-r-md"/>
                </form>
          </div>
        </div>
      </div>
    );
};

export default HeroSection;