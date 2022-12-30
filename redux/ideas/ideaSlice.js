import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  ideas: [],
  isLoading: false,
  error: null,
  countInfo: null,
  ideaVotes: [],
  similarIdeas: []
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
      state.countInfo = action.payload.ideas.countInfo;
      state.ideaVotes = [...state.ideaVotes, ...action.payload.votes];
      if (action.payload.type === 'sort' && action.payload.page === 1) {
        state.ideas = action.payload.ideas.result;
      } else {
        state.ideas = [...state.ideas, ...action.payload.ideas.result];
      }
    },
    getIdeasByCompanyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    sortIdeas: (state) => {
      state.isLoading = true;
    },
    sortIdeasSuccess: (state, action) => {
      state.isLoading = false;
      state.ideas = action.payload.ideas.result;
      state.countInfo = action.payload.ideas.countInfo;
      state.ideaVotes = action.payload.votes;
    },
    sortIdeasFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createIdea(state) {
      state.isLoading = true;
    },
    createIdeaSuccess(state, action) {
      state.isLoading = false;
      if (!state.ideas.some((idea) => idea._id === action.payload._id)) {
        state.ideas = [action.payload, ...state.ideas];
      }
    },
    createIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    voteIdea(state) {
      state.isLoading = true;
    },
    voteIdeaSuccess(state, action) {
      try {
        state.isLoading = false;
        if (!state.ideaVotes.some((vote) => vote._id === action.payload._id)) {
          state.ideaVotes = [...state.ideaVotes, action.payload];
        }
        state.ideas = state.ideas.map((idea) => {
          if (idea._id === action.payload.ideaId) {
            return {
              ...idea,
              voteCount: state.ideaVotes.filter((vote) => vote.ideaId === idea._id).length
            };
          }
          return idea;
        });
      } catch (error) {
        console.log(error);
      }
    },
    voteIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    downvoteIdea(state) {
      state.isLoading = true;
    },
    downvoteIdeaSuccess(state, action) {
      state.isLoading = false;
      state.ideaVotes = state.ideaVotes.filter((vote) => vote.ideaId !== action.payload);
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            voteCount: idea.voteCount ? idea.voteCount - 1 : 0
          };
        }
        return idea;
      });
    },
    downvoteIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateIdea(state) {
      state.isLoading = true;
    },
    updateIdeaSuccess(state, action) {
      state.isLoading = false;
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload._id) {
          return action.payload;
        }
        return idea;
      });
    },
    updateIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteIdea(state) {
      state.isLoading = true;
    },
    deleteIdeaSuccess(state, action) {
      state.isLoading = false;
      state.ideas = state.ideas.filter((idea) => idea._id !== action.payload);
    },
    deleteIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchSimilarIdeas(state) {
      state.isLoading = true;
    },
    searchSimilarIdeasSuccess(state, action) {
      state.isLoading = false;
      state.similarIdeas = action.payload;
    },
    searchSimilarIdeasFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSimilarIdeas() {},
    clearSimilarIdeasSuccess(state) {
      state.similarIdeas = [];
    },
    addedNewComment(state, action) {
      try {
        state.ideas = state.ideas.map((idea) => {
          if (idea._id === action.payload.ideaId) {
            const recentUsers = idea.recentUsers
              ? idea.recentUsers?.filter((rc) => rc?.user !== action.payload.data?.user)
              : [];
            return {
              ...idea,
              commentCount: idea.commentCount + 1,
              recentUsers: [...recentUsers, action.payload.data]
            };
          }
          return idea;
        });
      } catch (error) {
        console.log(error);
      }
    },
    createIdeaRealtime() {},
    voteIdeaRealtime() {},
    downvoteIdeaRealtime() {},
    updateIdeaRealtime() {},
    deleteIdeaRealtime() {}
  },
  extraReducers: (builder) => {
    builder.addCase([HYDRATE], (state, action) => ({
      ...state,
      ...action.payload.auth
    }));
  }
});

export const ideaActions = ideaSlice.actions;
export default ideaSlice.reducer;
