using TnG_BE.Models;

namespace TnG_BE.DTO
{
    public class StationDTO
    {
        public StationDTO(IEnumerable<Station> stations, int totalPage, int pageIndex)
        {
            Stations = stations;
            TotalPage = totalPage;
            PageIndex = pageIndex;
        }

        public virtual IEnumerable<Station> Stations { get; set; }
        public int TotalPage { get; set; }
        public int PageIndex { get; set; }

    }
}
