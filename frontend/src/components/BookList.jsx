import React, { useEffect, useState } from "react";
import { deleteBook, getAllBooks, markFavorite, unmarkFavorite } from "../services/book.service.js";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar.jsx";


export default function BookList() {
  const [books, setBooks] = useState([]);
  const[sortOption, setSortOption] = useState(""); // state for sorting

  // logic for 
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;


  const navigate = useNavigate();
  // fetch all books
  const fetchBooks = async () => {
    // normal fetching logic
    // try {
    //   const response = await getAllBooks();
    //   setBooks(response.data);
    // } catch (error) {
    //   console.error("Error fetching books", error);
    // }

    // fetching logic with sorting
    try {
      const response = await getAllBooks();
      let sortedBooks = [...response.data];

      if (sortOption == "rating") {
        sortedBooks.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        console.log("Sorted ratings:", sortedBooks.map(b => b.rating));

      }else if (sortOption == "publishedDate"){
        sortedBooks.sort((a, b) =>(b.publishedDate || 0) - (a.publishedDate || 0));
      }
      setBooks(sortedBooks);
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
    loadBooks();
  }, [sortOption]);

  const loadBooks = async () => {
    const res = await getAllBooks();
    setBooks(res.data);
  };

  // deleting a book
  const handleDelete = async (id) => {
    if (confirm("Are you sure want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      } catch (error) {
        console.error("Error in deleting book:", error);
      }
    }

  };

  // pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6"> Book List</h2>
      {/* <SearchBar onResults={(results) => setBooks(results)} /> */}

        {/* Sorting Dropdown */}
      <div className="mb-4 flex justify-between items-center">
        <SearchBar onResults={(results) => setBooks(results)} />
        <select
          className="ml-4 p-2 border rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="publishedDate">Published Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentBooks.map((book) => (
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
              <button onClick={() => toggleButton(book._id, book.isFavorite)}>
                <FaHeart color={book.isFavorite ? "red" : "lightgray"} size={20} />
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
            <button onClick={() => navigate(`/edit/${book._id}`)} className="flex items-center justify-center mt-4 py-1 bg-red-500 text-white">Edit </button>
            <button onClick={() => handleDelete(book._id)} className="flex items-center justify-center mt-4 py-1 bg-red-500 text-white">Delete </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex justify-end space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-200 rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>

  );
};



