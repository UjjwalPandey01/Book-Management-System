import mongoose from "mongoose";
import { Book } from "../models/book.model.js";


// creating a book
export const createBook = async (req, res) =>{
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error in creating book",  error:error.message} );
    }
};

// fetching all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({isDeleted: false});
        res.status(200).json(books);
    } catch (error) {
        console.log("Error in fetching books", error);
        res.status(500).json({message: "Failed to fetch books", error: error.message});
    }
};
// fetching favorite book
export const getFavoriteBooks = async (req, res) => {
    try {
        const books = await Book.find({isDeleted: false, isFavorite: true});
        res.status(200).json(books);
    } catch (error) {
        console.log("Error in fetching books", error);
        res.status(500).json({message: "Failed to fetch books", error: error.message});
    }
};

// search books by id, title or author
export const searchBooks = async (req, res) => {
    const {id, _id, title, author} = req.query;

    if (!_id &&!id && !title && !author) {
        return res.status(400).json({message: "Please provide at least on id, title or author."});
        
    }

    const query = {isDeleted: false};
    // for mongo id
    if(_id){
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({message: "Invalid _id formate"});
        }
        query._id = _id;
    }

    if(id) query.id = parseInt(id);
    if(title) query.title = { $regex: title, $options: "i" };
    if(author) query.author = {$regex: author, $options: "i"};

    try {
        const books = await Book.find(query);
        if (books.length === 0) {
            return res.status(404).json({message: "Book not found in database."});
        }
        res.status(200).json(books);
    } catch (error) {
        console.log("Search failed", error);
        res.status(500).json({message: "Search failed", error : error.message});
    }
};

// updating book credentials
export const updateBook = async (req, res) =>{
    const {id} = req.params;
    const updatedData = req.body;

    try {
        const book = await Book.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).json({message: "Error updating book", error: error.message});
    }
};

// deleting the books
export const softDelete = async (req, res) => {
    const {id} = req.params;
    
    try {
        const book = await Book.findByIdAndUpdate(id, {isDeleted: true}, {
            new: true,
        });
        if(!book){
           return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json({message: "Book soft deleted successfully", book})
    } catch (error) {
        console.error("Failed to delete book", error);
        res.status(500).json({message: "Failed to delete books", error: error.message});
    }
};

// marking books as favorite
export const markAsFavorite = async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, {isFavorite: true}, {
            new : true
        });
        if (!book) {
            return res.status(404).json("Book not found");
        }
        res.status(200).json({message: "Book marked as favorite successfully.", book});
    } catch (error) {
        res.status(500).json({message: "Failed in marking as favorite.", error: error.message});
    }
};

// unmarking book as favorite
export const unMarkAsFavorite = async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, {isFavorite: false}, {
            new: true
        });
        if (!book) {
            return res.status(404).json({message: "Book not found."});
        }
        res.status(200).json({message: "Book is unmark as favorite", book});
    } catch (error) {
        res.status(500).json({message: "book is not unmark as favorite.", error: error.message});
    }
};







export const getBookById = async (req, res) => {
    const { id } = req.params;

    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid book ID format" });
    }

    try {
        const book = await Book.findById(id); 
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" }); 
        }

        res.status(200).json(book);
    } catch (error) {
        console.log("Error fetching book by ID", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};