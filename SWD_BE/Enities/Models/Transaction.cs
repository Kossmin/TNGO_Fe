using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Transaction
    {
        public Transaction()
        {
            Deposits = new HashSet<Deposit>();
            Payments = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public int WalletId { get; set; }

        [JsonIgnore]
        public virtual Wallet Wallet { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Deposit> Deposits { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
