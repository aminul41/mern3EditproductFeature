import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      async queryFn() {
        try {
          const productsCollectionRef = collection(db, "products");
          const data = await getDocs(productsCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: filteredData };
        } catch (error) {
          console.log(error);
          return { error: "Failed to fetch products" };
        }
      },
      providesTags: ["products"],
    }),
    getProduct: builder.query({
      async queryFn(id) {
        try {
          const productDocRef = doc(db, "products", id);
          const productDoc = await getDoc(productDocRef);
          if (productDoc.exists()) {
            return { data: { ...productDoc.data(), id: productDoc.id } };
          } else {
            return { error: "Product not found" };
          }
        } catch (error) {
          console.log(error);
          return { error: "Failed to fetch products" };
        }
      },
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      queryFn: async (product) => {
        try {
          await addDoc(collection(db, "products"), product);
          return { data: product };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["products"],
    }),
    removeProduct: builder.mutation({
      queryFn: async (id) => {
        try {
          const productDoc = doc(db, "products", id);
          await deleteDoc(productDoc);
          return { data: id };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      queryFn: async ({ id, ...updates }) => {
        try {
          const productDoc = doc(db, "products", id);
          await updateDoc(productDoc, updates);
          return { data: { id, ...updates } };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = apiSlice;
