import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet , RouterLink, Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DebtComponent } from './debt/debt.component';
import { TaxComponent } from './tax/tax.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthService } from './auth.service'; // Your authentication service
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isAuthenticated: any = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticatedUser;

    const currentRoute = this.router.url;

    // Redirect unauthenticated users to login or register
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }



}
