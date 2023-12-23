import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient,) { }

  fetchUser(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  fetchTodos(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }
}
