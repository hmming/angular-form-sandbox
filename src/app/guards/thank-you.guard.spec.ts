import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { thankYouGuard } from './thank-you.guard';

describe('thankYouGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => thankYouGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
