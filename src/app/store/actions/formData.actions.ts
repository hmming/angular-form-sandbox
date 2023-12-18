import { createAction, props } from '@ngrx/store';
import { UserRegistration } from '../../sign-up-form/sign-up-form/interfaces/UserRegistration';

export const saveUser = createAction('[sign-up-form] save user', props<UserRegistration>());
