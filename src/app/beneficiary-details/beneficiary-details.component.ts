import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchTodos } from '../store/actions/userTodos.action';

@Component({
  selector: 'app-beneficiary-details',
  standalone: true,
  imports: [],
  templateUrl: './beneficiary-details.component.html',
  styleUrl: './beneficiary-details.component.scss'
})
export class BeneficiaryDetailsComponent {
  private store = inject(Store);

  constructor() {
    this.store.dispatch(fetchTodos());
  }
}
