import { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTag, setSearchTag] = useState('');
  
  return (
    <SearchContext.Provider value={{ searchTag, setSearchTag }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;