using System.ComponentModel.DataAnnotations;

namespace AccountingApplication.Server.Models
{
    public class Debt
    {
        [Key]
        public int DebtId {  get; set; }

        public decimal Amount { get; set; }

        public int WeeksToPay { get; set; }

        public decimal PaymentAmount { get; set; }

        public int UserId { get; set; }

    }
}
