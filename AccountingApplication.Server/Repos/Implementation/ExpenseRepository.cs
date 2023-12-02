using Accounting.Database;
using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountingApplication.Server.Repos.Implementation
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly DatabaseContext _context;

        public ExpenseRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetAllExpensesAsync()
        {
            return await _context.Expenses.ToListAsync();
        }

        public async Task<Expense> GetExpenseByIdAsync(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            var expenseToRemove = await _context.Expenses.FindAsync(id);
            if (expenseToRemove == null)
            {
                return false; // Expense not found
            }
            _context.Expenses.Remove(expenseToRemove);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
