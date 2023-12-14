import { Component, OnInit, OnDestroy, Signal } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SignUpForm } from './interfaces/SignUpForm';
import { Subject, Observable, combineLatest, takeUntil, finalize, interval, take, map } from 'rxjs';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { SignUpService } from '../services/sign-up.service';
import { LoadingStateService } from '../../services/loading-state.service';
import { UserRegistration } from './interfaces/UserRegistration';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    HttpClientModule,
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup<SignUpForm>;
  isLoadingSignal!: Signal<boolean>;

  private destroySubject$: Subject<void> = new Subject();

  counter$ = interval(1000).pipe(take(10), map((val) => {
      if(val == 7) {
        throw new Error('bluhhhh!')
      } return val;
  }) );
  counterSig = toSignal(this.counter$);

  constructor(
    private fb: FormBuilder,
    private validationService: FormValidationService,
    private signUpService: SignUpService,
    private loadingStateService: LoadingStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.counterSig();
    } catch (e) {
      console.log(e);
    }

    this.createForm();
    this.subscribeToNameChanges();

    this.isLoadingSignal = this.loadingStateService.isLoadingSignal;
  }

  private createForm(): void {
    // positive lookahead: make sure teh below matches
    // (?=.*[a-z]) match atleast one lowercase
    // (?=.*[A-Z]) match atleast one uppercase
    // /w is equivalent to [a-zA-Z0-9_]
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[\w!@#$%^&*]{8,}$/;
    const fieldsToCrossCheck = ['firstName', 'lastName'];

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, this.validationService.emailValidator()],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(passwordPattern),
          this.validationService.containsFieldValuesValidator(
            fieldsToCrossCheck
          ),
        ],
      ],
    });
  }

  private subscribeToNameChanges(): void {
    const firstName$ = this.firstName.valueChanges as Observable<string>;
    const lastName$ = this.lastName.valueChanges as Observable<string>;


    combineLatest([firstName$, lastName$]) // make sure both streams emits values
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((value: string[]) => {
        const hasNames = value.every((item: string) => {
          return item !== '';
        });

        if (hasNames && !!this.password.value) {
          this.password.updateValueAndValidity();
        }
      });
  }

  onSubmit(): void {
    const payload: UserRegistration = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
    };

    this.signUpService
      .submitData(payload)
      .pipe(
        finalize(() => {
            this.loadingStateService.submitted();
            this.router.navigate(['thank-you'])
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe({
        next: () => {
            this.loadingStateService.succeeded();
        },
        error: () => {
            this.loadingStateService.failed();
        }
      })
  }

  get email(): FormControl {
    return this.signUpForm?.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signUpForm?.get('password') as FormControl;
  }

  get lastName(): FormControl {
    return this.signUpForm?.get('lastName') as FormControl;
  }

  get firstName(): FormControl {
    return this.signUpForm?.get('firstName') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
