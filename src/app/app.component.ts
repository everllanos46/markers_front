import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: boolean = false;
  constructor(private userService: UserService) {
    let currentToken = this.userService.currentTokenValue;
    if (currentToken) {
      this.user = true;
    }
  }
  title = 'markers-front';
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
}
