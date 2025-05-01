import React from 'react'
import { useNavigate } from 'react-router-dom';
import BookList from './BookList';
import FavoriteBookList from './FavoriteBookList';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800"> Book Management  System</h1>

        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/create")}
          >
            Add a New Book
          </button>

          <button
            className="bg-green-700 text-white px-4 py-2 rounded-md "
            onClick={() => navigate("/books")}
          >
            Get Book List
          </button>

          <button
            className=" bg-blue-900 text-white px-4 py-2 rounded-md  transition"
            onClick={() => navigate("/favorite")}
          >
             Get Favorite Book List
          </button>
        </div>
      </div>
    </div>


  );
};
