import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id).then(() => {
        setProducts(products.filter((p) => p.id !== id));
      });
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Products</h2>
        <Link to="/new" className="bg-green-600 text-white px-4 py-2 rounded">
          + New Product
        </Link>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                <td>{p.expirationDate}</td>
                <td>
                  <Link
                    to={`/edit/${p.id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
