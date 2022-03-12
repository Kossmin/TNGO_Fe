using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IBicycleTypeRepository
    {
        IEnumerable<BicycleType> GetBicycleTypes();
        BicycleType GetBicycleType(int id);
        void InsertBicycleType(BicycleType bicycleType);
        bool UpdateBicycleType(BicycleType bicycleType);
        bool DeleteBicycleType(int id);
    }
}
