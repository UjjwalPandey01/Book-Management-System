import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editBook, getBookById } from '../services/book.service';

export default function EditBook() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
    rating: '',
  });

  useEffect(() => {
    getBookById(id).then((res) => {
      const {
        title,
        author,
        publishedDate,
        rating
      } = res.data;
      setBook({
        title,
        author,
        publishedDate: publishedDate.slice(0, 10),
        rating,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editBook(id, book);
    navigate('/');
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          {id ? "Edit Book" : "Add Book"}
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="publishedDate"
            className="block text-sm font-medium text-gray-700"
          >
            Published Date
          </label>
          <input
            type="date"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            name="rating"
            value={book.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {id ? "Update Book" : "Add Book"}
        </button>
      </form>

    </div>
  )
}
