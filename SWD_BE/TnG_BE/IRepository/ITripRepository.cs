using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface ITripRepository
    {
        IEnumerable<Trip> GetTrips();
        Trip GetTrip(int id);
        int InsertTrip(Trip trip);
        bool UpdateTrip(Trip trip);
        bool DeleteTrip(int id);
    }
}
