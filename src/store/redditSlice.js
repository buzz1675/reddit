import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  getPosts,
  getSubReddits,
  getSubRedditPosts,
  getPostComments,
} from "../api/reddit";

const initialState = {
  posts: [],
  isLoading: false,
  error: false,
  searchTerm: "",
  selectedSubReddit: "/r/pics/",
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    startGetPosts(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostSuccess(state, action) {
      state.posts = action.payload;
      state.isLoading = false;
    },
    getPostFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubReddits(state, action) {
      state.selectedSubReddit = action.payload;
      state.searchTerm = "";
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    startGetComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
  },
});

export const {
  setPosts,
  getPostFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchSearchPosts = (searchTerm) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getPosts(searchTerm);
    const postsWithGoodData = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithGoodData));
  } catch (error) {
    dispatch(getPostFailed());
  }
};

export const getSubPosts = (subReddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubRedditPosts(subReddit);
    const postsWithGoodData = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithGoodData));
  } catch (error) {
    dispatch(getPostFailed());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(startGetComments());
    const comments = await getPostComments(permalink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed());
  }
};

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state)  => state.reddit.searchTerm;
export const selectSelectedSubReddit = (state) =>
  state.reddit.selectedSubReddit;

  export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
      if (searchTerm !== '') {
        return posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      return posts;
    }
  );