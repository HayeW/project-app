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
  username: string = ''
  password: string = ''
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(user: User){
    return this.loginService.login(user).subscribe({
      next: () => {},
      error: () => {}
    })
  }
}
