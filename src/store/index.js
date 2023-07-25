import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  error: false,
  searchTerm: "",
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {},
});
