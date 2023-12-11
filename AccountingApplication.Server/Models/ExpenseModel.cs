using System.ComponentModel.DataAnnotations;

namespace AccountingApplication.Server.Models
{
    public class Expense
    {
        [Key]
        public int ID { get; set; }

        public int ExpenseDay { get; set; } 

        public int UserID { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }
    }
}
