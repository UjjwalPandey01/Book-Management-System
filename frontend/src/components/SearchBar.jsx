import React, { useState } from "react";
import { searchBooks } from "../services/book.service";

const SearchBar = ({ onResults }) => {
    const [query, setQuery] = useState('');
    const handleSearch = async () => {
        try {
            const response = await searchBooks({ title: query });
            onResults(response.data);
        } catch (error) {
            console.error("search failed", error.response?.data?.message || error.message);
        }
    };
    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Search a book by title"
                value={query}
                onChange={(e) =>setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-green-700 text-white px-4 py-2 rounded">Search</button>
        </div>
    );
};

export default SearchBar;