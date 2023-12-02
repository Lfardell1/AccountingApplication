import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  standalone: true,
  imports: [CommonModule , FormsModule , LayoutComponent]
})
export class TaxComponent {
  totalIncome: number = 70000; // Example total income
  deductions: { name: string; amount: number }[] = [];

  get taxableIncome(): number {
    const totalDeductions = this.totalDeductions();
    return this.totalIncome - totalDeductions;
  }

  taxRate: number = 0.2; // Example tax rate

  newDeduction: { name: string; amount: number } = { name: '', amount: 0 };

  get estimatedTax(): number {
    return this.taxableIncome * this.taxRate;
  }

  addDeduction() {
    if (this.newDeduction.name && this.newDeduction.amount) {
      this.deductions.push({ name: this.newDeduction.name, amount: this.newDeduction.amount });
      this.newDeduction = { name: '', amount: 0 }; // Reset inputs after adding a deduction
    }
  }

  totalDeductions(): number {
    return this.deductions.reduce((total, deduction) => total + deduction.amount, 0);
  }

  deleteDeduction(index: number) {
    this.deductions.splice(index, 1);
  }
}
