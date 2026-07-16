import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    posts: postsReducer,
  },
});
