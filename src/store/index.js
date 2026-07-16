import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice";
import postsReducer from "./postsSlice";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    posts: postsReducer,
    dashboard: dashboardReducer,
  },
});
