using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class Bicycle
    {
        public Bicycle()
        {
            BicycleHistories = new HashSet<BicycleHistory>();
            Trips = new HashSet<Trip>();
        }

        public int Id { get; set; }
        public int? Status { get; set; }
        public string? Description { get; set; }
        public int StationId { get; set; }
        public string LicensePlate { get; set; } = null!;
        public string? Image { get; set; }

        public virtual Station Station { get; set; } = null!;
        public virtual ICollection<BicycleHistory> BicycleHistories { get; set; }
        public virtual ICollection<Trip> Trips { get; set; }
    }
}
