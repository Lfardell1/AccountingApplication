import { AuthService, Incomes, Transactions, User } from './../auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  standalone: true,
  imports: [CommonModule , FormsModule , LayoutComponent]
})
export class TaxComponent {
  totalNetincome: number = 0;
  deductions: Transactions [] = [];
  user: User = { id: 0, username: '' };
  incomes: Incomes[] = [];
  taxPayable: number = 0;
  errorMessages: string[] = [];
    // Australian tax brackets and rates (as an example)
    taxBrackets = [
      { min: 0, max: 18200, rate: 0 },
      { min: 18201, max: 45000, rate: 0.19 },
      { min: 45001, max: 120000, rate: 0.325 },
      { min: 120001, max: 180000, rate: 0.37 },
      { min: 180001, max: Infinity, rate: 0.45 }
    ];


  constructor(private authService: AuthService) {}


ngOnInit(): void {
  this.authService.retrieveUserDetails().then((user) => {
    this.user = user;
    this.retrieveUserIncomes();

  }).catch((err) => {
    console.error(err);
  });
}



onSubmit(form: NgForm) {
  this.errorMessages = [];
  if (!form.valid) {
    if (form.controls['amount'].invalid || form.controls['amount'].untouched || form.controls['amount'].value === ''  ) {
      this.errorMessages.push('Amount is required');

    }
    if (form.controls['description'].invalid || form.controls['description'].untouched || form.controls['description'].value === ''  )  {
      this.errorMessages.push('Name is required');

    }
  } else {
    this.addDeduction();

  }


}



retrieveUserIncomes() {
  this.authService.retrieveUserIncomes(this.user.id).subscribe(
    (incomes) => {
      this.incomes = incomes;
      incomes.forEach(income => {
        this.totalNetincome += income.amount;
      });

      this.totalNetincome = this.totalNetincome * 12;
      this.retrieveUserDeductions();
    },
    (error) => {
      console.error('Failed to retrieve user incomes:', error);
    }
  );
}

private retrieveUserDeductions() {
  this.deductions = [];
  this.authService.retrieveUserTransaction(this.user.id).pipe().subscribe(
    (transactions) => {
      transactions.forEach(transaction => {
        if(transaction.category == "Deduction"){
           this.deductions.push(transaction);
        }
      });
      this.estimatedTax();
    },
    (error) => {
      console.error(error);
    }
  );
}


getTaxForIncome(income: number): number {
  var taxRate = 0;
  var taxBracket = this.taxBrackets.find(bracket => bracket.min <= income && bracket.max >= income);
  if (taxBracket) {
    taxRate = taxBracket.rate;
  }
  return taxRate;

}


estimatedTax(): number {



  var taxRate =  this.getTaxForIncome(this.totalNetincome);

  this.taxPayable = this.totalNetincome * taxRate;

  return this.taxPayable;

}



newDeduction: Transactions = {
  id: 0,
  amount: 0,
  userID: this.user.id,
  category: 'Deduction',
  description: '',
};


  addDeduction() {
    // Add form validation
    if (this.newDeduction.description && this.newDeduction.amount) {
      this.newDeduction.userID = this.user.id;
      this.totalNetincome -= this.newDeduction.amount;
      this.authService.saveTransactionDetails(this.newDeduction).subscribe(
        (response) => {
          this.retrieveUserDeductions(); // Refresh the transaction list after addition
          // call the function to calculate the tax

          this.estimatedTax();
          this.newDeduction= {
            id: 0,
            amount: 0,
            userID: this.user.id,
            category: 'Deduction', // Reset to default values
            description: '',
          };
        },
        (error) => {
          console.error('Failed to save Deduction:', error);
        }
      );
      this.getTaxForIncome(this.totalNetincome);
    }
  }

  totalDeductions(): number {
    return this.deductions.reduce((total, deduction) => total + deduction.amount, 0);
  }

  deleteDeduction(deduction: Transactions) {
    var deductionId = deduction.id;
    this.totalNetincome += deduction.amount;
    this.authService.DeleteTransactionDetails(deductionId).subscribe(
      (response) => {
         // call the function to calculate the ta
         this.estimatedTax();
        this.retrieveUserDeductions(); // Refresh the transaction list after deletion
      },
      (error) => {
        console.error('Failed to delete transaction:', error);

      }
    );
  }
}
