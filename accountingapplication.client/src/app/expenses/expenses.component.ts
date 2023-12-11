import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { User, AuthService , Expenses} from '../auth.service';
import { NgForOf } from '@angular/common';

interface Expense {
  date: string;
  description: string;
  amount: number;
}
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule , FormsModule , LayoutComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  errorMessages: string[] = [];
  Expenses: Expenses[] = [];
  user: User = { id: 0, username: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.retrieveUserDetails().then((user) => {
      this.user = user;
      this.retrieveExpenses();
    });
  }





  private retrieveExpenses() {
    this.authService.retrieveUserExpenses(this.user.id).subscribe(
      (expenses) => {
        this.Expenses = expenses;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  newExpense: Expenses = {
    id: 0,
    expenseDay: 0,
    userID: this.user.id,
    price: 0,
    description: '',
  };

  SaveExpense() {

    console.log('Saving Expense:', this.SaveExpense);
    this.newExpense.userID = this.user.id;
    this.authService.saveExpenseDetails(this.newExpense).subscribe(
      (response) => {
        this.retrieveExpenses(); // Refresh the transaction list after addition
        this.newExpense = {
          id: 0,
          expenseDay: 0,
          userID: this.user.id,
          price: 0,
          description: '',
        };
      },
      (error) => {
        console.error('Failed to save Expense:', error);
      }
    );
  }

  // Add validation to the form



  DeleteExpense(ExpenseId: number) {
    this.authService.DeleteExpenseDetails(ExpenseId).subscribe(
      (response) => {
        this.retrieveExpenses(); // Refresh the transaction list after deletion
      },
      (error) => {
        console.error('Failed to delete Expense:', error);

      }
    );

  }
  onSubmit(form: NgForm) {
    console.log('Form: ', form);
    this.errorMessages = [];
    if (!form.valid) {
      if (form.controls['desc'].invalid || form.controls['desc'].untouched || form.controls['desc'].value === ''  ) {
        this.errorMessages.push('Description is required');

      }
      if (form.controls['amount'].invalid  || form.controls['amount'].untouched || form.controls['amount'].value === '') {
        this.errorMessages.push('Category is required');

      }
      if (form.controls['date'].invalid || form.controls['date'].untouched || form.controls['date'].value === '') {
        this.errorMessages.push('Date is required');

      }
    } else {
      this.SaveExpense();

    }


  }

}



