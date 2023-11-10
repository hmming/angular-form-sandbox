import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { SignUpService } from '../services/sign-up.service';
import { FormControl } from '@angular/forms';
import { UserRegistration } from './interfaces/UserRegistration';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ThankYouComponent } from '../../thank-you/thank-you/thank-you.component';
import { LoadingStateService } from '../../services/loading-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { FormValidationService } from '../services/form-validation.service';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  const setupFixture = () => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const fakeSignUpService = jasmine.createSpyObj<SignUpService>(
    'SignUpServiceStub',
    {
      submitData: of({ data: 'some data' }),
    }
  );

  const fakeLoadingStateService = jasmine.createSpyObj<LoadingStateService>(
    'LoadingStateService',
    {
      succeeded: undefined,
      failed: undefined,
    },
    {
      isSubmitSucceeded: signal(false),
      isLoadingSignal: signal(false),
    }
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SignUpFormComponent,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'thank-you', component: ThankYouComponent },
        ]),
      ],
      providers: [
        {
          provide: SignUpService,
          useValue: fakeSignUpService,
        },
        {
          provide: LoadingStateService,
          useValue: fakeLoadingStateService,
        },
        {
          provide: FormValidationService,
        },
      ],
    });
  });

  it('should create', () => {
    setupFixture();
    expect(component).toBeTruthy();
  });

  describe('all fields', () => {
    it('should be required', () => {
      setupFixture();
      const firstName = component.firstName;
      const lastName = component.lastName;
      const email = component.email;
      const password = component.password;

      const allFields = [firstName, lastName, email, password];

      allFields.forEach((field) => {
        expect(field.hasError('required')).toBeTrue();
      });

      allFields.forEach((field) => {
        field.setValue('some value');
        expect(field.hasError('required')).toBeFalse();
      });
    });
  });

  describe('emailChecks', () => {
    let email: FormControl;

    beforeEach(() => {
      setupFixture();
      email = component.email;
    });

    afterEach(() => {
      email.setValue('');
    });

    it('should be invalid', () => {
      email.setValue('notv@lidEmail');
      expect(email.hasError('emailValidation')).toBeTrue();
    });
    it('should be valid', () => {
      email.setValue('v@lid.email');
      expect(email.hasError('emailValidation')).toBeFalse();
    });
  });

  describe('passwordChecks', () => {
    let password: FormControl;
    let firstName: FormControl;
    let lastName: FormControl;

    beforeEach(() => {
      setupFixture();
      password = component.password;
      firstName = component.firstName;
      lastName = component.lastName;
    });

    afterEach(() => {
      password.setValue('');
      firstName.setValue('');
      lastName.setValue('');
    });

    it('should have minlength of 8', () => {
      password.setValue('short');
      expect(password.hasError('minlength')).toBeTrue();

      password.setValue('longenough');
      expect(password.hasError('minlength')).toBeFalse();
    });

    it('should have upper case and lower case', () => {
      password.setValue('nouppercase');
      expect(password.hasError('pattern')).toBeTrue();
      password.setValue('NOLOWERCASE');
      expect(password.hasError('pattern')).toBeTrue();

      password.setValue('correctPassword');
      expect(password.hasError('pattern')).toBeFalse();

      password.setValue('withNumbers123');
      expect(password.hasError('pattern')).toBeFalse();
    });
    it('should allow numbers and !@#$%^&*_', () => {
      password.setValue('withNumbers123');
      expect(password.hasError('pattern')).toBeFalse();
      password.setValue('withSpecialChars!@#$%^&*123_');
      expect(password.hasError('pattern')).toBeFalse();
    });

    it('should not contain names (case-insensitive)', () => {
      firstName.setValue('John Samuel');
      lastName.setValue('Doe');
      password.setValue('correctPasswordJohn');
      expect(password.hasError('passwordChecks')).toBeTrue();

      password.setValue('inCorrectPasswordSamuel');
      expect(password.hasError('passwordChecks')).toBeTrue();

      password.setValue('inCorrectPasswordsamuel');
      expect(password.hasError('passwordChecks')).toBeTrue();

      password.setValue('inCorrectPasswordDoe');
      expect(password.hasError('passwordChecks')).toBeTrue();

      password.setValue('inCorrectPassworddoe');
      expect(password.hasError('passwordChecks')).toBeTrue();

      password.setValue('inCorrectPasswordJohnSamuelDoe');
      expect(password.hasError('passwordChecks')).toBeTrue();

      password.setValue('correctPasswordohnamueloe');
      expect(password.hasError('passwordChecks')).toBeFalse();
    });

    it('should trigger password.updateValueAndValidity when all names are filled', () => {
      const spy = spyOn(password, 'updateValueAndValidity').and.callThrough();
      password.setValue('secretspassword');
      firstName.setValue('a');
      lastName.setValue('b');
      expect(spy).toHaveBeenCalled();
      spy.calls.reset();

      lastName.setValue('');
      expect(spy).not.toHaveBeenCalled();
      spy.calls.reset();
    });
  });

  describe('onSubmit', () => {
    it('should trigger signUpService.submitData with payload', () => {
      setupFixture();

      component.firstName.setValue('john');
      component.lastName.setValue('doe');
      component.email.setValue('a@a.com');
      component.password.setValue('helloWorld');
      component.onSubmit();

      const expectedPayload: UserRegistration = {
        firstName: 'john',
        lastName: 'doe',
        email: 'a@a.com',
        password: 'helloWorld',
      };

      expect(fakeSignUpService.submitData).toHaveBeenCalledWith(
        expectedPayload
      );
      expect(fakeLoadingStateService.succeeded).toHaveBeenCalled();
    });

    it('should set a failed state', () => {
      TestBed.overrideProvider(SignUpService, {
        useValue: {
          submitData: () => {
            return throwError(() => new Error());
          },
        },
      });
      setupFixture();
      component.onSubmit();
      expect(fakeLoadingStateService.failed).toHaveBeenCalled();
    });
  });
});
