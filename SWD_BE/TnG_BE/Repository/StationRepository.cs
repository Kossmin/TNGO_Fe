using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class StationRepository : IStationRepository
    {
        private readonly TnGContext _context;
        public StationRepository (TnGContext context)
        {
            _context = context;
        }
        public bool Delete(int id)
        {
            var s = GetStation(id);
            s.Status = 4;
            _context.Stations.Update(s);
            int rows = _context.SaveChanges();
            return rows > 0;
        }

        public Station GetStation(int id)
        {
            var s = _context.Stations.Find(id);
            return s;
        }

        public IEnumerable<Station> GetStations()
        {
            var ss = _context.Stations.ToList();
            return ss;
        }

        public  int InsertStation(Station station)
        {
            _context.Stations.Add(station);
            _context.SaveChanges();
            return station.Id;
        }

        public bool UpdateStation(Station station)
        {
            _context.Stations.Update(station);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
