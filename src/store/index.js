/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import serviceAPI from '../services/serviceAPI';

const store = configureStore({
  reducer: {
    [serviceAPI.reducerPath]: serviceAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceAPI.middleware),
});

export default store;
