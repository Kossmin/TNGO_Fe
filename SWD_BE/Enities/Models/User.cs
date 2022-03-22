using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class User
    {
        public User()
        {
            Deposits = new HashSet<Deposit>();
            Trips = new HashSet<Trip>();
            Wallets = new HashSet<Wallet>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public string? Token { get; set; }
        public string? FireBaseUid { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Deposit> Deposits { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Trip> Trips { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Wallet> Wallets { get; set; }
    }
}
