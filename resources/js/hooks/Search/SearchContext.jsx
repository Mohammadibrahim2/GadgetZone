import { createContext, useContext, useState, useMemo } from "react";

const SearchContext = createContext();

const SearchQueryProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: " ",
        results: [],
    });

    return (
        <SearchContext.Provider value={[values, setValues]}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchQueryProvider };
