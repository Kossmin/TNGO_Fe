using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class BicycleTypeRepository : IBicycleTypeRepository
    {
        private readonly TnGContext _context;
        public BicycleTypeRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeleteBicycleType(int id)
        {
            var d = _context.BicycleTypes.Find(id);
            _context.BicycleTypes.Remove(d);
            return true;
        }

        public BicycleType GetBicycleType(int id)
        {
            var b = _context.BicycleTypes.Find(id);
            return b;
        }

        public IEnumerable<BicycleType> GetBicycleTypes()
        {
            var bs = _context.BicycleTypes.ToList();
            return bs;
        }

        public void InsertBicycleType(BicycleType bicycleType)
        {
            _context.BicycleTypes.Add(bicycleType);
            _context.SaveChanges();
        }

        public bool UpdateBicycleType(BicycleType bicycleType)
        {
            _context.BicycleTypes.Update(bicycleType);
            int rows = _context.SaveChanges();
            return rows >  0;
        }
    }
}
