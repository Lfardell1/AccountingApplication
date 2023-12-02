import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';

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
  newExpense: Expense = { date: '', description: '', amount: 0 };
  expenses: Expense[] = [];

  addExpense() {
    this.expenses.push({ ...this.newExpense });
    this.newExpense = { date: '', description: '', amount: 0 };
  }

  deleteExpense(expense: Expense) {
    const index = this.expenses.indexOf(expense);
    if (index !== -1) {
      this.expenses.splice(index, 1);
    }
  }
}
