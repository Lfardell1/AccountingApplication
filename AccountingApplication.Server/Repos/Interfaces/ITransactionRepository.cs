using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using Accounting.Models;
using AccountingApplication.Server.Models;

namespace AccountingApplication.Server.Interfaces
{
    public interface ITransactionRepository
    {

        Task<IEnumerable<Transactions>> AllUserTransactionsAsync(int UserID);
        Task<Transactions> GetTransactionAsync(int id);
        Task<Transactions> CreateTransactionAsync(Transactions transaction);
        Task<bool> DeleteTransactionAsync(int id);


    }
}
