import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const repliesSlice = createSlice({
  name: 'replies',
  initialState: {
    replies: {},
    isLoading: false,
    countInfo: {},
    error: null,
    createReplyLoading: false,
    updateReplyLoading: false
  },
  reducers: {
    getReplies: (state) => {
      state.isLoading = true;
    },
    getRepliesSuccess: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = false;
      state.error = action.payload;
    },
    createReply: (state) => {
      state.createReplyLoading = true;
    },
    createReplySuccess: (state, action) => {
      state.createReplyLoading = false;
      if (
        !state.replies[action.payload.commentId]?.find((reply) => reply._id === action.payload._id)
      ) {
        if (state.replies[action.payload.commentId]) {
          state.replies[action.payload.commentId] = [
            ...state.replies[action.payload.commentId],
            action.payload
          ];
        } else {
          state.replies[action.payload.commentId] = [action.payload];
        }
      }
    },
    createReplyFailure: (state, action) => {
      state.createReplyLoading = false;
      state.error = action.payload;
    },
    updateReply: (state) => {
      state.updateReplyLoading = true;
    },
    updateReplySuccess: (state, action) => {
      state.updateReplyLoading = false;
      state.replies[action.payload.commentId] = state.replies[action.payload.commentId].map(
        (reply) => (reply._id === action.payload._id ? action.payload : reply)
      );
    },
    updateReplyFailure: (state, action) => {
      state.updateReplyLoading = false;
      state.error = action.payload;
    },
    deleteReply: (state) => {
      state.isLoading = true;
    },
    deleteReplySuccess: (state, action) => {
      state.isLoading = false;
      state.replies[action.payload.commentId] = state.replies[action.payload.commentId].filter(
        (reply) => reply._id !== action.payload.replyId
      );
    },
    deleteReplyFailure: (state, action) => {
      state.isLoading = false;
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
