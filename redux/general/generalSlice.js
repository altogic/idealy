import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  feedBackDetailModal: false,
  feedBackSubmitModal: false,
  commentFormModal: false
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.general
      };
    });
  }
});
export const { toggleFeedBackDetailModal, toggleFeedBackSubmitModal, toggleCommentFormModal } =
  generalSlice.actions;
export default generalSlice.reducer;
