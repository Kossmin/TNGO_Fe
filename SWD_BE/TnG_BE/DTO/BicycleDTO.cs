using TnG_BE.Models;

namespace TnG_BE.DTO
{
    public class BicycleDTO
    {
        public BicycleDTO(IEnumerable<Bicycle> bicycles, int totalPage, int pageIndex)
        {
            Bicycles = bicycles;
            TotalPage = totalPage;
            PageIndex = pageIndex;
        }

        public virtual IEnumerable<Bicycle> Bicycles { get; set; }
        public int TotalPage { get; set; }
        public int PageIndex { get; set; }
    }
}
