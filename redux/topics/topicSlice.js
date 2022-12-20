import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  error: null,
  topics: [],
  statuses: []
};

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    getTopics(state) {
      state.isLoading = true;
    },
    getTopicsSuccess(state, action) {
      state.isLoading = false;
      state.topics = action.payload;
    },
    getTopicsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getStatuses(state) {
      state.isLoading = true;
    },
    getStatusesSuccess(state, action) {
      state.isLoading = false;
      state.statuses = action.payload;
    },
    getStatusesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.topic
    })
  }
});

export const topicActions = topicSlice.actions;
export default topicSlice.reducer;
