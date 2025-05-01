import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import BookList from "./components/BookList";
import FavoriteBookList from "./components/FavoriteBookList";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books" element={< BookList/>}/>
        <Route path="/favorite" element={<FavoriteBookList/>}/>
        <Route path="/create" element={<CreateBook/>}/>
        <Route path="/edit/:id" element={<EditBook/>}/>
        {/* <Route path="/" element={</>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
