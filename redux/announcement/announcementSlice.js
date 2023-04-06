import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState: {
    announcements: [],
    announcement: {},
    countInfo: {},
    isLoading: false,
    createAnnouncementLoading: false,
    updateAnnouncementLoading: false,
    error: null,
    reactions: []
  },
  reducers: {
    createAnnouncement: (state) => {
      state.createAnnouncementLoading = true;
    },
    createAnnouncementSuccess: (state, action) => {
      state.createAnnouncementLoading = false;
      state.announcement = action.payload;
      if (!state.announcements.find((announcement) => announcement._id === action.payload._id)) {
        state.announcements = [action.payload, ...state.announcements];
      } else {
        state.announcements = state.announcements.map((announcement) =>
          announcement._id === action.payload._id ? action.payload : announcement
        );
      }
    },
    createAnnouncementFailure: (state, action) => {
      state.createAnnouncementLoading = false;
      state.error = action.payload;
    },
    updateAnnouncement: (state) => {
      state.updateAnnouncementLoading = true;
    },
    updateAnnouncementSuccess: (state, action) => {
      state.updateAnnouncementLoading = false;
      state.announcements = state.announcements.map((announcement) =>
        announcement._id === action.payload._id ? action.payload : announcement
      );
      state.announcement = action.payload;
    },
    updateAnnouncementFailure: (state, action) => {
      state.updateAnnouncementLoading = false;
      state.error = action.payload;
    },
    getAnnouncements: (state) => {
      state.isLoading = true;
    },
    getAnnouncementsSuccess: (state, action) => {
      state.isLoading = false;
      state.countInfo = action.payload.countInfo;
      if (action.payload.countInfo.currentPage === 1) {
        state.announcements = action.payload.result;
      } else {
        state.announcements = [...state.announcements, ...action.payload.result];
      }
    },
    getAnnouncementsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAnnouncement: (state) => {
      state.isLoading = true;
    },
    deleteAnnouncementSuccess: (state, action) => {
      state.isLoading = false;
      state.announcements = state.announcements.filter(
        (announcement) => announcement._id !== action.payload
      );
    },
    deleteAnnouncementFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAnnouncement: (state) => {
      state.isLoading = true;
    },
    getAnnouncementSuccess: (state, action) => {
      state.isLoading = false;
      state.announcement = action.payload;
    },
    getAnnouncementFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createAnnouncementReaction: (state) => {
      state.isLoading = true;
    },
    createAnnouncementReactionSuccess: (state, action) => {
      state.isLoading = false;
      state.reactions = [...state.reactions, action.payload];
      state.announcements = state.announcements.map((announcement) =>
        announcement._id === action.payload.announcementId
          ? {
              ...announcement,
              reactionCount: {
                ...announcement.reactionCount,
                [action.payload.type]: announcement.reactionCount[action.payload.type] + 1
              }
            }
          : announcement
      );
      if (!_.isEmpty(state.announcement)) {
        state.announcement.reactionCount = {
          ...state.announcement.reactionCount,
          [action.payload.type]: state.announcement.reactionCount[action.payload.type] + 1
        };
      }
    },
    createAnnouncementReactionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAnnouncementReaction: (state) => {
      state.isLoading = true;
    },
    deleteAnnouncementReactionSuccess: (state, action) => {
      state.isLoading = false;
      state.reactions = state.reactions.filter((reaction) => reaction._id !== action.payload._id);
      state.announcements = state.announcements.map((announcement) =>
        announcement._id === action.payload.announcementId
          ? {
              ...announcement,
              reactionCount: {
                ...announcement.reactionCount,
                [action.payload.type]: announcement.reactionCount[action.payload.type] - 1
              }
            }
          : announcement
      );
      if (!_.isEmpty(state.announcement)) {
        state.announcement.reactionCount = {
          ...state.announcement.reactionCount,
          [action.payload.type]: state.announcement.reactionCount[action.payload.type] - 1
        };
      }
    },
    deleteAnnouncementReactionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAnnouncementReactions: (state) => {
      state.isLoading = true;
    },
    getAnnouncementReactionsSuccess: (state, action) => {
      state.isLoading = false;
      state.reactions = action.payload;
    },
    getAnnouncementReactionsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setAnnouncement: (state, action) => {
      state.announcement = action.payload;
    },
    createAnnouncementReactionRealtimeSuccess: (state, action) => {
      state.announcements = state.announcements.map((announcement) =>
        announcement._id === action.payload.announcementId
          ? {
              ...announcement,
              reactionCount: {
                ...announcement.reactionCount,
                [action.payload.type]: announcement.reactionCount[action.payload.type] + 1
              }
            }
          : announcement
      );
      if (!_.isEmpty(state.announcement)) {
        state.announcement.reactionCount = {
          ...state.announcement.reactionCount,
          [action.payload.type]: state.announcement.reactionCount[action.payload.type] + 1
        };
      }
    },
    deleteAnnouncementReactionRealtimeSuccess: (state, action) => {
      state.announcements = state.announcements?.map((announcement) =>
        announcement._id === action.payload.announcementId
          ? {
              ...announcement,
              reactionCount: {
                ...announcement.reactionCount,
                [action.payload.type]: announcement.reactionCount[action.payload.type] - 1
              }
            }
          : announcement
      );
      if (!_.isEmpty(state.announcement)) {
        state.announcement.reactionCount = {
          ...state.announcement.reactionCount,
          [action.payload.type]: state.announcement.reactionCount[action.payload.type] - 1
        };
      }
    },
    resetAnnouncement: (state) => {
      state.announcement = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.comments
    }));
  }
});

export const announcementActions = announcementSlice.actions;
export default announcementSlice.reducer;
