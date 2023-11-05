import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor( private userService: UserService, private router: Router){}

  logout(){
    this.userService.logout();
    this.router.navigateByUrl("/login");
    window.location.reload();
  }
}
