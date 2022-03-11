using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IStationRepository
    {
        IEnumerable<Station> GetStations();
        Station GetStation(int id);
        int InsertStation(Station station);
        bool UpdateStation(Station station);
        bool Delete(int id);
    }
}
