import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {
  private loadingSignal = signal<boolean>(false);
  private submitStatusSignal = signal<boolean>(false);
  private isSubmittedSignal = signal<boolean>(false);

  showSpinner(): void {
    this.loadingSignal.set(true);
  }
  hideSpinner(): void {
    this.loadingSignal.set(false);
  }

  get isLoadingSignal(): Signal<boolean> {
    return this.loadingSignal.asReadonly();
  }

  succeeded(): void {
    this.submitStatusSignal.set(true);
  }

  failed(): void {
    this.submitStatusSignal.set(false);
  }

  get isSubmitSucceeded(): Signal<boolean> {
    return this.submitStatusSignal.asReadonly();
  }

  submitted(): void {
    this.isSubmittedSignal.set(true);
  }

  get isSubmitted(): Signal<boolean> {
    return this.isSubmittedSignal.asReadonly();
  }
}
