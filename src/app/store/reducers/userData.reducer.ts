import { UserData } from '../../sign-up-form/interfaces/interfaces';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { fetchUsersSuccess } from '../actions/users.actions';
import { StateKeys } from './enums';


interface UserState {
  blaat: string;
  users: UserData[]
}
export const initialState: UserState = {
  blaat: 'jaja',
  users: [],
};

export const userDataReducer = createReducer(
  initialState,
  on(fetchUsersSuccess, (state, { userData}) => {
    return {
      blaat: 'ok',
      users: [...userData]
    }
  })
);

export const selectUserDataFeature = createFeatureSelector<UserState>(StateKeys.UserData);

export const selectUserData = createSelector(
  selectUserDataFeature,
  (state: UserState) => {
      return state;
  }
)

export const selectUserList = createSelector(
  selectUserData,
  (state: UserState) => {
      return state.users;
  }
)
