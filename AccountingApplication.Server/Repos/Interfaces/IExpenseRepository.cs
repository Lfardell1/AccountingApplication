using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using Accounting.Models;
using AccountingApplication.Server.Models;

namespace AccountingApplication.Server.Interfaces
{
    public interface IExpenseRepository
    {

        Task<IEnumerable<Expense>> AllUserExpensesAsync(int UserID);
        Task<Expense> GetExpensesAsync(int id);
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task<bool> DeleteExpenseAsync(int id);


    }
}
