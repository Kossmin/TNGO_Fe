using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IBicycleHistoryRepository
    {
        IEnumerable<BicycleHistory> GetBicycleHistories();
        BicycleHistory GetBicycleHistory(int id);
        void InsertBicycleHistory(BicycleHistory bicycleHistory);
        bool UpdateCategory(BicycleHistory bicycleHistory);
        bool DeleteBicycleHistory(int id);
    }
}
