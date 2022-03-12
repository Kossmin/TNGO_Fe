using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IBicycleRepository
    {
        IEnumerable<Bicycle> GetBicycles();
        Bicycle GetBicycle(int id);
        int InsertBicycle(Bicycle bicycle);
        bool UpdateBicycle(Bicycle bicycle);
        bool DeleteBicycle(int id);
    }
}
