import React, { useState } from 'react';
import axios from 'axios';
import { createBook } from '../services/book.service';
export default function CreateBook() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        publishedDate: '',
        rating: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createBook(book);
            console.log("submitted book is ", response.data);
            //reset form
            setBook({
                title: '',
                author: '',
                publishedDate: '',
                rating: '',
            });

        } catch (error) {
            console.error('There was an error in adding the books', error);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Add a New Book
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Published Date
                        </label>
                        <input
                            type="date"
                            name="publishedDate"
                            value={book.publishedDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={book.rating}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>

    );
};
