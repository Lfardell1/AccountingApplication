// all-transactions.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterModule , LayoutComponent, FormsModule , CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  newTransaction: any = {};
  transactions: any[] = [
    { date: '2023-01-01', description: 'Purchase 1', amount: 50.0, category: 'Shopping' },
    { date: '2023-01-02', description: 'Payment 1', amount: -30.0, category: 'Income' },
    // Add more dummy data as needed
  ];

  addTransaction() {
    // Implement logic to add a new transaction
    this.transactions.push({ ...this.newTransaction });
    // Reset the form
    this.newTransaction = {};
  }

  deleteTransaction(transaction: any) {
    // Implement logic to delete a transaction
    const index = this.transactions.indexOf(transaction);
    if (index !== -1) {
      this.transactions.splice(index, 1);
    }
  }
}
