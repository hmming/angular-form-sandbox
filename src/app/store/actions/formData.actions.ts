import { createAction, props } from '@ngrx/store';
import { UserRegistration } from '../../sign-up-form/sign-up-form/interfaces/UserRegistration';
import { FormDataActions } from './enums';

export const saveUser = createAction(FormDataActions.saveUser, props<UserRegistration>());
