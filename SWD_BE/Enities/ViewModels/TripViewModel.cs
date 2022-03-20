using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enities.ViewModels
{
    public class TripViewModel
    {
        public DateTime BeginTime { get; set; }
        public DateTime EndTime { get; set; }
        public int StationStartId { get; set; }
        public int StationEndId { get; set; }
        public int Status { get; set; }
    }
}
