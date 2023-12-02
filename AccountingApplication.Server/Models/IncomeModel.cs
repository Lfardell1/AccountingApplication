namespace AccountingApplication.Server.Models
{
    public interface Incomes
    {
        int Amount { get; set; }
        string Description { get; set; }
        int id { get; set; }
        int UserID { get; set; }
    }
}