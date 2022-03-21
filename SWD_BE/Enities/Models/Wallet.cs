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

        public int Id { get; set; }
        public decimal Money { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual User User { get; set; } = null!;
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
