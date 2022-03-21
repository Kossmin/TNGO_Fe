using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Deposit
    {
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
