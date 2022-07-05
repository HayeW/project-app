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
      next: (user) => {
        console.log("bij de next")
        sessionStorage.setItem('name', (user.username))},
      error: (error) => { { alert(error.error.messages.join('\n')) } },
      complete: () => {
        this.currentUser = sessionStorage.getItem('name'),
        this.loginText = 'U bent ingelogd als: ' + this.currentUser
      }
    })
  }

  clearLoginText(){
    this.loginText=''
    this.user.username=''
    this.user.password=''
  }
}
