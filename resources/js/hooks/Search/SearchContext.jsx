import { createContext, useContext, useState, useMemo } from "react";

const SearchContext = createContext(null); // Add null as default value

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === null) {
        throw new Error("useSearch must be used within a SearchQueryProvider");
    }
    return context;
};

export const SearchQueryProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({ search, setSearch }), [search]);

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
