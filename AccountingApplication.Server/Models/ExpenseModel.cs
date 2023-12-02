namespace AccountingApplication.Server.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public int UserID { get; set; }

        public int Anount {  get; set; }

        public string Description { get; set; }


    }
}
