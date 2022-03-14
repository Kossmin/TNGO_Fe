using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    public class TripController
    {
        [Route("api/v1/trip")]
        [ApiController]
        [Authorize]
        public class TripsController : ControllerBase
        {
            private readonly TnGContext _context;
            private ITripRepository tripRepo;

            public TripsController(TnGContext context)
            {
                this.tripRepo = new TripRepository(context);
                _context = context;
            }

            // GET: api/Trips
            [AllowAnonymous]
            [HttpGet]
            public IEnumerable<Trip> GetTrips()
            {
                IEnumerable<Trip> ss = tripRepo.GetTrips();
                return ss;
            }

            // GET: api/Trips/5
            [HttpGet(template: "get/{id}")]
            [AllowAnonymous]
            public Trip GetTrip(int id)
            {
                Trip s = tripRepo.GetTrip(id);
                if (s == null)
                {
                    return null;
                }
                return s;
            }

            // PUT: api/Trips/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut(template: "update")]
            public String PutTrip(Trip Trip)
            {
                try
                {
                    tripRepo.UpdateTrip(Trip);
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
            public String PostTrip(Trip Trip)
            {
                try
                {
                    tripRepo.InsertTrip(Trip);
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
}
