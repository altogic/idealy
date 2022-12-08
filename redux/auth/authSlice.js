import { createSlice } from '@reduxjs/toolkit';
import AuthService from '@/services/auth';
import { HYDRATE } from 'next-redux-wrapper';
import ToastMessage from '@/utils/toast';

// Initial state
const initialState = {
  isLoading: false,
  changeEmailLoading: false,
  error: null,
  loginError: null,
  registerError: null,
  changePasswordError: null,
  updateProfileError: null,
  changeEmailError: null,
  changeNameError: null,
  filtersError: null,
  savedFilters: [],
  user: AuthService.getUser(),
  profileUser: null,
  isMuted: false,
  isAuthenticated: !!AuthService.getUser(),
  sessions: [],
  foundUsers: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.loginError = action.payload;
    },
    register(state) {
      state.isLoading = true;
    },
    registerSuccess(state) {
      state.isLoading = false;
    },
    registerFailure(state, action) {
      state.isLoading = false;
      state.registerError = action.payload;
    },
    getAuthGrant(state) {
      state.isLoading = true;
    },
    getAuthGrantSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    getAuthGrantFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoading = true;
    },
    logoutSuccess(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    forgotPassword(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state) {
      state.isLoading = false;
      ToastMessage.success('Password reset email sent');
    },
    forgotPasswordFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPassword(state) {
      state.isLoading = true;
    },
    resetPasswordSuccess(state) {
      state.isLoading = false;
    },
    resetPasswordFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resendVerificationEmail(state) {
      state.isLoading = true;
    },
    resendVerificationEmailSuccess(state) {
      state.isLoading = false;
      ToastMessage.success('Email successfully sent');
    },
    resendVerificationEmailFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetErrorsRequest() {},
    changeEmailRequest(state) {
      state.changeEmailLoading = true;
    },
    changeEmailSuccess(state, action) {
      state.changeEmailLoading = false;
      state.user = action.payload;
    },
    changeEmailFailure(state, action) {
      state.changeEmailLoading = false;
      state.changeEmailError = action.payload;
    },
    changePassword(state) {
      state.isLoading = true;
    },
    changePasswordSuccess(state) {
      state.isLoading = false;
      ToastMessage.success('Password changed successfully');
    },
    changePasswordFailure(state, action) {
      state.isLoading = false;
      state.changePasswordError = action.payload;
    },

    authenticateWithProvider(state) {
      state.isLoading = false;
    },
    authenticateWithProviderFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeFilters(state) {
      state.isLoading = true;
      ToastMessage.success('Filter deleted successfully');
    },
    removeFiltersSuccess(state, action) {
      state.isLoading = false;
      state.savedFilters = state.savedFilters.filter((filter) => filter._id !== action.payload);
      state.user.savedFilters = state.user.savedFilters.filter(
        (filter) => filter._id !== action.payload
      );
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    removeFiltersFailure(state, action) {
      state.isLoading = false;
      state.filtersError = action.payload;
    },
    updateNotificationSettings(state) {
      state.isLoading = true;
    },
    updateNotificationSettingsSuccess(state, action) {
      state.isLoading = false;
      state.user.notifications = state.user.notifications.map((notification) => {
        if (notification._id === action.payload._id) {
          return action.payload;
        }
        return notification;
      });
    },
    updateNotificationSettingsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError() {},
    clearErrorSuccess(state) {
      state.error = null;
      state.loginError = null;
      state.registerError = null;
      state.changePasswordError = null;
      state.updateProfileError = null;
      state.changeEmailError = null;
      state.changeNameError = null;
    },
    setUser(state) {
      state.isLoading = true;
    },
    setUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    setUserErrors(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteProfile(state) {
      state.isLoading = true;
    },
    deleteProfileSuccess(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.company = null;
    },
    deleteProfileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateSavedFilters(state) {
      state.isLoading = true;
    },
    updateSavedFiltersSuccess(state, action) {
      state.isLoading = false;
      state.user.savedFilters = state.user.savedFilters.map((savedFilter) => {
        if (savedFilter._id === action.payload._id) {
          return action.payload;
        }
        return savedFilter;
      });
    },
    updateSavedFiltersFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserCompanies(state) {
      state.isLoading = true;
    },
    updateUserProfile(state) {
      state.isLoading = true;
    },
    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    updateUserFailure(state, action) {
      state.isLoading = false;
      state.updateProfileError = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth
    })
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
