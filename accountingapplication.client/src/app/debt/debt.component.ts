import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';


interface WeekDetails {
  remainingDebt: number;
  reduction: number;
}



@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [CommonModule, LayoutComponent , FormsModule],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss'
})
export class DebtComponent {
  newDebt: { debtAmount: number; paymentAmount: number; weeksToPay: number } = {
    debtAmount: 0,
    paymentAmount: 0,
    weeksToPay: 0
  };

  weeksToPayArray: WeekDetails[] = [];

  calculateWeeksToPay(): void {
    if (
      this.newDebt.debtAmount &&
      this.newDebt.paymentAmount &&
      this.newDebt.weeksToPay
    ) {
      const remainingDebtPerWeek =
        this.newDebt.debtAmount / this.newDebt.weeksToPay;

      let remainingDebt = this.newDebt.debtAmount;
      for (let i = 0; i < this.newDebt.weeksToPay; i++) {
        const reduction =
          remainingDebt > remainingDebtPerWeek
            ? remainingDebtPerWeek
            : remainingDebt;

        remainingDebt -= reduction;

        const weekDetails: WeekDetails = {
          remainingDebt: remainingDebt,
          reduction: reduction
        };

        this.weeksToPayArray.push(weekDetails);
      }
    }
  }
}
