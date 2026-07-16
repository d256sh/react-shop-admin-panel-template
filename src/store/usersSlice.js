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

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return fakeStoreService.fetchUsers();
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id) => {
  return fakeStoreService.fetchUser(id);
});

export const addUser = createAsyncThunk("users/addUser", async (payload) => {
  return fakeStoreService.createUser(payload);
});

export const removeUsers = createAsyncThunk("users/removeUsers", async (ids) => {
  await Promise.all(ids.map((id) => fakeStoreService.deleteUser(id)));
  return ids;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.current = null;
      state.currentStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.currentStatus = "loading";
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index === -1) {
          state.items.push(action.payload);
        } else {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(removeUsers.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(removeUsers.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items = state.items.filter((item) => !action.payload.includes(item.id));
      })
      .addCase(removeUsers.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentUser } = usersSlice.actions;

export const selectUsers = (state) => state.users.items;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectUsersActionStatus = (state) => state.users.actionStatus;
export const selectCurrentUser = (state) => state.users.current;
export const selectCurrentUserStatus = (state) => state.users.currentStatus;

export default usersSlice.reducer;
