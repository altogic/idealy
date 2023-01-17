import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    countInfo: {},
    isLoading: false,
    createCommentLoading: false,
    updateCommentLoading: false,
    error: null
  },
  reducers: {
    addComment: (state) => {
      state.createCommentLoading = true;
    },
    addCommentSuccess: (state, action) => {
      state.createCommentLoading = false;
      if (!state.comments.find((comment) => comment._id === action.payload._id)) {
        state.comments = [action.payload, ...state.comments];
      }
    },
    addCommentFailure: (state, action) => {
      state.createCommentLoading = false;
      state.error = action.payload;
    },
    getComments: (state) => {
      state.isLoading = true;
    },
    getCommentsSuccess: (state, action) => {
      state.isLoading = false;
      state.countInfo = action.payload.countInfo;
      if (state.countInfo.currentPage === 1) {
        state.comments = action.payload.result;
      } else {
        state.comments = [...state.comments, ...action.payload.result];
      }
    },
    getCommentsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteComment: () => {},
    deleteCommentSuccess: (state, action) => {
      state.comments = state.comments.filter((comment) => comment._id !== action.payload);
    },
    deleteCommentFailure: (state, action) => {
      state.error = action.payload;
    },
    updateComment: (state) => {
      state.updateCommentLoading = true;
    },
    updateCommentSuccess: (state, action) => {
      state.updateCommentLoading = false;
      state.comments = state.comments.map((comment) => {
        if (comment._id === action.payload._id) {
          return action.payload;
        }
        return comment;
      });
    },
    updateCommentFailure: (state, action) => {
      state.updateCommentLoading = false;
      state.error = action.payload;
    },
    addedReply: (state, action) => {
      state.comments = state.comments.map((comment) => {
        if (comment._id === action.payload) {
          return {
            ...comment,
            replyCount: comment.replyCount + 1
          };
        }
        return comment;
      });
    },
    deleteReply: (state, action) => {
      state.comments = state.comments.map((comment) => {
        if (comment._id === action.payload) {
          return {
            ...comment,
            replyCount: comment.replyCount - 1
          };
        }
        return comment;
      });
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
