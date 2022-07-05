import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  login(user: User): Observable<User>{
    return this.http.post<User>(
      'http://localhost:8080/login', user
    )
  }

  save(user: User){
    return this.http.put(
      'http://localhost:8080/login', user
    )
  }
}
