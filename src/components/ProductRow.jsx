import { Link } from "react-router";
import { useRemoveProductMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";

function ProductRow({ item }) {
  const [deleteProduct] = useRemoveProductMutation();

  const removeProductHandler = async (id) => {
    await deleteProduct(id);
    toast.success("Product deleted successfully", {
      position: "top-right",
    });
  };

  return (
    <tr>
      <td>
        <img src={item.image} className="product-img" alt="" />
      </td>

      <td>
        <h2>{item.title}</h2>
      </td>
      <td>
        <h2>${item.price}</h2>
      </td>
      <td>
        <Link to={`/edit-product/${item.id}`}>
          <button>Edit</button>
        </Link>
      </td>
      <td onClick={() => removeProductHandler(item.id)}>
        {/* <p className="product-icon">x</p> */}
        <button>Delete</button>
      </td>
    </tr>
  );
}

export default ProductRow;
