namespace AccountingApplication.Server.Models
{
    public class Transactions
    {
        public int Id { get; set; }

        public int TransactionID { get; set; }

        public int UserID { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }
    }
}
