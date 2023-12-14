import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { counterReducer } from './counter.reducer';

export interface State {
 counter: number;
}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
