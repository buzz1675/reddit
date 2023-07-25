import { createSlice } from "@reduxjs/toolkit";
import { getSubReddits } from "../api/reddit";

const initialState = {
  subReddits: [],
  error: false,
  isLoading: false,
};

const subRedditSlice = createSlice({
  name: "subReddits",
  initialState,
  reducers: {
    startGetSubReddits(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubRedditsSuccess(state, action) {
      state.isLoading = false;
      state.subReddits = action.payload;
    },
    getSubRedditsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { getSubRedditsFailed, getSubRedditsSuccess, startGetSubReddits } =
  subRedditSlice.actions;

export default subRedditSlice.reducer;

export const fetchSubReddits = () => async (dispatch) => {
  try {
    dispatch(startGetSubReddits());
    const subReddits = await getSubReddits();
    dispatch(getSubRedditsSuccess(subReddits));
  } catch (error) {
    dispatch(getSubRedditsFailed());
  }
};

export const selectSubreddits = (state) => state.subReddits.subReddits;
