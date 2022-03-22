using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class Trip
    {
        public Trip()
        {
            Payments = new HashSet<Payment>();
        }
        public Trip(Trip t, Bicycle b)
        {
            this.Id = t.Id;
            this.BeginTime = t.BeginTime;
            this.EndTime = t.EndTime;
            this.StationStartId = t.StationStartId;
            this.StationEndId = t.StationEndId;
            this.BicycleId = t.BicycleId;
            this.Status = t.Status;
            this.StationStart = t.StationStart;
            this.StationEnd = t.StationEnd;
            this.Bicycle = b;
        }
        public Trip(Trip t, Station start)
        {
            this.Id = t.Id;
            this.BeginTime = t.BeginTime;
            this.EndTime = t.EndTime;
            this.StationStartId = t.StationStartId;
            this.StationEndId = t.StationEndId;
            this.BicycleId = t.BicycleId;
            this.Status = t.Status;
            this.StationStart = start;
            this.StationEnd = t.StationEnd;
            this.Bicycle = t.Bicycle;
        }
        public Trip(Station end, Trip t)
        {
            this.Id = t.Id;
            this.BeginTime = t.BeginTime;
            this.EndTime = t.EndTime;
            this.StationStartId = t.StationStartId;
            this.StationEndId = t.StationEndId;
            this.BicycleId = t.BicycleId;
            this.Status = t.Status;
            this.StationStart = t.StationStart;
            this.StationEnd = end;
            this.Bicycle = t.Bicycle;
        }
        public Trip(Trip t, User u)
        {
            this.Id = t.Id;
            this.BeginTime = t.BeginTime;
            this.EndTime = t.EndTime;
            this.StationStartId = t.StationStartId;
            this.StationEndId = t.StationEndId;
            this.BicycleId = t.BicycleId;
            this.Status = t.Status;
            this.User = u;
        }
        public int Id { get; set; }
        public DateTime? BeginTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int StationStartId { get; set; }
        public int BicycleId { get; set; }
        public int StationEndId { get; set; }
        public int? Status { get; set; }
        public int? UserId { get; set; }
        [JsonIgnore]
        public virtual Bicycle Bicycle { get; set; } = null!;
        [JsonIgnore]
        public virtual Station StationEnd { get; set; } = null!;
        [JsonIgnore]
        public virtual Station StationStart { get; set; } = null!;
        [JsonIgnore]
        public virtual User? User { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
