import React ,{useEffect, useState} from 'react';
import { searchBooks } from '../services/book.service';

export default function SearchBook() {
    const[searchTerm, setSearchTerm] = useState("");
    const[result, setResult] = useState([]);
  return (
    <div>SearchBook</div>
  )
}
