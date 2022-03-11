using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class BicycleHistory
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public int BicycleId { get; set; }

        public virtual Bicycle Bicycle { get; set; } = null!;
    }
}
