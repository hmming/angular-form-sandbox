import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouComponent } from './thank-you.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingStateService } from '../../services/loading-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  const setupFixture = () => {
    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThankYouComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {},
        },
        {
          provide: LoadingStateService,
          useValue: {
            isSubmitSucceeded: signal(false),
          } as Partial<LoadingStateService>,
        },
      ],
    });
  });

  it('should create', () => {
    setupFixture();
    expect(component).toBeTruthy();
  });

  describe('thank you message', () => {
    describe('with failure submit', () => {
      it('should not be visible', () => {
        setupFixture();
        expect(component.showThankYouMessage).toBeFalse();
      });
    });

    describe('with success submit', () => {
      it('should be visible ', () => {
        TestBed.overrideProvider(LoadingStateService, {
          useValue: {
            isSubmitSucceeded: signal(true),
          } as Partial<LoadingStateService>,
        });
        setupFixture();
        expect(component.showThankYouMessage).toBeTrue();
      });
    });
  });
});
