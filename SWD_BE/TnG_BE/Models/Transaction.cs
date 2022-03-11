using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class Transaction
    {
        public Transaction()
        {
            Payments = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public int WalletId { get; set; }
        public int DepositId { get; set; }

        public virtual Deposit Deposit { get; set; } = null!;
        public virtual Wallet Wallet { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
