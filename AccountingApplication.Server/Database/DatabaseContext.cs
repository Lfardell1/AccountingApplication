
using Accounting.Models;
using AccountingApplication.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Accounting.Database
{
    public class DatabaseContext : DbContext
    {   
        public DatabaseContext(DbContextOptions options) : base(options)  { }
        
        public DbSet<Users> Users { get; set; }

        public DbSet<Incomes> Incomes { get; set; }

        public DbSet<Expense> Expenses { get; set; }

        public DbSet<Transactions> Transactions { get; set; }
      


    }

}
