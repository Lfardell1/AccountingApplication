using Accounting.Database;
using AccountingApplication.Server.Models;
using AccountingApplication.Server.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509;
using NuGet.Versioning;
using Org.BouncyCastle.Security.Certificates;

namespace AccountingApplication.Server.Repos.Implementation
{
    public class DebtRepository : IDebtRepository
    {

        private readonly DatabaseContext _context;

        public DebtRepository(DatabaseContext context) {

            _context = context;


        }



        public async Task<IEnumerable<Debt>> GetAllDebtsAsync()
        {

            return await _context.Debts.ToListAsync();

        }

        public async Task<Debt> GetDebtByUserIdAsync(int id) {

            var debt = await _context.Debts.FirstOrDefaultAsync(d => d.UserId == id);

            if (debt == null)
            {
               var newdebt = await CreateDebtAsync(new Debt { Amount = 0  , UserId = id , WeeksToPay = 0});   
               return newdebt;
            }

            return debt; // Returns the single debt entry found for the user


        }

        public async Task<Debt> CreateDebtAsync(Debt debt)
        {
            _context.Debts.Add(debt);
            await _context.SaveChangesAsync();
            return debt;

        }

        public async Task<bool> UpdateDebtAsync(int UserId, Debt updatedDebt)
        {

            var existingDebt = await _context.Debts.FirstOrDefaultAsync(d => d.UserId == UserId);

            if (existingDebt != null)
            {
                // Update fields in the existing debt object
                existingDebt.Amount = updatedDebt.Amount;
                existingDebt.WeeksToPay = updatedDebt.WeeksToPay;
                existingDebt.PaymentAmount = updatedDebt.PaymentAmount;
                // Update other fields as needed

                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> DeleteDebtAsync(int id){

            var DebtToRemove = await _context.Debts.FindAsync(id);
            if (DebtToRemove == null)
            {
                return false;
            }
            _context.Debts.Remove(DebtToRemove);
            await _context.SaveChangesAsync();
            return true;

        }





    }
}
