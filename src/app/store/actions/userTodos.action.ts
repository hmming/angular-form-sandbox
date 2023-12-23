import { createAction, props } from '@ngrx/store';
import { UserDataAction, UserTodosActions } from './enums';
import { UserData, UserTodoData } from '../../sign-up-form/interfaces/interfaces';

export const fetchTodos = createAction(UserTodosActions.fetchTodos)
export const fetchTodosSuccess = createAction(UserTodosActions.fetchTodosSuccess, props<{todoData: UserTodoData[]}>() )
