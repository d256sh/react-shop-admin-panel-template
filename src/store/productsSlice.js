import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeStoreService } from "../services/fakeStore";

const initialState = {
  items: [],
  current: null,
  status: "idle",
  currentStatus: "idle",
  actionStatus: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return fakeStoreService.fetchProducts();
});

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    return fakeStoreService.fetchProduct(id);
  }
);

export const addProduct = createAsyncThunk("products/addProduct", async (payload) => {
  return fakeStoreService.createProduct(payload);
});

export const removeProducts = createAsyncThunk(
  "products/removeProducts",
  async (ids) => {
    await Promise.all(ids.map((id) => fakeStoreService.deleteProduct(id)));
    return ids;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.current = null;
      state.currentStatus = "idle";
    },
    resetProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.currentStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index === -1) {
          state.items.push(action.payload);
        } else {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(removeProducts.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(removeProducts.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items = state.items.filter((item) => !action.payload.includes(item.id));
      })
      .addCase(removeProducts.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProduct, resetProductsError } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductsActionStatus = (state) => state.products.actionStatus;
export const selectCurrentProduct = (state) => state.products.current;
export const selectCurrentProductStatus = (state) => state.products.currentStatus;

export default productsSlice.reducer;
