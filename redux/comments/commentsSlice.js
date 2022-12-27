import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isLoading: false,
    error: null
  },
  reducers: {
    addComment: (state) => {
      state.isLoading = true;
    },
    addCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    },
    addCommentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.comments
    }));
  }
});

export const commentActions = commentsSlice.actions;
export default commentsSlice.reducer;
