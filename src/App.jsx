import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/new" element={<NewProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
