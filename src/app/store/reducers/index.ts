import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { formDataReducer } from './formData.reducer';
import { UserRegistration } from '../../sign-up-form/sign-up-form/interfaces/UserRegistration';
import { UserData, UserTodoData } from '../../sign-up-form/interfaces/interfaces';
import { userDataReducer } from './userData.reducer';

export interface State {
 formData: UserRegistration;
 userData: UserData[];
 userTodoData: UserTodoData[];
}

// export const reducers: ActionReducerMap<State> = {
//   formData: formDataReducer,
//   userData: userDataReducer,
// };


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
