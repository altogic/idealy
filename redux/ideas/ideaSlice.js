import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  ideas: [],
  isLoading: false,
  error: null,
  countInfo: null
};

export const ideaSlice = createSlice({
  name: 'idea',
  initialState,
  reducers: {
    getIdeasByCompany: (state) => {
      state.isLoading = true;
    },
    getIdeasByCompanySuccess: (state, action) => {
      state.isLoading = false;
      state.ideas = [...state.ideas, ...action.payload.result];
      state.countInfo = action.payload.countInfo;
    },
    getIdeasByCompanyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createIdea(state) {
      state.isLoading = true;
    },
    createIdeaSuccess(state, action) {
      state.isLoading = false;
      state.ideas = [...state.ideas, action.payload];
    },
    createIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.idea
    })
  }
});

export const ideaActions = ideaSlice.actions;
export default ideaSlice.reducer;
