import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  ideas: [],
  isLoading: false,
  getIdeaLoading: false,
  error: null,
  countInfo: null,
  selectedIdea: null,
  ideaVotes: [],
  similarIdeas: [],
  searchedCompanyMembers: [],
  editedIdea: null,
  roadmapIdeas: []
};

export const ideaSlice = createSlice({
  name: 'idea',
  initialState,
  reducers: {
    getIdeasByCompany: (state) => {
      state.getIdeaLoading = true;
    },
    getIdeasByCompanySuccess: (state, action) => {
      state.getIdeaLoading = false;
      state.countInfo = action.payload.countInfo;
      if (action.payload.countInfo.currentPage === 1) {
        state.ideas = action.payload.result;
      } else {
        state.ideas = [...state.ideas, ...action.payload.result];
      }
    },
    getIdeasByCompanyFailure: (state, action) => {
      state.getIdeaLoading = false;
      state.error = action.payload;
    },
    createIdea(state) {
      state.isLoading = true;
    },
    createIdeaSuccess(state, action) {
      state.isLoading = false;
      if (!state.ideas.find((idea) => idea._id === action.payload._id)) {
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
      state.isLoading = false;

      state.ideaVotes = [...state.ideaVotes, action.payload];
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload.ideaId) {
          return {
            ...idea,
            voteCount: idea.voteCount + 1
          };
        }
        return idea;
      });
      if (state.selectedIdea) {
        state.selectedIdea.voteCount += 1;
      }
    },
    voteIdeaFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    downVoteIdea(state) {
      state.isLoading = true;
    },
    downVoteIdeaSuccess(state, action) {
      state.isLoading = false;
      state.ideaVotes = state.ideaVotes.filter((vote) => vote._id !== action.payload._id);
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload.ideaId) {
          return {
            ...idea,
            voteCount: idea.voteCount ? idea.voteCount - 1 : 0
          };
        }
        return idea;
      });
      if (state.selectedIdea) {
        state.selectedIdea.voteCount = state.selectedIdea.voteCount
          ? state.selectedIdea.voteCount - 1
          : 0;
      }
    },
    downVoteIdeaFailure(state, action) {
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
      state.selectedIdea = action.payload;
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
    clearSimilarIdeas(state) {
      state.similarIdeas = [];
    },
    addedNewComment(state, action) {
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            commentCount: idea.commentCount + 1
          };
        }
        return idea;
      });
      if (state.selectedIdea) {
        state.selectedIdea.commentCount += 1;
      }
    },
    setSelectedIdea(state, action) {
      state.selectedIdea = action.payload;
    },
    deleteIdeaCoverImage(state) {
      state.isLoading = true;
    },
    deleteIdeaCoverImageSuccess(state, action) {
      state.isLoading = false;
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            coverImage: null
          };
        }
        return idea;
      });
      state.selectedIdea = {
        ...state.selectedIdea,
        coverImage: null
      };
    },
    deleteIdeaCoverImageFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserVotes() {},
    getUserVotesSuccess(state, action) {
      state.ideaVotes = action.payload;
    },
    getUserVotesFailure(state, action) {
      state.error = action.payload;
    },
    updateIdeaRealtime(state, action) {
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload.data._id) {
          return action.payload.data;
        }
        return idea;
      });
      if (!action.payload.isAdminView) {
        state.ideas = state.ideas.filter(
          (idea) => !(idea.isArchived || idea.isPrivate || idea.isCompleted)
        );
      }
      state.selectedIdea = action.payload.data;
    },
    deleteIdeaStatus(state) {
      state.isLoading = true;
    },
    deleteIdeaStatusSuccess(state, action) {
      state.isLoading = false;
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            status: null
          };
        }
        return idea;
      });
      state.selectedIdea = {
        ...state.selectedIdea,
        status: null
      };
    },
    deleteIdeaStatusFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteComment(state, action) {
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            commentCount: idea.commentCount - 1
          };
        }
        return idea;
      });
      if (state.selectedIdea) {
        state.selectedIdea.commentCount -= 1;
      }
    },
    searchCompanyMembers(state) {
      state.isLoading = true;
    },
    searchCompanyMembersSuccess(state, action) {
      state.isLoading = false;
      state.searchedCompanyMembers = [...action.payload.members, ...action.payload.users];
    },
    searchCompanyMembersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    downVoteIdeaRealtime(state, action) {
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            voteCount: idea.voteCount ? idea.voteCount - 1 : 0
          };
        }
        return idea;
      });
      if (state.selectedIdea) {
        state.selectedIdea.voteCount = state.selectedIdea.voteCount
          ? state.selectedIdea.voteCount - 1
          : 0;
      }
    },
    upVoteIdeaRealtime(state, action) {
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload) {
          return {
            ...idea,
            voteCount: idea.voteCount + 1
          };
        }
        return idea;
      });
      if (state.selectedIdea) {
        state.selectedIdea.voteCount += 1;
      }
    },

    approveAllIdeas(state) {
      state.isLoading = true;
    },
    approveAllIdeasSuccess(state) {
      state.isLoading = false;
      state.ideas = state.ideas.map((idea) => ({
        ...idea,
        isApproved: true
      }));
    },
    approveAllIdeasFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateGuestAuthor(state, action) {
      state.ideas = state.ideas.map((idea) => {
        if (idea.guestEmail === action.payload.email) {
          return {
            ...idea,
            guestEmail: action.payload.email,
            guestName: action.payload.name,
            guestAvatar: action.payload.avatar
          };
        }
        return idea;
      });
    },
    mergeIdeas(state) {
      state.isLoading = true;
    },
    mergeIdeasSuccess(state, action) {
      state.isLoading = false;
      state.ideas = state.ideas.filter((idea) => idea._id !== action.payload.mergedIdea);
      state.ideas = state.ideas.map((idea) => {
        if (idea._id === action.payload.baseIdea._id) {
          return action.payload.baseIdea;
        }
        return idea;
      });
      state.selectedIdea = action.payload.baseIdea;
      state.ideaVotes = [...state.ideaVotes, ...action.payload.ideaVotes];
    },
    mergeIdeasFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMergedIdeas(state) {
      state.isLoading = true;
    },
    getMergedIdeasSuccess(state, action) {
      state.isLoading = false;
      state.selectedIdea = {
        ...state.selectedIdea,
        mergedIdeasDetail: action.payload.result
      };
    },
    getMergedIdeasFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchIdeas(state) {
      state.isLoading = true;
    },
    searchIdeasSuccess(state, action) {
      state.isLoading = false;
      state.ideas = action.payload;
    },
    searchIdeasFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getIdeaById(state) {
      state.isLoading = true;
    },
    getIdeaByIdSuccess(state, action) {
      state.isLoading = false;
      state.selectedIdea = action.payload;
    },
    getIdeaByIdFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setEditedIdea(state, action) {
      state.editedIdea = action.payload;
    },
    getIdeasByRoadmap(state) {
      state.isLoading = true;
    },
    getIdeasByRoadmapSuccess(state, action) {
      state.isLoading = false;
      state.roadmapIdeas = action.payload;
    },
    getIdeasByRoadmapFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateIdeasOrder(state) {
      state.isLoading = true;
    },
    updateIdeasOrderSuccess(state) {
      state.isLoading = false;
    },
    updateIdeasOrderFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
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
