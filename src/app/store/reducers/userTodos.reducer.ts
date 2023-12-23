import { UserTodoData } from '../../sign-up-form/interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import { fetchTodosSuccess } from '../actions/userTodos.action';

export const initialState: UserTodoData[] = [];

export const userTodosReducer = createReducer(
  initialState,
  on(fetchTodosSuccess, (state, {todoData}) => {
      return [...todoData]
  })
)
