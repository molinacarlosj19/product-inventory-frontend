import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>
      <table className="table-auto w-full">
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
  );
};

export default ProductList;
