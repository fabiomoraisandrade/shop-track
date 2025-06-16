import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "../../redux/reducers";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const renderWithReduxAndRouter = (
  component,
  {
    initialState = {},
    store = configureStore({
      reducer: persistReducer(persistConfig, rootReducer),
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      devTools: process.env.NODE_ENV !== 'production',
    }),
  } = {},
  {
    route = '/',
  } = {}
) => ({
  ...render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </Provider>
  ),
  store,
});

export default renderWithReduxAndRouter;