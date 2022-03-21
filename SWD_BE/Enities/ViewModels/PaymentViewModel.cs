namespace Enities.ViewModels
{
    public class PaymentViewModel
    {
        public DateTime? Date { get; set; }
        public int Type { get; set; }
        public decimal Money { get; set; }
        public int TripId { get; set; }
        public string PaymentCode { get; set; } = null!;
        public int UserId { get; set; }
    }
}
