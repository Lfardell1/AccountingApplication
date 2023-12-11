import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, Transactions, User } from '../auth.service';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterModule, LayoutComponent, FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  user: User = { id: 0, username: '' };
  Transactions: Transactions[] = [];
  errorMessages: string[] = [];


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.retrieveUserDetails().then((user) => {
      this.user = user;
      this.retrieveUserTransactions();
    });
  }

  onSubmit(form: NgForm) {
    console.log('Form: ', form);
    this.errorMessages = [];
    if (!form.valid) {
      if (form.controls['amount'].invalid || form.controls['amount'].untouched || form.controls['amount'].value === ''  ) {
        this.errorMessages.push('Amount is required');

      }
      if (form.controls['category'].invalid || form.controls['category'].untouched || form.controls['category'].value === ''  ) {
        this.errorMessages.push('Category is required');

      }
      if (form.controls['description'].invalid || form.controls['description'].untouched || form.controls['description'].value === ''  )  {
        this.errorMessages.push('Description is required');

      }
    } else {
      this.SaveTransaction();

    }


  }

  private retrieveUserTransactions() {
    this.Transactions = [];
    this.authService.retrieveUserTransaction(this.user.id).subscribe(
      (transactions) => {
        transactions.forEach(transaction => {
          if (transaction.category == 'Expense' || transaction.category == 'Income') {
            this.Transactions.push(transaction);
        }});
      },
      (error) => {
        console.error(error);
      }
    );
  }


  newTransaction: Transactions = {
    id: 0,
    amount: 0,
    userID: this.user.id,
    category: '', // Should be initialized with a default value if needed
    description: '',
  };

  SaveTransaction() {

    console.log('Saving transaction:', this.newTransaction);
    this.newTransaction.userID = this.user.id;
    this.authService.saveTransactionDetails(this.newTransaction).subscribe(
      (response) => {
        this.retrieveUserTransactions(); // Refresh the transaction list after addition
        this.newTransaction = {
          id: 0,
          amount: 0,
          userID: this.user.id,
          category: '', // Reset to default values
          description: '',
        };
      },
      (error) => {
        console.error('Failed to save transaction:', error);
      }
    );
  }

  // Add validation to the form



  DeleteTransaction(transactionId: number) {
    this.authService.DeleteTransactionDetails(transactionId).subscribe(
      (response) => {
        this.retrieveUserTransactions(); // Refresh the transaction list after deletion
      },
      (error) => {
        console.error('Failed to delete transaction:', error);

      }
    );

  }
}
