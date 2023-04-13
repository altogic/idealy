import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
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
  roadmapIdeas: {},
  selectedRoadmap: null
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
      state.roadmapIdeas = {};
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
      state.selectedIdea = {
        ...action.payload,
        mergedIdeasDetail: state.selectedIdea?.mergedIdeasDetail
      };
      if (!_.isEmpty(state.roadmapIdeas)) {
        if (
          !state.ideas.some((idea) => idea._id === action.payload._id) &&
          state.selectedRoadmap._id === action.payload.roadmap._id
        ) {
          state.ideas = [action.payload, ...state.ideas];
        } else if (
          !action.payload.roadmap?._id ||
          state.selectedRoadmap._id !== action.payload?.roadmap._id
        ) {
          state.ideas = state.ideas.filter((idea) => idea._id !== action.payload._id);
        }
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
      } else if (
        !state.ideas.some((idea) => idea._id === action.payload._id) &&
        state.selectedRoadmap?._id === action.payload.roadmap?._id
      ) {
        state.ideas = [action.payload.data, ...state.ideas];
        state.roadmapIdeas = _.groupBy([action.payload], 'status._id');
      }
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
      }
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

      if (state.selectedIdea && state.selectedIdea._id === action.payload.data._id) {
        state.selectedIdea = {
          ...action.payload.data,
          mergedIdeasDetail: state.selectedIdea?.mergedIdeasDetail
        };
      }
      if (!action.payload.isAdminView || !action.payload.isShown) {
        state.ideas = state.ideas.filter(
          (idea) =>
            !(
              idea.isArchived ||
              idea.isPrivate ||
              idea.isCompleted ||
              (action.payload.isRoadmap && !idea.showOnRoadMap)
            )
        );
      }
      if (!_.isEmpty(state.roadmapIdeas)) {
        if (
          !state.ideas.some((idea) => idea._id === action.payload.data._id) &&
          state.selectedRoadmap._id === action.payload.data.roadmap._id &&
          action.payload.isShown
        ) {
          state.ideas = [action.payload.data, ...state.ideas];
        } else if (
          !action.payload.data.roadmap?._id ||
          (!action.payload.data.status &&
            state.selectedRoadmap?._id !== action.payload.data.roadmap?._id)
        ) {
          state.ideas = state.ideas.filter((idea) => idea._id !== action.payload.data._id);
        }
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
      } else if (
        !state.ideas.some((idea) => idea._id === action.payload.data._id) &&
        state.selectedRoadmap?._id === action.payload.data.roadmap?._id &&
        action.payload.isShown
      ) {
        state.ideas = [action.payload.data, ...state.ideas];
        state.roadmapIdeas = _.groupBy([action.payload.data], 'status._id');
      }
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
      }
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
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
      }
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
      if (state.selectedIdea) state.selectedIdea = action.payload.baseIdea;
      if (!_.isEmpty(state.roadmapIdeas)) {
        state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
      }
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
      state.getIdeaLoading = true;
    },
    getIdeasByRoadmapSuccess(state, action) {
      state.getIdeaLoading = false;
      state.roadmapIdeas = action.payload;
      state.ideas = Object.values(state.roadmapIdeas).flat();
    },
    getIdeasByRoadmapFailure(state, action) {
      state.getIdeaLoading = false;
      state.error = action.payload;
    },
    updateIdeasOrder(state) {
      state.isLoading = true;
    },
    updateIdeasOrderSuccess(state) {
      state.isLoading = false;
    },
    updateIdeasOrderRealtime(state, action) {
      state.isLoading = false;
      if (
        action.payload.destinationId !== action.payload.sourceIdea &&
        state.roadmapIdeas[action.payload.destinationId]
      ) {
        state.roadmapIdeas[action.payload.destinationId] = state.roadmapIdeas[
          action.payload.destinationId
        ].filter((idea) => idea._id !== action.payload.sourceIdea._id);
      }
      state.roadmapIdeas[action.payload.sourceId] = action.payload.ideas;
    },
    updateIdeasOrderFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedRoadmap(state, action) {
      state.selectedRoadmap = action.payload;
    },
    searchRoadmapIdeas(state) {
      state.isLoading = true;
    },
    searchRoadmapIdeasSuccess(state, action) {
      state.isLoading = false;
      state.roadmapIdeas = action.payload;
    },
    searchRoadmapIdeasFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSearch(state) {
      state.roadmapIdeas = _.groupBy(state.ideas, 'status._id');
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
