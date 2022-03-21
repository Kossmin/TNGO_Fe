using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class BicycleRepository : IBicycleRepository
    {
        private readonly TnGContext _context;
        public BicycleRepository(TnGContext context)
        {
            _context = context;
        }
        public Bicycle GetBicycle(int id)
        {
            Bicycle? b = _context.Bicycles.Find(id);
            return b;

        }

        public IEnumerable<Bicycle> GetBicycles()
        {
            var bs = _context.Bicycles.ToList();
            return bs;
        }

        public int InsertBicycle(Bicycle bicycle)
        {
            _context.Bicycles.AddAsync(bicycle);
            _context.SaveChangesAsync();
            return bicycle.Id;
        }

        public bool UpdateBicycle(Bicycle bicycle)
        {
            _context.Bicycles.Update(bicycle);
            int rows = _context.SaveChanges();
            return rows > 0;
        }

        public bool DeleteBicycle(int id)
        {
            var b = GetBicycle(id);
            if (b == null) return false;
            b.Status = 4;
            _context.Bicycles.Update(b);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
