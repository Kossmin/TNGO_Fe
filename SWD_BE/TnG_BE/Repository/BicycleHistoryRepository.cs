using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class BicycleHistoryRepository : IBicycleHistoryRepository
    {
        private readonly TnGContext _context;
        public BicycleHistoryRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeleteBicycleHistory(int id)
        {
            var d = _context.BicycleHistories.Find(id);
            _context.BicycleHistories.Remove(d);
            return true;
        }

        public IEnumerable<BicycleHistory> GetBicycleHistories()
        {
            var bhs = _context.BicycleHistories.ToList();
            return bhs;
        }

        public BicycleHistory GetBicycleHistory(int id)
        {
            var bh = _context.BicycleHistories.Find(id);
            return bh;
        }

        public void InsertBicycleHistory(BicycleHistory bicycleHistory)
        {
            _context.BicycleHistories.Add(bicycleHistory);
            _context.SaveChanges();
        }

        public bool UpdateCategory(BicycleHistory bicycleHistory)
        {
            _context.BicycleHistories.Update(bicycleHistory);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
