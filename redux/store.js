import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { generalSlice } from '@/redux/general/generalSlice';
import { authSlice } from './auth/authSlice';
import { companySlice } from './company/companySlice';
import { topicSlice } from './topics/topicSlice';
import { fileSlice } from './file/fileSlice';
import { notificationSlice } from './notification/notificationSlice';
import rootSaga from './rootSaga';
import { ideaSlice } from './ideas/ideaSlice';
import { commentsSlice } from './comments/commentsSlice';
import { repliesSlice } from './replies/repliesSlice';
import { announcementSlice } from './announcement/announcementSlice';

const sagaMiddleware = createSagaMiddleware();
const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [companySlice.name]: companySlice.reducer,
      [topicSlice.name]: topicSlice.reducer,
      [fileSlice.name]: fileSlice.reducer,
      [notificationSlice.name]: notificationSlice.reducer,
      [ideaSlice.name]: ideaSlice.reducer,
      [commentsSlice.name]: commentsSlice.reducer,
      [generalSlice.name]: generalSlice.reducer,
      [repliesSlice.name]: repliesSlice.reducer,
      [announcementSlice.name]: announcementSlice.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: true, serializableCheck: false }).prepend(sagaMiddleware)
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// eslint-disable-next-line import/prefer-default-export
export const wrapper = createWrapper(makeStore);
