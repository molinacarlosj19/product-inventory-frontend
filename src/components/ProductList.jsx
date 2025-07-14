import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getAllProducts()
    .then(res => setProducts(res.data))
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return <p>Loading products...</p>;
  } 
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Products</h2>
        <Link to="/new" className="bg-green-600 text-white px-4 py-2 rounded">+ New Product</Link>
      </div>
      <h2 className="text-2xl mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th>Code</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Expiration</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                <td>{p.expirationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
