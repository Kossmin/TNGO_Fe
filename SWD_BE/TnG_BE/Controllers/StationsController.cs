#nullable disable
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
    [Route("api/v1/station")]
    [ApiController]
    [Authorize]
    public class StationsController : ControllerBase
    {
        private readonly TnGContext _context;
        private IStationRepository stationRepo;

        public StationsController(TnGContext context)
        {
            this.stationRepo = new StationRepository(context);
            _context = context;
        }

        // GET: api/Stations
        [AllowAnonymous]
        [HttpGet]
        public ActionResult GetStations(int page, string district)
        {
            if (district == null) district = "";

            int totalStation = stationRepo.GetStations().Count();
            int totalPage = totalStation / 10;
            if (totalStation % 10 != 0) totalPage++;

            IEnumerable<Station> ss = stationRepo.GetStations().Skip(page * 10).Take(10)
                .Where(s => s.Location.ToLower().Contains(district.ToLower()));

            StationDTO stations = new StationDTO(ss, totalPage, page += 1);

            if (ss == null || page > totalPage)
            {
                return BadRequest();
            }
            var json = JsonConvert.SerializeObject(stations, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // GET: api/Stations/5
        [AllowAnonymous]
        [HttpGet(template: "get/{id}")]
        public ActionResult GetStation(int id)
        {
            Station s = stationRepo.GetStation(id);
            if (s == null)
            {
                return BadRequest();
            }
            var json = JsonConvert.SerializeObject(s, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // PUT: api/Stations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutStation([FromBody] StationViewModel sViewModel, int id)
        {
            try
            {
                Station s = new Station
                {
                    Id = id,
                    Location = sViewModel.Location,
                    Status = sViewModel.Status,
                    Capability = sViewModel.Capability,
                };
                stationRepo.UpdateStation(s);
            }
            catch (Exception)
            {
                return "Update Failed";
            }
            return "Update Success";
        }

        [HttpPut(template: "status-update")]
        public String UpdateStationStatus(int id, int status)
        {
            Station s = stationRepo.GetStation(id);
            try
            {
                s.Status = status;
                stationRepo.UpdateStation(s);
            }
            catch (Exception)
            {
                return "Update Failed";
            }
            return "Update Success";
        }
        // POST: api/Stations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostStation([FromBody] StationViewModel sViewModel)
        {
            int id = stationRepo.GetStations().OrderBy(s => s.Id).Last().Id++;
            try
            {
                Station s = new Station
                {
                    Id = id,
                    Location = sViewModel.Location,
                    Status = sViewModel.Status,
                    Capability = sViewModel.Capability,
                };
                stationRepo.InsertStation(s);
            }
            catch (Exception)
            {
                return "Add Failed";
            }
            return "Add Success";
        }

        // DELETE: api/Stations/5
        [HttpDelete("{id}")]
        public String DeleteStation(int id)
        {
            try
            {
                if (StationExists(id))
                {
                    stationRepo.Delete(id);
                }
            }
            catch (Exception)
            {
                return "Delete Failed";
            }
            return "Delete Success";
        }

        private bool StationExists(int id)
        {
            return _context.Stations.Any(e => e.Id == id);
        }
    }
}
