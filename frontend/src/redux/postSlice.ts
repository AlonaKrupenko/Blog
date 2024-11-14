import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  postId: string;
}

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null | undefined;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await api.get("/posts");
  return response.data;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: string) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: { title: string; content: string }, { dispatch }) => {
    const response = await axios.post("http://localhost:4000/posts", postData);
    dispatch(fetchPosts());
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    await api.delete(`/posts/${postId}`);
    return postId; // Return the postId to update the state
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, content }: { postId: string; content: string }) => {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({
    id,
    title,
    content,
  }: {
    id: string;
    title: string;
    content: string;
  }) => {
    const response = await api.put(`/posts/${id}`, { title, content });
    return response.data;
  }
);

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts.";
      })

      // Fetch a single post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the post.";
      })

      // Create a post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create post.";
      })

      // Delete a post by ID
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete the post.";
      })

      // Add comment to a post
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, content, id } = action.payload;

        // Update comments in the list of posts
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.comments.push({ id, content, postId });
        }

        // Update comments in currentPost if it matches the postId
        if (state.currentPost && state.currentPost.id === postId) {
          state.currentPost.comments.push({ id, content, postId });
        }
      });
  },
});

export default postSlice.reducer;
