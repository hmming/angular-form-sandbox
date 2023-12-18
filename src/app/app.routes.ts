import { Routes } from '@angular/router';
import { thankYouGuard } from './guards/thank-you.guard';
import { provideState } from '@ngrx/store';
import { formDataReducer } from './store/reducers/formData.reducer';
import { provideEffects } from '@ngrx/effects';
import { fetchUsers$ } from './store/effects/users.effects';
import { userDataReducer } from './store/reducers/userData.reducer';

export const routes: Routes = [
  {
    path: 'thank-you',
    loadComponent: () =>
      import('./thank-you/thank-you/thank-you.component').then(
        (m) => m.ThankYouComponent
      ),
    canActivate: [thankYouGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./sign-up-form/sign-up-form/sign-up-form.component').then(
        (m) => m.SignUpFormComponent
      ),
    providers: [
      provideState({name: 'formData', reducer: formDataReducer}),
      provideState({name: 'userData', reducer: userDataReducer}),
      provideEffects({ fetchUsers$ })
    ]
  },
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
];
