import { createReducer, on } from '@ngrx/store';
import { saveUser } from '../actions/formData.actions';
import { UserRegistration } from '../../sign-up-form/sign-up-form/interfaces/UserRegistration';

export const initialState: UserRegistration = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userToHelp: ''
};

export const formDataReducer = createReducer(
  initialState,
  on(saveUser, (state, formData) => {
    return formData
  })
);
