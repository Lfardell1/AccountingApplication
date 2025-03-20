# Monthly Accounting Application (WIP)

This project was developed as a demonstration of skills and knowledge as requested by an potential employer.

The **Monthly Accounting Application** is designed to help manage various financial tasks, such as tracking incomes, expenses, transactions, and debts, providing a comprehensive financial overview.

## Features

- **Income Tracking:** Monitor multiple income streams with detailed categorization.
- **Expense Management:** Categorize and organize expenses effectively for easier financial oversight.
- **Transaction Recording:** Log and review transactions clearly to maintain accurate financial records.
- **Debt Management:** Track outstanding debts, scheduled payments, and timeframes for repayment.
- **User Authentication:** Secure login and registration functionalities.

## Technology Stack

- **Backend:** .NET Framework with Entity Framework
- **Frontend:** Angular
- **Database:** SQL Server

## Getting Started

Follow these instructions to set up and run the application locally:

### Clone the Repository

```bash
git clone https://github.com/Lfardell1/AccountingApplication.git
```

or

```bash
gh repo clone Lfardell1/AccountingApplication
```

### Backend Setup

1. Navigate to the `AccountingApplication.Server` directory:

```bash
cd AccountingApplication.Server
```

2. Restore dependencies:

```bash
dotnet restore
```

3. Configure your database connection in the `appsettings.json` file.

4. Apply database migrations:

```bash
dotnet ef database update
```

5. Run the backend server:

```bash
dotnet run
```

### Frontend Setup

1. Navigate to the `accountingapplication.client` directory:

```bash
cd accountingapplication.client
```

2. Install dependencies:

```bash
npm install
```

3. Adjust API endpoints for backend communication in the Angular service configurations.

4. Launch the Angular development server:

```bash
ng serve
```

## Current Status

### Completed

- Initial project setup and structure.
- Basic authentication module implementation.
- Core CRUD functionalities for incomes, expenses, and transactions.

⚠️ **Work-In-Progress** ⚠️

Development is ongoing; additional functionalities and improvements are being actively developed.

## Contributing

Contributions are encouraged! Please fork the repository and submit pull requests. Clearly document your changes for smooth integration.

## License

This project will be licensed under the MIT License upon completion.

---

Stay tuned for further updates!

