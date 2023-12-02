using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.Models;
using AccountingApplication.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace AccountingApplication.Server.Interfaces
{
    public interface IIncomeRepository
    {
        Task<IEnumerable<Incomes>> GetAllIncomesAsync();
        Task<Incomes> GetIncomeByIdAsync(int id);
        Task<Incomes> CreateIncomeAsync(Incomes income);
        Task<bool> DeleteIncomeAsync(int id);

    }
}
