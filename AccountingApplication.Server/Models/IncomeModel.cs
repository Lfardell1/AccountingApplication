using System;
using System.ComponentModel.DataAnnotations;

namespace AccountingApplication.Server.Models
{
    public class Incomes
    {
        [Key]
        public int IncomeId { get; set; }
        public int UserId { get; set; }

        public string Source { get; set; }
        public decimal Amount { get; set; }
    
    }
    
}
