import { Component } from '@angular/core';
import { AuthService, User, Incomes, Debts, Transactions, Expenses } from './../auth.service';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { CommonModule } from '@angular/common';
import { switchMap, from } from 'rxjs';
import { transition } from '@angular/animations';

interface WeekDetails {
  remainingDebt: number;
  reduction: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, LayoutComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: User = { id: 0, username: '' };
  Incomes: Incomes[] = [];
  TaxableIncome: number = 0;
  Monthly: number = 0;
  NetMonthlyIncome: number = 0;
  NetMonthlyExpenses: number = 0;
  NetMonthlyDebtPayments: number = 0;
  Debt: Debts = { amount: 0, paymentAmount: 0, userId: 0 };
  weeksToPayArray: WeekDetails[] = [];
  Expenses: Expenses[] = [];
  deductions: number = 0;
  Transactions: Transactions[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.retrieveUserDetails();

  }

  retrieveUserDetails() {
    this.authService.retrieveUserDetails().then((user) => {
      this.user = user;
      this.retrieveUserIncomes();
      this.retrieveUserTransactions();
    }).catch((err) => {
      console.error(err);
    });
  }
  private retrieveUserTransactions() {
    this.Transactions = [];
    this.authService.retrieveUserTransaction(this.user.id).subscribe(
      (transactions) => {
        transactions.forEach(transaction => {
          if (transaction.category == 'Expense' || transaction.category == 'Income') {
            this.Transactions.push(transaction);
        }});
        transactions.forEach((transaction => {
         if(transaction.category == "Deduction"){
          this.deductions += transaction.amount;
         }
        }
        ))
        transactions.forEach((curtransaction => {
          if(curtransaction.category == "Expense"){
          this.NetMonthlyExpenses += curtransaction.amount;
          }
        }
        ));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  retrieveUserIncomes() {
    this.authService.retrieveUserIncomes(this.user.id).subscribe(
      (incomes) => {
        this.Incomes = incomes;
        this.TaxManagement();
        this.retrieveUserDebt();
        this.retrieveUserExpenses();
      },
      (error) => {
        console.error('Failed to retrieve user incomes:', error);
      }
    );
  }

  retrieveUserExpenses(){
    this.authService.retrieveUserExpenses(this.user.id).subscribe(
      (expenses) => {
        this.Expenses = expenses;
        expenses.forEach((expense => {
          this.NetMonthlyExpenses += expense.price;
          }));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  retrieveUserDebt() {
    this.authService.retriveUserDebt(this.user.id).subscribe(
      (debt) => {
        this.Debt.amount = debt.amount;
        this.Debt.paymentAmount = debt.paymentAmount;
        this.Debt.weeksToPay = debt.weeksToPay;
        this.Debt.userId = debt.userId;
        this.CalculateDebt();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  CalculateDebt() {
    const remainingDebtPerWeek = this.Debt.amount / this.Debt.weeksToPay!;
    let remainingDebt = this.Debt.amount;
    for (let i = 0; i < this.Debt.weeksToPay!; i++) {
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

  addIncome(incomeForm: any) {
    if (incomeForm.valid) {
      var newIncome = {
        incomeId: 0,
        source: incomeForm.value.source,
        amount: incomeForm.value.amount,
        UserId: this.user.id,
      };
      this.authService.addIncome(newIncome).subscribe(
        (response) => {
          newIncome.incomeId = response.incomeId!;

          // Replace 'incomeId' with the actual property name from the response
          console.log('New Income ID:', newIncome.incomeId);
          this.retrieveUserIncomes();

          incomeForm.resetForm();
        },
        (error) => {
          console.error('Failed to add income:', error);
        }
      );
    }
  }

  deleteIncome(incomeId: number) {
    this.authService.deleteIncome(incomeId).subscribe(
      (response) => {
        this.fetchIncomes();
      },
      (error) => {
        console.error('Failed to delete income:', error);
      }
    );
  }


  fetchIncomes() {
    this.authService.retrieveUserIncomes(this.user.id).subscribe(
      (incomes) => {
        this.Incomes = incomes;
        this.TaxManagement();

      },
      (error) => {
        console.error('Failed to retrieve user incomes:', error);
      }
    );
  }



  Logout() {
    this.authService.Logout();
  }

  TaxManagement() {
    var taxable = 0;
    this.Incomes.forEach((Income) => {
      taxable += Income.amount;
    });
    this.Monthly = taxable;
    this.TaxableIncome = taxable * 12;
  }
}
