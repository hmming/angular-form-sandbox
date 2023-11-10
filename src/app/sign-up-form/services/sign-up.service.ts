import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingStateService } from '../../services/loading-state.service';
import { UserRegistration } from '../sign-up-form/interfaces/UserRegistration';
import { finalize, Observable, retry } from 'rxjs';
import { ApiPaths } from '../enums/enums';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private endpoint = `${environment.baseUrl}${ApiPaths.users}`;

  constructor(
    private http: HttpClient,
    private loadingStateService: LoadingStateService
  ) {}

  submitData(payload: UserRegistration): Observable<object> {
    this.loadingStateService.showSpinner();
    return this.http.post(this.endpoint, payload).pipe(
      retry(2), // should add delay
      finalize(() => {
        this.loadingStateService.hideSpinner();
      })
    );
  }
}
