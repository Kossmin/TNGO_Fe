using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enities.ViewModels
{
    public class BicycleViewModel
    {
        public int Status { get; set; }
        public string Description { get; set; }
        public int StationId { get; set; }
        public string LicensePlate { get; set; }
        public string Image { get; set; }
        public int TypeId { get; set; }
    }
}
