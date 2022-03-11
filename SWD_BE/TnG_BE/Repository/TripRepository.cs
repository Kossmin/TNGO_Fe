using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class TripRepository : ITripRepository
    {
        private readonly TnGContext _context;
        public TripRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeleteTrip(int id)
        {
            var t = _context.Trips.Find(id);
            t.Status = 4;
            _context.Trips.Update(t);
            int rows = _context.SaveChanges();
            return rows > 0;
        }

        public Trip GetTrip(int id)
        {
            var t = _context.Trips.Find(id);
            return t;
        }

        public IEnumerable<Trip> GetTrips()
        {
            var ts = _context.Trips.ToList();
            return ts;
        }

        public  int InsertTrip(Trip trip)
        {
            _context.Trips.Add(trip);
            _context.SaveChanges();
            return trip.Id;
        }

        public bool UpdateTrip(Trip trip)
        {
            _context.Trips.Update(trip);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
