import React, { useEffect, useState } from 'react';
import { getAllBooks, markFavorite, unmarkFavorite, getFavoriteBooks } from "../services/book.service.js";
import { FaHeart, FaStar } from "react-icons/fa";
import axios from 'axios';

export default function FavoriteBookList() {
    const [books, setBooks] = useState([]);

    // fetch all books
    const fetchBooks = async () => {
        try {
            const response = await getFavoriteBooks();
            setBooks(response.data);
             console.log("Response", response);
        } catch (error) {
            console.error("Error fetching books", error);
        }
    };
    //  like button function
    const toggleButton = async (bookId, isFavorite) => {
        try {
            if (isFavorite) {
                await unmarkFavorite(bookId);
            } else {
                await markFavorite(bookId);
            }
            fetchBooks();
        } catch (error) {
            console.error("Error toggling the button to mark or unmark as favorite", error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, []);
    return (

        // <div>
        //     <h2>Book List</h2>

        //     <ul>
        //         {books.map((books) => (
        //             <li key={books._id}>
        //                 <h3>  {books.title}</h3>
        //                 <p>Incremented id {books.id}</p>
        //                 <p>Author: {books.author}</p>
        //                 <p>Published Date: {new Date(books.publishedDate).toLocaleDateString()}</p>
        //                 <p>Rating: {books.rating ?? "n/a"}</p>
        //                 <p>Favorite: {books.isFavorite ? "yes" : "No"}</p>
        //                 <button
        //                     onClick={() => toggleButton(books._id, books.isFavorite)}
        //                 >
        //                     <FaHeart color={books.isFavorite ? "red" : "lightgray"} />
        //                 </button>
        //                 <div>
        //                     {[1, 2, 3, 4, 5].map((star) => (
        //                         <FaStar
        //                             key={star}
        //                             size={20}
        //                             style={{ cursor: "pointer", marginRight: "4px" }}
        //                             color={star <= (books.rating || 0) ? "red" : "gray"}
        //                         />
        //                     ))}
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>

        <div className="p-6">
  <h2 className="text-2xl font-bold text-center mb-6">Favorite Book List</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {books.map((book) => (
      <div
        key={book._id}
        className="bg-white p-4 shadow-md rounded-lg flex flex-col justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            <strong>ID:</strong> {book.id}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Published:</strong>{" "}
            {new Date(book.publishedDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Rating:</strong> {book.rating ?? "N/A"}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Favorite:</strong> {book.isFavorite ? "Yes" : "No"}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => toggleButton(book._id, book.isFavorite)}
            className="focus:outline-none"
          >
            <FaHeart
              color={book.isFavorite ? "red" : "lightgray"}
              size={20}
              className="hover:scale-110 transition-transform"
            />
          </button>

          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={18}
                className="mr-1 cursor-pointer"
                color={star <= (book.rating || 0) ? "orange" : "gray"}
              />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    );
};
