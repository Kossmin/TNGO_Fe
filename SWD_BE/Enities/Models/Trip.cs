using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class Trip
    {
        public Trip()
        {
            Payments = new HashSet<Payment>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public DateTime BeginTime { get; set; }
        public DateTime EndTime { get; set; }
        public int StationStartId { get; set; }
        public int BicycleId { get; set; }
        public int StationEndId { get; set; }
        public int? Status { get; set; }

        public virtual Bicycle Bicycle { get; set; } = null!;
        public virtual Station StationEnd { get; set; } = null!;
        public virtual Station StationStart { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
