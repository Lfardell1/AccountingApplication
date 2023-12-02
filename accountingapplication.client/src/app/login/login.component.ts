import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginError: string | null = null;
  signupError: string | null = null;
  user: { username: string, password: string } = { username: '', password: '' };
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  onLogin(username: string, password: string): void {
    this.authService.login(username, password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.isAuthenticated = true;
          // Navigate to a different page or perform actions for successful login
        } else {
          this.loginError = 'Invalid username or password.';
          // Handle unsuccessful login
        }
      });
  }

  onRegister(username: string, password: string): void {
    this.authService.signup({ username, password })
      .subscribe((isRegistered: boolean) => {
        if (isRegistered) {
          // Perform actions for successful registration
        } else {
          this.signupError = 'Registration failed. Please try again.';
          // Handle unsuccessful registration
        }
      });
  }

  async checkAuthentication(): Promise<void> {
    try {
      const isAuthenticated: boolean = await this.authService.isAuthenticatedUser();
      this.isAuthenticated = isAuthenticated;
      console.log('Authenticated:', this.isAuthenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      const result = await this.authService.logout();
      console.log('Logout successful:', result);
      this.isAuthenticated = false; // Update authentication status after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
