using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class User
    {
        public User()
        {
            Deposits = new HashSet<Deposit>();
            Wallets = new HashSet<Wallet>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Phone { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public int TripId { get; set; }

        public virtual Trip Trip { get; set; } = null!;
        public virtual ICollection<Deposit> Deposits { get; set; }
        public virtual ICollection<Wallet> Wallets { get; set; }
    }
}
