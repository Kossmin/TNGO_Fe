using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Deposit
    {
        public Deposit() { }
        public Deposit(Deposit d, Transaction t)
        {
            this.Id = d.Id;
            this.Date = d.Date;
            this.Amount = d.Amount;
            this.Description = d.Description;
            this.UserId = d.UserId;
            this.TransactionId = d.TransactionId;
            this.Transaction = t;
        }

        public Deposit(Deposit d, User u)
        {
            this.Id = d.Id;
            this.Date = d.Date;
            this.Amount = d.Amount;
            this.Description = d.Description;
            this.UserId = d.UserId;
            this.TransactionId = d.TransactionId;
            this.User = u;
        }
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        public int? TransactionId { get; set; }

        [JsonIgnore]
        public virtual Transaction? Transaction { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; } = null!;
    }
}
