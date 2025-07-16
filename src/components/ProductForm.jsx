import { useForm } from "react-hook-form";
import { createProduct, getProductById, updateProduct } from "../api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductForm = ({ isEdit }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      getProductById(id).then(res => {
        const data = res.data;
        for (let key in data) {
          setValue(key, data[key]);
        }
      });
    }
  }, [isEdit, id, setValue]);

  const onSubmit = (data) => {
    setLoading(true);
    const action = isEdit ? updateProduct(id, data) : createProduct(data);

    action
      .then(() => {
        reset();
        navigate("/");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">{isEdit ? "Edit Product" : "Create Product"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Code" {...register("code", { required: true })} />
        <input className="border p-2 w-full" placeholder="Name" {...register("name", { required: true })} />
        <textarea className="border p-2 w-full" placeholder="Description" {...register("description")} />
        <input className="border p-2 w-full" placeholder="Quantity" type="number" {...register("quantity", { valueAsNumber: true })} />
        <input className="border p-2 w-full" placeholder="Price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
        <input className="border p-2 w-full" placeholder="Expiration Date (YYYY-MM-DD)" {...register("expirationDate")} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? (isEdit ? "Updating..." : "Saving...") : (isEdit ? "Update" : "Save")}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
