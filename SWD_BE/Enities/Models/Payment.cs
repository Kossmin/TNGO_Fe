using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Payment
    {
        public Payment() { }
        public Payment(Payment p, Transaction t)
        {
            this.Id = p.Id;
            this.Date = p.Date;
            this.Type = p.Type;
            this.Money = p.Money;
            this.TripId = p.TripId;
            this.TransactionId = p.TransactionId;
            this.PaymentCode = p.PaymentCode;
            this.Transaction = t;
        }

        public Payment(Payment p, Trip t)
        {
            this.Id = p.Id;
            this.Date = p.Date;
            this.Type = p.Type;
            this.Money = p.Money;
            this.TripId = p.TripId;
            this.TransactionId = p.TransactionId;
            this.PaymentCode = p.PaymentCode;
            this.Trip = t;
        }
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int Type { get; set; }
        public decimal Money { get; set; }
        public int TripId { get; set; }
        public int TransactionId { get; set; }
        public string PaymentCode { get; set; } = null!;

        [JsonIgnore]
        public virtual Transaction Transaction { get; set; } = null!;
        [JsonIgnore]
        public virtual Trip Trip { get; set; } = null!;
    }
}
