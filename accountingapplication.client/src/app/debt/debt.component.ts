import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { AuthService, Debts, User } from '../auth.service';

interface WeekDetails {
  remainingDebt: number;
  reduction: number;
}

@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [CommonModule, LayoutComponent, FormsModule],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss',
})
export class DebtComponent {
  user: User = { id: 0, username: '' };
  Debt: Debts = { amount: 0, paymentAmount: 0, userId: 0 };
  weeksToPayArray: WeekDetails[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .retrieveUserDetails()
      .then((user) => {
        this.user = user;
        this.authService.retriveUserDebt(this.user.id).subscribe(
          (debt) => {
            this.Debt.amount = debt.amount;
            this.Debt.paymentAmount = debt.paymentAmount;
            this.Debt.weeksToPay = debt.weeksToPay;
            this.Debt.userId = debt.userId;
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  SaveToProfile(): void {
    this.authService.saveDebtDetails(this.user.id, this.Debt).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Error saving debt details: ', error);
      }
    );
  }

  calculateWeeksToPay(): void {
    this.weeksToPayArray = [];
    var originalpayment = this.Debt.paymentAmount;
    var originalWeeksToPay = this.Debt.weeksToPay;
    if (this.Debt.amount && this.Debt.paymentAmount && this.Debt.weeksToPay) {
      // Calculate weeks to pay
      const remainingDebtPerWeek = this.Debt.amount / this.Debt.weeksToPay;
      let remainingDebt = this.Debt.amount;
      for (let i = 0; i < this.Debt.weeksToPay; i++) {
        const reduction =
          remainingDebt > remainingDebtPerWeek
            ? remainingDebtPerWeek
            : remainingDebt;

        remainingDebt -= reduction;

        const weekDetails: WeekDetails = {
          remainingDebt: remainingDebt,
          reduction: reduction,
        };

        this.weeksToPayArray.push(weekDetails);
      }
    }
  }

  onAmountChange(event: Event): void {
    this.Debt.paymentAmount = Number((event.target as HTMLInputElement).value);

    this.Debt.weeksToPay = Math.floor(
      this.Debt.amount / this.Debt.paymentAmount!
    );
  }

  onWeeksToPayChange(event: Event): void {
    this.Debt.paymentAmount = Number((event.target as HTMLInputElement).value);

    this.Debt.paymentAmount = Math.floor(
      this.Debt.amount / this.Debt.weeksToPay!
    );
  }
}
