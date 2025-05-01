import express from "express";

import {createBook, getBooks, searchBooks, updateBook, softDelete, markAsFavorite, unMarkAsFavorite, getFavoriteBooks, getBookById} from "../controllers/book.controller.js";
const router = express.Router();

router.post("/books/create", createBook); // create a book done

router.get("/books", getBooks); //give all books done

router.put("/books/update/:id", updateBook); // update the book done

router.get("/books/search", searchBooks);

router.delete("/books/delete/:id", softDelete); // delete the book done

router.post('/books/favorite/:id', markAsFavorite); // mark the book as favorite done

router.delete('/books/unfavorite/:id', unMarkAsFavorite); // unmark the book as favorite done

router.get('/books/favoriteBooks', getFavoriteBooks) // get the all favorite books done

router.get("/books/:id", getBookById); // get a book  by its ID


export default router;