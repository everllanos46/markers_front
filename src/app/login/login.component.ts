import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  remail: string = "";
  ruser: string = "";
  rpassword: string = "";
  rcpassword: string = "";

  constructor(private userService: UserService, private router: Router) {

  }

  login() {
    this.userService.login(this.email, this.password).subscribe(data => {
      console.log(data.status);
      if(data.status==200){
        this.router.navigateByUrl("/");
            window.location.reload();
      }
    });
  }

  register() {
  }
}
