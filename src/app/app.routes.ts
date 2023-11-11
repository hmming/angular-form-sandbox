import { Routes } from '@angular/router';
import { thankYouGuard } from './guards/thank-you.guard';

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
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
