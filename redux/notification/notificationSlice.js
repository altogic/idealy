import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
  countInfo: {},
  unreadNotificationCount: 0
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotifications: (state) => {
      state.isLoading = true;
    },
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      if (action.payload.info.currentPage === 1) {
        state.notifications = action.payload.data;
      } else {
        state.notifications = [...state.notifications, ...action.payload.data];
      }
      state.countInfo = action.payload.info;
      state.unreadNotificationCount = _.size(action.payload.data.filter((item) => !item.isRead));
    },
    getNotificationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    markNotificationAsRead(state) {
      state.isLoading = true;
    },
    markNotificationAsReadSuccess(state) {
      state.isLoading = false;
      state.unreadNotificationCount = 0;
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
      state.notifications = [action.payload, ...state.notifications];
      state.unreadNotificationCount += 1;
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
