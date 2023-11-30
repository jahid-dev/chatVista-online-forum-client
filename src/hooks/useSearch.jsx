import { useContext } from "react";
import { SearchContext } from "../Providers/SearchProvider";



const useSearch = () => {
  const context = useContext(SearchContext);
  
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default useSearch;