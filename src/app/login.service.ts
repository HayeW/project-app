import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  login(user: User): Observable<string>{
    return this.http.post(
      'http://localhost:8080/login', user,
      {responseType: 'text'}
    )
  }

  save(user: User){
    return this.http.put(
      'http://localhost:8080/login', user
    )
  }
}
