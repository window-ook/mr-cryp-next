import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import chartReducer from './chartSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      chart: chartReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
