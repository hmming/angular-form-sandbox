import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { exhaustMap, map } from 'rxjs';
import { fetchUsersSuccess } from '../actions/users.actions';
import { UserData } from '../../sign-up-form/interfaces/interfaces';
import { UserDataService } from '../../services/user-data.service';
import { UserDataAction } from '../actions/enums';

export const fetchUsers$ = createEffect(
  (actions$ = inject(Actions), userDataService = inject(UserDataService)) => {
      return actions$.pipe(
        ofType(UserDataAction.fetchUsers),
        exhaustMap(() => {
          return userDataService.fetchUser().pipe(
            map((userData: UserData[]) => {
                return fetchUsersSuccess({ userData });
            })
          )
        })
      )
  },
  {
    functional: true
  }
);
