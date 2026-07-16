import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getUserStatus = (id) => {
  if (id % 3 === 0) return "pending";
  if (id % 2 === 0) return "inactive";
  return "active";
};

export const mapUser = (user) => {
  const firstName = user.name?.firstname ?? "";
  const lastName = user.name?.lastname ?? "";
  const street = user.address?.street ?? "";
  const number = user.address?.number ?? "";
  const city = user.address?.city ?? "—";
  const zipcode = user.address?.zipcode ?? "";

  return {
    id: user.id,
    name: `${firstName} ${lastName}`.trim() || user.username,
    firstName,
    lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    city,
    zipcode,
    street: [number, street].filter(Boolean).join(" "),
    address: [street && `${number} ${street}`.trim(), city, zipcode]
      .filter(Boolean)
      .join(", "),
    avatar: `https://i.pravatar.cc/80?u=${user.email || user.id}`,
    status: getUserStatus(user.id),
  };
};

export const mapProduct = (product) => {
  const rate = product.rating?.rate ?? 0;
  const reviews = product.rating?.count ?? 0;
  const description = product.description ?? "";

  return {
    id: product.id,
    title: product.title,
    description,
    shortDescription:
      description.length > 72 ? `${description.slice(0, 72)}…` : description,
    price: product.price,
    category: product.category,
    image: product.image,
    rating: rate,
    reviews,
    status: rate >= 4 ? "active" : rate >= 3 ? "pending" : "inactive",
  };
};

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Users", "Products", "User", "Product"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (response) => response.map(mapUser),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users", id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      transformResponse: (response) => mapUser(response),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (response) => response.map(mapProduct),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response) => mapProduct(response),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = fakeStoreApi;
