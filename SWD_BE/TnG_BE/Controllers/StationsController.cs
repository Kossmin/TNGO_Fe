#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public IEnumerable<Station> GetStations(int page)
        {
            IEnumerable<Station> ss = stationRepo.GetStations().Skip(page * 10).Take(10);
            if(ss.Any())
            {
                return ss;
            }
            return null;
        }

        // GET: api/Stations/5
        [AllowAnonymous]
        [HttpGet(template: "get/{id}")]
        public Station GetStation(int id)
        {
            Station s = stationRepo.GetStation(id);
            if(s == null)
            {
                return null;
            }
            return s;
        }

        // PUT: api/Stations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutStation(Station station)
        {
            try
            {
                stationRepo.UpdateStation(station);
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
        public String PostStation(Station station)
        {
            try
            {
                stationRepo.InsertStation(station);
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
                if(StationExists(id))
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
