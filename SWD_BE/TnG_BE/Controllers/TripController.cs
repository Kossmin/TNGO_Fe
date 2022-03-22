using Enities.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TnG_BE.DTO;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/trip")]
    [ApiController]
    [Authorize]
    public class TripsController : ControllerBase
    {
        private readonly TnGContext _context;
        private ITripRepository tripRepo;
        private IBicycleHistoryRepository bHistoryRepo;
        private IStationRepository stationRepo;
        private IBicycleRepository bicycleRepo;
        private IUserRepository userRepo;
        public TripsController(TnGContext context)
        {
            this.tripRepo = new TripRepository(context);
            this.bHistoryRepo = new BicycleHistoryRepository(context);
            this.stationRepo = new StationRepository(context);
            this.bicycleRepo = new BicycleRepository(context);
            this.userRepo = new UserRepository(context);
            _context = context;
        }

        // GET: api/Trips
        [AllowAnonymous]
        [HttpGet]
        public ActionResult GetTrips(int page)
        {
            int totalTrip = tripRepo.GetTrips().Count();
            int totalPage = totalTrip / 10;
            if (totalTrip % 10 != 0) totalPage++;

            IEnumerable<Trip> ss = tripRepo.GetTrips().AsQueryable()
            .Join(bicycleRepo.GetBicycles(), x => x.BicycleId, y => y.Id, (x, y) => new Trip(x, y))
            .Join(stationRepo.GetStations(), x => x.StationStartId, y => y.Id, (x, y) => new Trip(x, y))
            .Join(stationRepo.GetStations(), x => x.StationEndId, y => y.Id, (x, y) => new Trip(y, x))
            .Join(userRepo.GetUsers(), x => x.UserId, y => y.Id, (x, y) => new Trip(x, y))
            .Skip(page * 10).Take(10);

            TripDTO trips = new TripDTO(ss, totalPage, page += 1);

            var json = JsonConvert.SerializeObject(trips, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // GET: api/Trips/5
        [HttpGet(template: "get/{id}")]
        [AllowAnonymous]
        public ActionResult GetTrip(int id)
        {
            Trip s = tripRepo.GetTrip(id);
            if (s == null)
            {
                return BadRequest();
            }
            s.StationStart = stationRepo.GetStation(s.StationStartId);
            s.StationEnd = stationRepo.GetStation(s.StationEndId);
            s.Bicycle = bicycleRepo.GetBicycle(s.BicycleId);
            s.User = userRepo.GetUser((int)s.UserId);

            var json = JsonConvert.SerializeObject(s, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // PUT: api/Trips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutTrip([FromBody] TripViewModel tViewModel, int id)
        {
            try
            {
                Trip t = new Trip
                {
                    Id = id,
                    BeginTime = tViewModel.BeginTime,
                    EndTime = tViewModel.EndTime,
                    StationEndId = tViewModel.StationEndId,
                    StationStartId = tViewModel.StationStartId,
                    Status = tViewModel.Status,
                };
                tripRepo.UpdateTrip(t);
            }
            catch (Exception)
            {
                return "Update Failed";
            }
            return "Update Success";
        }

        // POST: api/Trips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostTrip([FromBody] TripViewModel tViewModel)
        {
            int id = tripRepo.GetTrips().OrderBy(x => x.Id).Last().Id + 1;
            try
            {
                Trip t = new Trip
                {
                    Id = id,
                    BeginTime = tViewModel.BeginTime,
                    EndTime = tViewModel.EndTime,
                    StationEndId = tViewModel.StationEndId,
                    StationStartId = tViewModel.StationStartId,
                    Status = tViewModel.Status,
                };
                tripRepo.InsertTrip(t);
            }
            catch (Exception)
            {
                return "Add Failed";
            }
            return "Add Success";
        }

        // DELETE: api/Trips/5
        [HttpDelete("{id}")]
        public String DeleteTrip(int id)
        {
            try
            {
                if (TripExists(id))
                {
                    tripRepo.DeleteTrip(id);
                }
            }
            catch (Exception)
            {
                return "Delete Failed";
            }
            return "Delete Success";
        }

        private bool TripExists(int id)
        {
            return _context.Trips.Any(e => e.Id == id);
        }
    }
}
