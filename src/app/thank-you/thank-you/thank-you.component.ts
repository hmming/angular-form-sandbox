import { Component, OnInit, Signal } from '@angular/core';
import { LoadingStateService } from '../../services/loading-state.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { SnackBarMessages } from '../enums/enums';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  standalone: true,
  imports: [NgIf, MatSnackBarModule],
})
export class ThankYouComponent implements OnInit {
  showThankYouMessage = false;
  isSubmitSucceededSignal!: Signal<boolean>;

  constructor(
    private loadingStateService: LoadingStateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isSubmitSucceededSignal = this.loadingStateService.isSubmitSucceeded;
    const config = new MatSnackBarConfig();
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    if (this.isSubmitSucceededSignal()) {
      this.showThankYouMessage = true;
      config.panelClass = ['snackbar--success'];
      this.snackBar.open(SnackBarMessages.success, 'x', config);
    } else {
      this.showThankYouMessage = false;
      config.panelClass = ['snackbar--failure'];
      this.snackBar.open(SnackBarMessages.error, 'x', config);
    }
  }
}
