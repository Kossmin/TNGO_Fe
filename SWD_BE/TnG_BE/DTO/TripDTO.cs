using TnG_BE.Models;

namespace TnG_BE.DTO
{
    public class TripDTO
    {
        public TripDTO(IEnumerable<Trip> trips, int totalPage, int pageIndex)
        {
            Trips = trips;
            TotalPage = totalPage;
            PageIndex = pageIndex;
        }

        public IEnumerable<Trip> Trips { get; set; }
        public int TotalPage { get; set; }
        public int PageIndex { get; set; }
    }
}
