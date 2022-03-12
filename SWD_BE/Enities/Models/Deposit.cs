using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class Deposit
    {
        public Deposit()
        {
            Transactions = new HashSet<Transaction>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        public int TransactionId { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
