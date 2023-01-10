import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  feedBackDetailModal: false,
  feedBackSubmitModal: false,
  commentFormModal: false,
  deleteFeedBackModal: false
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    toggleFeedBackDetailModal: (state) => {
      state.feedBackDetailModal = !state.feedBackDetailModal;
    },
    toggleFeedBackSubmitModal: (state) => {
      state.feedBackSubmitModal = !state.feedBackSubmitModal;
    },
    toggleCommentFormModal: (state) => {
      state.commentFormModal = !state.commentFormModal;
    },
    toggleDeleteFeedBackModal: (state) => {
      state.deleteFeedBackModal = !state.deleteFeedBackModal;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.general
    }));
  }
});
export const {
  toggleFeedBackDetailModal,
  toggleFeedBackSubmitModal,
  toggleCommentFormModal,
  toggleDeleteFeedBackModal
} = generalSlice.actions;
export default generalSlice.reducer;
