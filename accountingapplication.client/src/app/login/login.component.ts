import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginError: string | null = null;
  signupError: string | null = null;
  user: { username: string; password: string } = { username: '', password: '' };
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

  }
  // Handle the login - make call to authservice to login
  onLogin(username: string, password: string): void {
    // handle checks for empty username and password
    if (username === '' || password === '') {
      this.loginError = 'Username and password are required.';
      return;
    }else{
    this.authService
      .login(username, password)
      .subscribe((
        (success) => {
          this.isAuthenticated = true;
        }
      ),
      (error) => {
        // Handle errors here based on specific error messages
        this.loginError = error;
      });

    }

  }


  // Handle the register - make call to authservice to register
  onRegister(username: string, password: string): void {
    // handle checks for empty username and password
    if (username === '' || password === '') {
      this.signupError = 'Username and password are required.';
      return;
    }else{
    this.authService
    .signup(username, password).subscribe(
      (success) => {
        // Happy Registration, allow error checks to occur but authservice takes care of the rest
      },
      (error) => {
        // Handle errors here based on specific error messages
        this.signupError = error;
      }
    );
    }
  }
}
