import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  isLoading: false,
  error: null,
  notifications: []
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotifications(state) {
      state.isLoading = true;
    },
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },
    getNotificationsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    markNotificationAsRead(state) {
      state.isLoading = true;
    },
    markNotificationAsReadSuccess(state, action) {
      state.isLoading = false;
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload) {
          return {
            ...notification,
            isRead: true
          };
        }
        return notification;
      });
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
    receiveNotificationRealtime(state) {
      state.isLoading = true;
    },
    receiveNotificationRealtimeSuccess(state, action) {
      state.notifications = [action.payload, ...state.notifications];
      state.isLoading = false;
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
