import { CanActivateFn } from '@angular/router';
import { LoadingStateService } from '../services/loading-state.service';
import { inject } from '@angular/core';

export const thankYouGuard: CanActivateFn = () => {
  return inject(LoadingStateService).isSubmitted();
};
