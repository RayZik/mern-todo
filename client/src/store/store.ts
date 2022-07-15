import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './slices/todo/todo.slice';

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Selector<S> = (state: RootState) => S;

export default store;
