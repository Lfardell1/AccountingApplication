import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}
  user: User = { id: 0, username: '' };
  ngOnInit() {
    this.authService
      .retrieveUserDetails()
      .then((user) => {
        this.user = user;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  Logout() {
    this.authService.Logout();
  }
}
