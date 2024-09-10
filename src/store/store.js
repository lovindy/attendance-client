import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from '../services/usersApi';
import { adminsApi } from '../services/adminsApi';
import { teachersApi } from '../services/teachersApi';
import { authApi } from '../services/authApi';

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(adminsApi.middleware)
      .concat(teachersApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
