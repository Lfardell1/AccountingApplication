using System.ComponentModel.DataAnnotations;

namespace AccountingApplication.Server.Models
{
    public class Transactions
    {
        [Key]
        public int Id { get; set; }

        public int Amount { get; set; } 

        public int UserID { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }
    }
}
