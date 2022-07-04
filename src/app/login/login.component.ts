import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User()
  currentUser = sessionStorage.getItem('name');
  loginText = ''

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    return this.loginService.login(this.user).subscribe({
      next: (username) => {sessionStorage.setItem('name', username)},
      error: (message) => {this.loginText = (message.error)},
      complete: () => {
        this.currentUser = sessionStorage.getItem('name'),
        this.loginText = 'U bent ingelogd als: ' + this.currentUser
      }
    })
  }

  clearLoginText(){
    this.loginText=''
  }
}
