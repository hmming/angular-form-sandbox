import { createAction, props } from '@ngrx/store';
import { UserData } from '../../sign-up-form/interfaces/interfaces';
import { UserDataAction } from './enums';

export const fetchUsers = createAction(UserDataAction.fetchUsers)
export const fetchUsersSuccess = createAction(UserDataAction.fetchUsersSuccess, props<{userData: UserData[]}>() )
