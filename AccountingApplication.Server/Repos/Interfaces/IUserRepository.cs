using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.Models;

namespace AccountingApplication.Server.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<Users>> GetAllUsersAsync();
        Task<Users> GetUserByIdAsync(int id);
        Task<Users> CreateUserAsync(Users user);
        Task<Users> LoginAsync(string username, string password);
        Task<Users> UpdateUserAsync(int id, Users user);
        Task<bool> DeleteUserAsync(int id);
    }
}
