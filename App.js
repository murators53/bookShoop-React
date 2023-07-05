import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditPage from "./pages/EditPage";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/booklist" element={<BookList />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/editbook/:urunId" element={<EditPage />} />
          {/* :urun-id yerine id yazdiracaz  Backtick (`) ile*/}
          {/* :urunId parametresi, dinamik olarak değişen ürün kimliğini temsil eder. */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
