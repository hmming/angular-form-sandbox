import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Store } from '@ngrx/store';
import { exhaustMap, map, withLatestFrom } from 'rxjs';
import { UserTodosActions } from '../actions/enums';
import { fetchTodosSuccess } from '../actions/userTodos.action';
import { UserTodoData } from '../../sign-up-form/interfaces/interfaces';

export const fetchTodos$ = createEffect(
  (
    actions$ = inject(Actions),
    userDataService = inject(UserDataService),
    store$ = inject(Store)
    ) => {
      return actions$.pipe(
        ofType(UserTodosActions.fetchTodos),
        exhaustMap(() => {
          return userDataService.fetchTodos().pipe(
            withLatestFrom(store$),
            map(([todos, store$]) => {
              const todoData = todos.filter((todo: UserTodoData) => {
                  return todo.userId === store$.formData.userToHelp;
              });
              return fetchTodosSuccess({ todoData });
            })
          )
        })
    )
  },
  {
    functional: true
  }
)
