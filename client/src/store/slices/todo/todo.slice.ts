import { createSlice } from '@reduxjs/toolkit';
import { fetchTodoListThunk, createTodoThunk, deleteTodoThunk, toggleTodoCompletionThunk } from '../../thunk/todo.thunk';
import { ITodo } from '../../types/todo.type';


export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
  } as {
    items: ITodo[],
  },
  reducers: {
    clearTodoState: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoListThunk.fulfilled, (state, { payload }) => {
      state.items = payload;
    });

    builder.addCase(createTodoThunk.fulfilled, (state, { payload }) => {
      state.items = [payload, ...state.items];
    });

    builder.addCase(deleteTodoThunk.fulfilled, (state, { payload }) => {
      state.items = state.items.filter(item => item._id !== payload?._id);
    });

    builder.addCase(toggleTodoCompletionThunk.fulfilled, (state, { payload }) => {
      state.items = state.items.map(item => {
        if (item._id === payload?._id) {
          return payload;
        }

        return item;
      })
    });
  },
});
