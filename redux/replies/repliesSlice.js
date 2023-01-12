import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const repliesSlice = createSlice({
  name: 'replies',
  initialState: {
    replies: {},
    loading: false,
    countInfo: {},
    error: null
  },
  reducers: {
    getReplies: (state) => {
      state.loading = true;
    },
    getRepliesSuccess: (state, action) => {
      state.loading = false;
      state.countInfo[action.payload.commentId] = action.payload.countInfo;
      if (state.countInfo[action.payload.commentId].currentPage === 1) {
        state.replies[action.payload.commentId] = action.payload.result;
      } else {
        state.replies[action.payload.commentId] = [
          ...state.replies[action.payload.commentId],
          ...action.payload.result
        ];
      }
    },
    getRepliesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createReply: (state) => {
      state.loading = true;
    },
    createReplySuccess: (state, action) => {
      state.loading = false;
      if (state.replies[action.payload.commentId]) {
        state.replies[action.payload.commentId] = [
          ...state.replies[action.payload.commentId],
          action.payload
        ];
      } else {
        state.replies[action.payload.commentId] = action.payload;
      }
    },
    createReplyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateReply: (state) => {
      state.loading = true;
    },
    updateReplySuccess: (state, action) => {
      state.loading = false;
      state.replies = state.replies.map((reply) =>
        reply.id === action.payload.id ? action.payload : reply
      );
    },
    updateReplyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReply: (state) => {
      state.loading = true;
    },
    deleteReplySuccess: (state, action) => {
      state.loading = false;
      state.replies = state.replies.filter((reply) => reply.id !== action.payload);
    },
    deleteReplyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.replies
    }));
  }
});

export const repliesActions = repliesSlice.actions;
export default repliesSlice.reducer;
