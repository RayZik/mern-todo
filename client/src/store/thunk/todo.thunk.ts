import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';
import { ThunkWithCallback } from '../types/shared.type';
import { ICreateTodoDTO, ITodo } from '../types/todo.type';

export const fetchTodoListThunk = createAsyncThunk<
  ITodo[]
>('todo/fetchList', async () => {
  return await API.Todo.getList();
});

export const createTodoThunk = createAsyncThunk<
  ITodo,
  ICreateTodoDTO & ThunkWithCallback
>('todo/create', async (params) => {
  try {
    const data = await API.Todo.create({
      title: params.title,
    });

    params.callback(null, data);

    return data;
  } catch (error) {
    params.callback(error);
  }
});

export const deleteTodoThunk = createAsyncThunk<
  { _id: string } | undefined,
  { id: string } & ThunkWithCallback
>('todo/delete', async (params) => {
  try {
    await API.Todo.removeById(params.id);
    const data = {
      _id: params.id,
    }

    params.callback(null, data);

    return data;
  } catch (error) {
    params.callback(error);
  }
});

export const toggleTodoCompletionThunk = createAsyncThunk<
  ITodo,
  { id: string } & ThunkWithCallback
>('todo/toggle-completion', async (params) => {
  try {
    const data = await API.Todo.toggleCompletion(params.id);

    params.callback(null, data);

    return data;
  } catch (error) {
    params.callback(error);
  }
});
