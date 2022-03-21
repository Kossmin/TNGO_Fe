using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace TnG_BE.Models
{
    public partial class BicycleType
    {
        public BicycleType()
        {
            Bicycles = new HashSet<Bicycle>();
        }

        public int Id { get; set; }
        public string? Type { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Bicycle> Bicycles { get; set; }
    }
}
