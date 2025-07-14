import { useForm } from "react-hook-form";
import { createProduct } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (data) => {
    setLoading(true);
    setErrorMsg("");
    createProduct(data)
      .then(() => {
        reset();
        toast.success("Product created successfully!");
        navigate("/");
      })
      .catch(() => {
        setErrorMsg("Failed to create product. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Create New Product</h2>
      {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="border p-2 w-full"
            placeholder="Code"
            {...register("code", { required: "Code is required" })}
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>

        <div>
          <input
            className="border p-2 w-full"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <textarea className="border p-2 w-full" placeholder="Description" {...register("description")} />

        <div>
          <input
            className="border p-2 w-full"
            placeholder="Quantity"
            type="number"
            {...register("quantity", { required: "Quantity is required", min: 0 })}
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        <div>
          <input
            className="border p-2 w-full"
            placeholder="Price"
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <input className="border p-2 w-full" placeholder="Expiration Date (YYYY-MM-DD)" {...register("expirationDate")} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
