using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Bicycle
    {
        public Bicycle()
        {
            BicycleHistories = new HashSet<BicycleHistory>();
            Trips = new HashSet<Trip>();
        }
        public Bicycle(Bicycle b, Station s)
        {
            this.Id = b.Id;
            this.Status = b.Status;
            this.Description = b.Description;
            this.StationId = b.StationId;
            this.LicensePlate = b.LicensePlate;
            this.Image = b.Image;
            this.TypeId = b.TypeId;
            this.Station = s;
            this.Type = b.Type;
        }

        public Bicycle(Bicycle b, BicycleType t)
        {
            this.Id = b.Id;
            this.Status = b.Status;
            this.Description = b.Description;
            this.StationId = b.StationId;
            this.LicensePlate = b.LicensePlate;
            this.Image = b.Image;
            this.TypeId = b.TypeId;
            this.Station = b.Station;
            this.Type = t;
        }
        public int Id { get; set; }
        public int? Status { get; set; }
        public string? Description { get; set; }
        public int StationId { get; set; }
        public string LicensePlate { get; set; } = null!;
        public string? Image { get; set; }
        public int TypeId { get; set; }

        [JsonIgnore]
        public virtual Station Station { get; set; } = null!;
        [JsonIgnore]
        public virtual BicycleType? Type { get; set; }
        public virtual ICollection<BicycleHistory> BicycleHistories { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Trip> Trips { get; set; }
    }
}
