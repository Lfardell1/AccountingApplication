import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './chart/chart.component';
import { DebtComponent } from './debt/debt.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TaxComponent } from './tax/tax.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    declarations: [
        AppComponent,
        // Include all your components in the declarations array
    ],
    providers: [AuthService],
    bootstrap: [AppComponent],
    exports: [RouterModule, LoginComponent],
    imports: [
        FormsModule,
        RouterModule,
        BrowserModule,
        HttpClientModule,
        DashboardComponent,
        LoginComponent,
        ChartComponent,
        DebtComponent,
        ExpensesComponent,
        TaxComponent,
        LayoutComponent,
        TransactionsComponent,
        AppRoutingModule
        // Include other necessary modules here
        ,
        SidebarComponent
    ]
})
export class AppModule { }
