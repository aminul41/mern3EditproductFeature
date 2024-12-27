// components/EditProduct.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../features/api/apiSlice";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductQuery(id);
  //   console.log(product);
  const [updateProduct] = useUpdateProductMutation();
  const [mutantProduct, setMutantProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setMutantProduct({
        title: product.title || "",
        price: product.price || "",
        image: product.image || "",
        description: product.description || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMutantProduct({
      ...mutantProduct,
      [name]: name === "price" ? Number(value) : value,
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "react_default");
    data.append("cloud_name", "drceyisp3");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/drceyisp3/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    // console.log(result);
    setMutantProduct({ ...mutantProduct, image: result.secure_url });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({ id, ...mutantProduct }).unwrap();
      toast("Product updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/all-products"); // Navigate back to the product list or desired route
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "50px",
          marginTop: "20px",
        }}
      >
        Edit Product
      </h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <p>Title:</p>
        <input
          value={mutantProduct.title}
          onChange={handleChange}
          name="title"
          style={{ display: "block", width: "80%" }}
          required
        />
        <br />
        <p>Price:</p>

        <input
          value={mutantProduct.price}
          onChange={handleChange}
          name="price"
          style={{ display: "block", width: "80%" }}
          type="number"
          required
        />
        <br />

        <p>Description:</p>
        <input
          value={mutantProduct.description}
          onChange={handleChange}
          name="description"
          style={{ display: "block", width: "80%" }}
          type="text"
          required
        />
        <br />
        <p>Image URL:</p>

        {mutantProduct.image && (
          <img
            src={mutantProduct.image}
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <input type="file" name="image" onChange={handleImageChange} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EditProduct;
