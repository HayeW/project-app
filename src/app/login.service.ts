import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  login(user: User){
    return this.http.post(
      'http://localhost:8080', user
    )
  }

  save(user: User){
    return this.http.put(
      'http://localhost:8080', user
    )
  }
}
