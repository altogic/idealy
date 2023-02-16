import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  error: null,
  unreadUserNotifications: [],
  userNotifications: [],
  unreadCompanyNotifications: [],
  companyNotifications: [],
  userCountInfo: null,
  companyCountInfo: null
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getUserNotifications(state) {
      state.isLoading = true;
    },
    getUserNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.unreadUserNotifications = action.payload.data;
    },
    getUserNotificationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllUserNotifications(state) {
      state.isLoading = true;
    },
    getAllUserNotificationsSuccess(state, action) {
      state.isLoading = false;
      if (action.payload.info.currentPage === 1) {
        state.userNotifications = action.payload.data;
      } else {
        state.userNotifications = [...state.userNotifications, ...action.payload.data];
      }
      state.userCountInfo = action.payload.info;
    },
    getAllUserNotificationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCompanyNotifications(state) {
      state.isLoading = true;
    },
    getCompanyNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.unreadCompanyNotifications = action.payload.data;
    },
    getCompanyNotificationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllCompanyNotifications(state) {
      state.isLoading = true;
    },
    getAllCompanyNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.companyCountInfo = action.payload.info;
      if (action.payload.info.currentPage === 1) {
        state.companyNotifications = action.payload.data;
      } else {
        state.companyNotifications = [...state.companyNotifications, ...action.payload.data];
      }
    },
    getAllCompanyNotificationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    markNotificationAsRead(state) {
      state.isLoading = true;
    },
    markNotificationAsReadSuccess(state) {
      state.isLoading = false;
      state.unreadUserNotifications = [];
      state.unreadCompanyNotifications = [];
    },
    markNotificationAsReadFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    sendNotification(state) {
      state.isLoading = true;
    },
    sendNotificationSuccess(state) {
      state.isLoading = false;
    },
    sendNotificationFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    receiveNotificationRealtime(state, action) {
      if (action.payload.targetUser) {
        state.unreadUserNotifications = [action.payload, ...state.unreadUserNotifications];
      } else {
        state.unreadCompanyNotifications = [action.payload, ...state.unreadCompanyNotifications];
        state.isLoading = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase([HYDRATE], (state, action) => ({
      ...state,
      ...action.payload.auth
    }));
  }
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
