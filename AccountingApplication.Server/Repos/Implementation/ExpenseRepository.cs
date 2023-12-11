using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Accounting.Database;
using Accounting.Models;
using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Models;
using Microsoft.AspNetCore.Mvc;
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


        public async Task<IEnumerable<Expense>> AllUserExpensesAsync(int UserID)
        {
            return await _context.Expense.Where(i => i.UserID == UserID).ToListAsync();

        }

        public async Task<Expense> GetExpensesAsync(int id)
        {
            return await _context.Expense.FirstOrDefaultAsync(t => t.ID == id);
        }

  

        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {
            _context.Expense.Add(expense);
            
            
            await _context.SaveChangesAsync();

            return expense;
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            var expenseToRemove = await _context.Expense.FindAsync(id);
            if (expenseToRemove == null)
            {
                return false; // Transaction not found
            }
            _context.Expense.Remove(expenseToRemove);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
