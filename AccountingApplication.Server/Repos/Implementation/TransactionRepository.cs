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
    public class TransactionRepository : ITransactionRepository
    {
        private readonly DatabaseContext _context;

        public TransactionRepository(DatabaseContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Transactions>> AllUserTransactionsAsync(int UserID)
        {
            return await _context.Transactions.Where(i => i.UserID == UserID).ToListAsync();

        }

        public async Task<Transactions> GetTransactionAsync(int id)
        {
            return await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id);
        }

  

        public async Task<Transactions> CreateTransactionAsync(Transactions transaction)
        {
            _context.Transactions.Add(transaction);
            
            
            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task<bool> DeleteTransactionAsync(int id)
        {
            var transactionToRemove = await _context.Transactions.FindAsync(id);
            if (transactionToRemove == null)
            {
                return false; // Transaction not found
            }
            _context.Transactions.Remove(transactionToRemove);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
