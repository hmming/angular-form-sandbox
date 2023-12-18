import { UserData } from '../../sign-up-form/interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import { fetchUsersSuccess } from '../actions/users.actions';

export const initialState: UserData[] = [];

export const userDataReducer = createReducer(
  initialState,
  on(fetchUsersSuccess, (state, { userData}) => {
    return [...userData]
  })
);
