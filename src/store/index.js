/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../services/authData';
import serviceAPI from '../services/serviceAPI';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [serviceAPI.reducerPath]: serviceAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceAPI.middleware),
});

export default store;
