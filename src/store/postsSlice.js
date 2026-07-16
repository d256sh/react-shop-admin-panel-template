/**
 * Posts feature slice (JSONPlaceholder).
 * Includes comments for the post detail view.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsService } from "../services/postsService";

const initialState = {
  items: [],
  current: null,
  comments: [],
  status: "idle",
  currentStatus: "idle",
  commentsStatus: "idle",
  actionStatus: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return postsService.fetchPosts();
});

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (id) => {
  return postsService.fetchPost(id);
});

export const fetchPostComments = createAsyncThunk(
  "posts/fetchPostComments",
  async (id) => {
    return postsService.fetchPostComments(id);
  }
);

export const addPost = createAsyncThunk("posts/addPost", async (payload) => {
  return postsService.createPost(payload);
});

export const removePosts = createAsyncThunk("posts/removePosts", async (ids) => {
  await Promise.all(ids.map((id) => postsService.deletePost(id)));
  return ids;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.current = null;
      state.comments = [];
      state.currentStatus = "idle";
      state.commentsStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.currentStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostComments.pending, (state) => {
        state.commentsStatus = "loading";
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.commentsStatus = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.commentsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(removePosts.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(removePosts.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items = state.items.filter((item) => !action.payload.includes(item.id));
      })
      .addCase(removePosts.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentPost } = postsSlice.actions;

export const selectPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostsActionStatus = (state) => state.posts.actionStatus;
export const selectCurrentPost = (state) => state.posts.current;
export const selectCurrentPostStatus = (state) => state.posts.currentStatus;
export const selectPostComments = (state) => state.posts.comments;
export const selectPostCommentsStatus = (state) => state.posts.commentsStatus;

export default postsSlice.reducer;
