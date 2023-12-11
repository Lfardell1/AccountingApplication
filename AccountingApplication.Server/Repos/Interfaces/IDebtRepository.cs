using AccountingApplication.Server.Models;

namespace AccountingApplication.Server.Interfaces
{
    public interface IDebtRepository
    {

        public Task<IEnumerable<Debt>> GetAllDebtsAsync();

        public Task<Debt> GetDebtByUserIdAsync(int Id);

        public Task<Debt> CreateDebtAsync(Debt debt);

        public Task<bool> UpdateDebtAsync(int id , Debt debt);

        public Task<bool> DeleteDebtAsync( int Id);

        


    }
}
