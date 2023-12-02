using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Accounting.Database;
using Accounting.Models;
using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountingApplication.Server.Repos.Implementation
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly DatabaseContext _context;

        public IncomeRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Incomes>> GetAllIncomesAsync()
        {
            return await _context.Incomes.ToListAsync();
        }

        public async Task<Incomes> GetIncomeByIdAsync(int id)
        {
            return await _context.Incomes.FindAsync(id);
        }

        public async Task<Incomes> CreateIncomeAsync(Incomes income)
        {
            _context.Incomes.Add(income);
            await _context.SaveChangesAsync();
            return income;
        }

        public async Task<bool> DeleteIncomeAsync(int id)
        {
            var incomeToRemove = await _context.Incomes.FindAsync(id);
            if (incomeToRemove == null)
            {
                return false; // Income not found
            }
            _context.Incomes.Remove(incomeToRemove);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
