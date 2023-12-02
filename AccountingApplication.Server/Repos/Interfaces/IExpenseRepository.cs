using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.Models;
using AccountingApplication.Server.Models;

namespace AccountingApplication.Server.Interfaces
{
    public interface IExpenseRepository
    {

        Task<IEnumerable<Expense>> GetAllExpensesAsync();
        Task<Expense> GetExpenseByIdAsync(int id);
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task<bool> DeleteExpenseAsync(int id);

    }
}
