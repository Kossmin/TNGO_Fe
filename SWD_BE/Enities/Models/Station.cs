using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Station
    {
        public Station()
        {
            Bicycles = new HashSet<Bicycle>();
            TripStationEnds = new HashSet<Trip>();
            TripStationStarts = new HashSet<Trip>();
        }

        public int Id { get; set; }
        public string? Location { get; set; }
        public int Capability { get; set; }
        public int? Status { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Bicycle> Bicycles { get; set; }
        public virtual ICollection<Trip> TripStationEnds { get; set; }
        public virtual ICollection<Trip> TripStationStarts { get; set; }
    }
}
