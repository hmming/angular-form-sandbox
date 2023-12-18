import { Component, OnInit, OnDestroy, Signal, inject } from '@angular/core';
import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SignUpForm } from './interfaces/SignUpForm';
import { Subject, Observable, combineLatest, takeUntil, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { SignUpService } from '../services/sign-up.service';
import { LoadingStateService } from '../../services/loading-state.service';
import { UserRegistration } from './interfaces/UserRegistration';
import { Store } from '@ngrx/store';
import { saveUser } from '../../store/actions/formData.actions';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgForOf,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
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

  private store = inject(Store);

  stubUserToHelp = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    }
    ];

  constructor(
    private fb: FormBuilder,
    private validationService: FormValidationService,
    private signUpService: SignUpService,
    private loadingStateService: LoadingStateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.subscribeToNameChanges();

    this.isLoadingSignal = this.loadingStateService.isLoadingSignal;
  }

  saveUser() {
    this.store.dispatch(saveUser(this.mapFormObject()))
  }

  private mapFormObject(): UserRegistration {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      userToHelp: this.userToHelp.value
    }
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
      userToHelp: ['', [ Validators.required,]]
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
      userToHelp: this.userToHelp.value
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

  get userToHelp(): FormControl {
    return this.signUpForm?.get('userToHelp') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
