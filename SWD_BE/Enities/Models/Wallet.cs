using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Wallet
    {
        public Wallet()
        {
            Transactions = new HashSet<Transaction>();
        }

        public Wallet(Wallet w, User u)
        {
            this.Id = w.Id;
            this.Money = w.Money;
            this.Description = w.Description;
            this.UserId = w.UserId;
            this.User = u;
        }

        public int Id { get; set; }
        public decimal Money { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
