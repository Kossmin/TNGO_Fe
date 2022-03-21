namespace Enities.ViewModels
{
    public class DepositViewModel
    {
        public DateTime Date { get; set; }
        public Decimal Amount { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
    }
}
