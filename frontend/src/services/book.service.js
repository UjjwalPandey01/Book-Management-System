import axios from "axios";

const BASE_URL = "https://book-management-system-backend-960r.onrender.com/";

export const getAllBooks = () => axios.get(BASE_URL);

export const markFavorite = (id) => axios.post(`${BASE_URL}/favorite/${id}`);

export const getFavoriteBooks = () => axios.get(`${BASE_URL}/favoriteBooks`);

export const unmarkFavorite = (id) => axios.delete(`${BASE_URL}/unfavorite/${id}`);

export const createBook = (data) => axios.post(`${BASE_URL}/create`, data);






export const deleteBook = (id) => axios.delete(`${BASE_URL}/delete/${id}`);




export const editBook = (id, data) => axios.put(`${BASE_URL}/update/${id}`,data);
export const getBookById = (id) => axios.get(`${BASE_URL}/${id}`);


export const searchBooks = (query) => axios.get(`${BASE_URL}/search`, {params: query});

