
using Accounting.Models;
using AccountingApplication.Server.Migrations;
using AccountingApplication.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Accounting.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }

        public DbSet<Users> Users { get; set; }


        public DbSet<Incomes> Incomes { get; set; } 

        public DbSet<Transactions> Transactions { get; set; }

        public DbSet<Debt> Debts { get; set; }
        
        public DbSet<Expense> Expense { get; set; }


    }

}
