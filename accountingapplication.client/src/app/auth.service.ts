
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DefaultTitleStrategy, Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface User {
  id: number;
  username: string;
}

export interface Incomes {
  incomeId?: number;
  source: string;
  amount: number;
  UserId: number;
}

export interface Debts {
  amount: number;
  paymentAmount?: number;
  weeksToPay?: number;
  userId: number;
}

export interface Transactions {
  id: number;
  amount: number;
  userID: number;
  category: string;
  description: string;
}
export interface Expenses {
  id: number;
  expenseDay: number;
  userID: number;
  price: number;
  description: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  updateIncomes(incomes: Incomes[]) {
    throw new Error('Method not implemented.');
  }
  private isAuthenticated: boolean = false;
  private apiUrl: string = 'https://localhost:7124/api';
  public userDetails!: User;

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/User/login`, { username, password })
      .pipe(
        map((response) => {
          const { userDetails, token } = response;

          if (response && response.token) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.userDetails)
            );
            localStorage.setItem('token', response.token);
            this.isAuthenticated = true;
            this.router.navigate(['/dashboard']);
            this.userDetails = response.userDetails;
            return true;
          } else {
            return false;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {

            case 401:
              throw("Error Logging in, please check your username and password"); // Propagate error status to handle it in the component
            default:
              console.log('Server Error has Occured');
              throw(error.message); // Propagate error status to handle it in the componen
            }
        })
      );
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/User/register`, { username, password })
      .pipe(
        map((response) => {
          // Map out the details of the intended response and log it (hopefully) or catch an error
          const { userDetails, token } = response;

          if (response && response.token) {

            // If we get a response and it has a token we store that in memory
            localStorage.setItem(
              'currentUser',
              // also storing the user in memory (slightly) - this needs to be worked on
              JSON.stringify(response.userDetails)
            );
            localStorage.setItem('token', response.token);

            // Authenticated the user through the auth service and send them to the dashboar
            this.isAuthenticated = true;
            this.router.navigate(['/dashboard']);
            this.userDetails = userDetails;

            return true;
          } else {
            console.log("Server Error has Occured")
            throw("Server Error has Occured")

          }
        }),
        catchError((error: HttpErrorResponse) => {

          switch (error.status) {

            case 400:
              throw("Username Already Exists"); // Propagate error status to handle it in the component
            default:
              console.log('Server Error has Occured');
              throw(error.message); // Propagate error status to handle it in the componen
            }
        })
      );
  }

  // Method that most components use to get the user that is logged in
  // Whole lot of retrieval methods pointing to the backend getting incomes
  // expenses, debts etc


  retrieveUserDetails(): Promise<User> {
    return new Promise((resolve, reject) => {
      const userDetails = localStorage.getItem('currentUser');
      if (userDetails) {
        const parsedUserDetails = JSON.parse(userDetails);
        resolve(parsedUserDetails);
      } else {
        reject('User not found');
      }
    });
  }

  retrieveUserIncomes(userId: number): Observable<Incomes[]> {
    return this.http.get<Incomes[]>(`${this.apiUrl}/incomes/user/${userId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {

        throw error;
      })
    );
  }



  retrieveUserTransaction(userId: number): Observable<Transactions[]> {
    return this.http
      .get<Transactions[]>(`${this.apiUrl}/Transaction/user/${userId}`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => {
          console.log('Error in retrieving user details');
          throw error;
        })
      );
  }

  retrieveUserExpenses(userId: number): Observable<Expenses[]> {

    return this.http
      .get<Expenses[]>(`${this.apiUrl}/Expense/user/${userId}`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => {
          console.log('Error in retrieving Expense details');
          throw error;
        })
      );
  }

  retriveUserDebt(userId: number): Observable<Debts> {
    return this.http.get<Debts>(`${this.apiUrl}/Debt/${userId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.log('Error in retrieving debt details');
        throw error;
      })
    );
  }

  // Here we have methods to save and delete incomes, expenses, debts and transactions

  saveTransactionDetails(
    Transaction: Transactions
  ): Observable<Transactions> {
    return this.http
      .post<Transactions>(`${this.apiUrl}/Transaction/`, Transaction)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          throw(error);
        })
      );
  }

  DeleteTransactionDetails(transactionId: number): Observable<Transactions> {
    return this.http
      .delete<Transactions>(`${this.apiUrl}/Transaction/${transactionId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          throw(error);
        })
      );
  }


  saveExpenseDetails(Expense: Expenses): Observable<Expenses> {
    return this.http
      .post<Expenses>(`${this.apiUrl}/Expense/`, Expense)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          throw(error);
        })
      );

  }

  DeleteExpenseDetails(ExpenseId: number): Observable<Expenses> {
    return this.http
      .delete<Expenses>(`${this.apiUrl}/Expense/${ExpenseId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw(error);
        })
      );
  }



  saveDebtDetails(userId: number, debtDetails: Debts): Observable<Debts> {
    return this.http
      .post<Debts>(`${this.apiUrl}/Debt/${userId}`, debtDetails)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          throw(error);
        })
      );
  }

  addIncome(income: Incomes): Observable<Incomes> {
    return this.http.post<Incomes>(`${this.apiUrl}/incomes`, income).pipe(
      catchError((error: HttpErrorResponse) => {
              throw(error);
      })
    );
  }

  deleteIncome(incomeId: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/incomes/${incomeId}`).pipe(
      catchError((error: HttpErrorResponse) => {

        throw(error);
      })
    );
  }

  // Finally a logout method to remove the user from memory and send them back to the login screen

  Logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  // Simple method to determmined if user is authenticated

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
