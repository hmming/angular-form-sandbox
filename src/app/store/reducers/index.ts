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

export interface State {
 formData: UserRegistration
}

export const reducers: ActionReducerMap<State> = {
  formData: formDataReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
