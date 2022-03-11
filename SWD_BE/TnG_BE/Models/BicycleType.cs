using System;
using System.Collections.Generic;

namespace TnG_BE.Models
{
    public partial class BicycleType
    {
        public int Id { get; set; }
        public int BicycleId { get; set; }
        public DateTime DateAdded { get; set; }
        public int Color { get; set; }
        public string? Type { get; set; }

        public virtual Bicycle Bicycle { get; set; } = null!;
    }
}
