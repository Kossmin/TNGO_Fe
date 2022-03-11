using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class Payment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Type { get; set; }
        public decimal Money { get; set; }
        public int TripId { get; set; }
        public int TransactionId { get; set; }
        public string PaymentCode { get; set; } = null!;

        public virtual Transaction Transaction { get; set; } = null!;
        public virtual Trip Trip { get; set; } = null!;
    }
}
